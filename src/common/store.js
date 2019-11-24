import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { createHashHistory } from 'history'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware, compose } from 'redux'
import createSaga from './middlewares'
import commonReducers, { defaultState as defaultCommonState } from './reducers/common'
import { MODULE_REDUCERS } from '../modules'
import sessionReducers from './reducers/session'
import { defaultState as defaultUserState } from '../modules/user/reducers'
import { getCookie } from './utils/cookies'

export const history = createHashHistory()

const config = {
  key: 'root',
  storage,
  blacklist: ['session', 'compiler']
}
const createMiddlewares = sagaMiddleware => {
  const middlewares = []

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware)
  }

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  })
  process.env.NODE_ENV !== 'production' && middlewares.push(logger)

  return applyMiddleware.apply({}, middlewares)
}

const createReducers = reducers => {
  return persistCombineReducers(config, {
    common: commonReducers,
    session: sessionReducers,
    ...MODULE_REDUCERS,
    ...reducers
  })
}
function mapCookieToStorage () {
  let initialState
  const language = getCookie('language') || 'en'
  try {
    const user = JSON.parse(getCookie('user'))
    const detail = JSON.parse(decodeURIComponent(getCookie('reference')))
    const referenceType = getCookie('reference_type')
    initialState = {
      user: {
        user: {
          ...user,
          [referenceType]: detail
        },
        token: getCookie('token'),
        userTypeCode: user.userTypeOfUser.code
      }
    }
    const storage = JSON.parse(window.localStorage.getItem('persist:root'))
    const userStorage = storage && storage.user
      ? JSON.parse(storage.user)
      : defaultUserState
    userStorage.token = getCookie('token')
    userStorage.userTypeCode = user.userTypeOfUser.code
    userStorage.user = user
    storage.user = JSON.stringify(userStorage)
    const commonStorage = storage && storage.common
      ? JSON.parse(storage.common)
      : defaultCommonState
    commonStorage.language = language
    storage.common = JSON.stringify(commonStorage)
    window.localStorage.setItem('persist:root', JSON.stringify(storage))
  } catch (err) {
    console.log('err', err)
    initialState = undefined
  }
  return {
    ...initialState || {},
    common: {
      language
    }
  }
}
const composeEnhancers = process.env.NODE_ENV !== 'production'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose
const buildStore = (reducers) => {
  const initialState = mapCookieToStorage()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(createReducers(reducers), initialState, composeEnhancers(createMiddlewares(sagaMiddleware)))

  const persistor = persistStore(store)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers))
    })
  }

  store.reducers = createReducers(reducers)
  sagaMiddleware.run(createSaga(store.getState))
  return { persistor, store }
}

export default buildStore()
