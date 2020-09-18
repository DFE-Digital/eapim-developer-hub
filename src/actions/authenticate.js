import * as Msal from 'msal'
import { loginRequest } from '../auth/config'

export const REQUEST_SIGNIN = Symbol('REQUEST_SIGNIN')
export const RECEIVE_SIGNIN = Symbol('RECEIVE_SIGNIN')
export const REQUEST_SIGNOUT = Symbol('REQUEST_SIGNOUT')
export const REQUEST_EDIT_PROFILE = Symbol('REQUEST_EDIT_PROFILE')
export const CLEAR_ERRORS = Symbol('CLEAR_ERRORS')
export const REQUEST_DELETE_ACCOUNT = Symbol('REQUEST_DELETE_ACCOUNT')
export const RECEIVE_DELETE_ACCOUNT = Symbol('RECEIVE_DELETE_ACCOUNT')

export const signIn = (msalConfig) => async dispatch => {
  dispatch({ type: REQUEST_SIGNIN })
  const myMSALObj = new Msal.UserAgentApplication(msalConfig)
  myMSALObj.loginRedirect(loginRequest)
}

export const register = async (msalRegisterConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalRegisterConfig)
  myMSALObj.loginRedirect(loginRequest)
}

export const editProfile = async (msalEditProfileConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalEditProfileConfig)
  myMSALObj.loginRedirect(loginRequest)
}

export const forgotPassword = async (msalForgotPasswordConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalForgotPasswordConfig)
  myMSALObj.loginRedirect({ authority: msalForgotPasswordConfig.auth.authority })
}

export const signInToken = (user) => async dispatch => {
  if (user) {
    dispatch({ type: RECEIVE_SIGNIN,
      payload: {
        User: user,
        isAuthed: true
      }
    })
  } else {
    dispatch({ type: RECEIVE_SIGNIN, payload: { isAuthed: false } })
  }
}

export const signOut = (msalConfig) => async dispatch => {
  dispatch({ type: REQUEST_SIGNOUT })
  const myMSALObj = new Msal.UserAgentApplication(msalConfig)
  myMSALObj.logout()
}

export const clearError = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}

export const deleteAccount = () => async dispatch => {
  dispatch({ type: REQUEST_DELETE_ACCOUNT })
  setTimeout(() => {
    dispatch({ type: RECEIVE_DELETE_ACCOUNT })
  }, 1000)
}
