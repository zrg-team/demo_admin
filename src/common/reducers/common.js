import { handleActions } from 'redux-actions'
import * as actions from '../actions/common'

export const defaultState = {
  language: 'en',
  timeout: 30000,
  roles: [],
  locations: [],
  packages: [],
  balance: {}
}

const handlers = {
  [actions.clearAll]: (state, action) => ({ ...defaultState }),
  [actions.setUserLanguage]: (state, action) => {
    return {
      ...state,
      language: action.payload
    }
  },
  [actions.setRequestTimeout]: (state, action) => {
    return {
      ...state,
      timeout: action.payload
    }
  }
}

export default handleActions(handlers, defaultState)
