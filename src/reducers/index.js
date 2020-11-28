import { combineReducers } from 'redux'

import returnTo from './returnTo'
import application from './application'

const appReducer = combineReducers({
  returnTo,
  application
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
