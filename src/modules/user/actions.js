import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setUsersList = createAction(`${MODULE_NAME}/SET_USER_LIST`)
export const setUserToken = createAction(`${MODULE_NAME}/SET_USER_TOKEN`)
export const setUserInformation = createAction(`${MODULE_NAME}/SET_USER_INFORMATION`)
