import {
  loading,
  fetch,
  fetchAuthLoading
} from '../../common/effects'
import { ENDPOINTS, LIMIT } from './models'
import {
  setUsersList,
  setUserToken,
  setUserInformation
} from './actions'
import { setCookie } from '../../common/utils/cookies'
import { parseSearch } from '../../common/utils/search'

export function getUsersList ({ page, search = {} }) {
  const searchParams = {
    search,
    searchFields: {
    }
  }
  return fetchAuthLoading({
    url: ENDPOINTS.getUsers,
    method: 'GET',
    params: {
      ...parseSearch(searchParams),
      includes: 'userTypeOfUser',
      page,
      limit: LIMIT
    }
  }).then((response) => {
    return response.data
  })
}

export function getMyInformation () {
  return fetchAuthLoading({
    url: ENDPOINTS.getUser,
    method: 'GET'
  }).then((response) => {
    return response.data
  })
}

export default (dispatch, props) => ({
  getUser: async () => {
    const result = await getMyInformation()
    if (result && result.success) {
      setCookie('user', JSON.stringify(result.data))
      dispatch(setUserInformation({
        ...result.data
      }))
      return result.data
    }
    return false
  },
  createUser: async (data) => {
    try {
      const result = await loading(async () => {
        const result = await fetchAuthLoading({
          url: ENDPOINTS.createUser,
          method: 'POST',
          data
        })
        return result.data
      })
      return result
    } catch (error) {
      const { response = {} } = error
      if (response && response.data) {
        return { success: false, msg: 'Server error.', errors: response.data.errors }
      }
      return { success: false, msg: 'Server error.' }
    }
  },
  login: async (username, password, recaptcha) => {
    try {
      const result = await loading(async () => {
        const result = await fetch({
          url: ENDPOINTS.login,
          method: 'POST',
          data: {
            user_name: username,
            password,
            recaptcha
          }
        })
        if (result.data && result.data.success && result.data.user) {
          console.log('result.data', result.data)
          setCookie('user', JSON.stringify(result.data.user))
          setCookie('token', result.data.token)
          dispatch(setUserToken(result.data.token))
          dispatch(setUserInformation({
            ...result.data.user
          }))
        }
        return result.data
      })
      return result
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.errors) {
        const { code, message } = error.response.data.errors[0]
        if (code === 'USER_NOT_EXIST') {
          return { success: false, msg: 'User or password is not correct.' }
        }
        return { success: false, msg: message }
      }
      return { success: false, msg: 'Server error.' }
    }
  },
  getUserList: async (input = {}) => {
    try {
      const result = await getUsersList(input)
      if (result && result.success) {
        dispatch(setUsersList(result.data))
        return result
      }
      throw new Error('INVALID_RETURN')
    } catch (err) {
      return false
    }
  }
})
