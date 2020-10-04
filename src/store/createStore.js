import Immutable from 'immutable'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

import { persistStore } from 'redux-persist'

import rootReducer from 'reducers'

function createMiddlewares ({ isServer }) {
  const middlewares = [
    thunkMiddleware
  ]

  if (typeof window !== 'undefined') {
    middlewares.push(createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer: (state) => {
        const newState = {}

        for (const i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS()
          } else {
            newState[i] = state[i]
          }
        }

        return newState
      }
    }))
  }

  return middlewares
}

function immutableChildren (obj) {
  const state = {}
  Object.keys(obj).forEach((key) => {
    state[key] = Immutable.fromJS(obj[key])
  })
  return state
}

const initStore = (initialState = {}, context) => {
  const { isServer } = context
  const middlewares = createMiddlewares({ isServer })
  const state = immutableChildren(initialState)
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    const { persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'root',
      storage
    }

    const store = createStore(
      persistReducer(persistConfig, rootReducer),
      state,
      compose(applyMiddleware(...middlewares))
    )

    store.__PERSISTOR = persistStore(store)

    return store
  } else {
    return createStore(
      rootReducer,
      state,
      compose(applyMiddleware(...middlewares))
    )
  }
}

export default initStore
