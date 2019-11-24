import { handleActions } from 'redux-actions'

import * as actions from './actions'
import { clearAll } from '../../common/actions/common'

export const defaultState = {
  token: null,
  user: {},
  users: [],
  userTypeCode: null
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setUserInformation]: (state, action) => {
    const { userTypeOfUser } = action.payload || {}
    return ({
      ...state,
      user: action.payload,
      userTypeCode: userTypeOfUser.code
    })
  },
  [actions.setUserToken]: (state, action) => ({
    ...state,
    token: action.payload
  }),
  [actions.setUsersList]: (state, action) => ({
    ...state,
    users: action.payload
  })
}

export default handleActions(handlers, defaultState)
