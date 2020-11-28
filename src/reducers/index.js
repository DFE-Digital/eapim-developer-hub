import { combineReducers } from 'redux'

import returnTo from './returnTo'

const appReducer = combineReducers({
  returnTo
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
