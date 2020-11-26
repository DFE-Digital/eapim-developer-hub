import * as Msal from 'msal'
import { loginRequest } from '../auth/config'

export const REQUEST_SIGNIN = Symbol('REQUEST_SIGNIN')
export const RECEIVE_SIGNIN = Symbol('RECEIVE_SIGNIN')
export const REQUEST_SIGNOUT = Symbol('REQUEST_SIGNOUT')
export const REQUEST_EDIT_PROFILE = Symbol('REQUEST_EDIT_PROFILE')
export const CLEAR_ERRORS = Symbol('CLEAR_ERRORS')
export const REQUEST_DELETE_ACCOUNT = Symbol('REQUEST_DELETE_ACCOUNT')
export const RECEIVE_DELETE_ACCOUNT = Symbol('RECEIVE_DELETE_ACCOUNT')

export const signIn = async (msalConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalConfig)
  myMSALObj.loginRedirect(loginRequest)
}

export const signInRedeem = async (msalConfig, idTokenHint) => {
  const myMSALObj = new Msal.UserAgentApplication(msalConfig)
  myMSALObj.loginRedirect({ ...loginRequest, extraQueryParameters: { id_token_hint: idTokenHint } })
}

export const register = async (msalRegisterConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalRegisterConfig)
  myMSALObj.loginRedirect(loginRequest)
}

export const editProfile = async (msalEditProfileConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalEditProfileConfig)
  myMSALObj.loginRedirect({ authority: msalEditProfileConfig.auth.authority })
}

export const forgotPassword = async (msalForgotPasswordConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalForgotPasswordConfig)
  myMSALObj.loginRedirect({ authority: msalForgotPasswordConfig.auth.authority })
}

export const changePassword = async (msalChangePasswordConfig) => {
  const myMSALObj = new Msal.UserAgentApplication(msalChangePasswordConfig)
  myMSALObj.loginRedirect({ authority: msalChangePasswordConfig.auth.authority })
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

export const signOut = async (msalConfig) => {
  window.localStorage.removeItem('persist:root')
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

export const signInLink = async (e, msalConfig) => {
  e.preventDefault()
  await signIn(msalConfig)
}

export const registerLink = async (e, msalConfig) => {
  e.preventDefault()
  await register(msalConfig)
}

export const editProfileLink = async (e, msalConfig) => {
  e.preventDefault()
  await editProfile(msalConfig)
}

export const changePasswordLink = async (e, msalConfig) => {
  e.preventDefault()
  await changePassword(msalConfig)
}

export const signOutLink = async (e, msalConfig) => {
  e.preventDefault()
  await signOut(msalConfig)
}
