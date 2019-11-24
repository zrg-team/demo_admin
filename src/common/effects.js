import axios from 'axios'
import { TIMEOUT } from './models'
import {
  fetchEnd,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  loadStart,
  loadEnd
} from './actions/session'
import { setCookie } from './utils/cookies'
import { FRONT_PAGE_URL } from '../configs'
import { clearAll } from './actions/common'
import storeAccessible from './utils/storeAccessible'
import { MODULE_NAME as MODULE_USER } from '../modules/user/models'

export async function loading (fetchingProcess, done = undefined) {
  storeAccessible.dispatch(loadStart({ config: { key: 'loading' } }))
  try {
    const ret = await fetchingProcess()
    storeAccessible.dispatch(loadEnd({ config: { key: 'loading' } }))
    if (done) {
      await done()
    }
    return ret
  } catch (error) {
    storeAccessible.dispatch(loadEnd({ config: { key: 'loading' } }))
    console.error('ERROR', error)
    throw error
  }
}

export async function loadingProcess (fetchingProcess, done = undefined) {
  storeAccessible.dispatch(fetchStart({ config: { key: 'loading' } }))
  try {
    const ret = await fetchingProcess()
    storeAccessible.dispatch(fetchEnd({ config: { key: 'loading' } }))
    if (done) {
      await done()
    }
    return ret
  } catch (error) {
    storeAccessible.dispatch(fetchEnd({ config: { key: 'loading' } }))
    console.error('ERROR', error)
    throw error
  }
}

export function fetch ({ url, headers, ...options }) {
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...options
  }).then((response) => {
    return response
  }).catch(error => {
    throw error
  })
}

export function fetchLoading ({ url, headers, ...options }) {
  storeAccessible.dispatch(fetchStart({ config: { key: url } }))
  return axios({
    method: 'get',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...options
  }).then((response) => {
    storeAccessible.dispatch(fetchSuccess({ config: { key: url } }))
    return response
  }).catch(err => {
    storeAccessible.dispatch(fetchFailure({ config: { key: url } }))
    throw err
  })
}

export function fetchAuth ({ url, headers, ...options }) {
  const user = storeAccessible.getState(MODULE_USER)
  if (!user || !user.token) {
    throw new Error('MISSING_USER_TOKEN')
  }
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...headers
    },
    ...options
  }).then((response) => {
    return response
  }).catch(error => {
    if (error.response && error.response.status === 401) {
      logout()
    }
    throw error
  })
}

export function fetchAuthLoading ({ url, headers, ...options }) {
  const user = storeAccessible.getState(MODULE_USER)
  if (!user || !user.token) {
    throw new Error('MISSING_USER_TOKEN')
  }
  storeAccessible.dispatch(fetchStart({ config: { key: url } }))
  return axios({
    method: 'get',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...headers
    },
    ...options
  }).then((response) => {
    storeAccessible.dispatch(fetchSuccess({ config: { key: url } }))
    return response
  }).catch(error => {
    storeAccessible.dispatch(fetchFailure({ config: { key: url } }))
    if (error.response && error.response.status === 401) {
      logout()
    }
    throw error
  })
}

function logout () {
  storeAccessible.dispatch(clearAll())
  setCookie('user', '')
  setCookie('token', '')
  setCookie('reference', '')
  setCookie('reference_type', '')
  setTimeout(() => {
    window.location.href = FRONT_PAGE_URL
  }, 200)
}
