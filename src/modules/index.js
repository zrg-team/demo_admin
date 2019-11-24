// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models'
// MODULE REDUCERS
import userReducers from './user/reducers'
// MODULE SAGAS

export const MODULE_SAGAS = [
]

export const MODULE_REDUCERS = {
  [MODULE_USER]: userReducers
}
