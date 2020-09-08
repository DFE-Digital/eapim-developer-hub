import { combineReducers } from 'redux'
import * as ActionType from 'actions/authenticate'

import returnTo from './returnTo'
import user from './user'
import apis from './apis'
import application from './application'

const appReducer = combineReducers({
  returnTo,
  user,
  apis,
  application
})

const rootReducer = (state, action) => {
  if (action.type === ActionType.REQUEST_SIGNOUT) {
    window.localStorage.removeItem('persist:root')
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
