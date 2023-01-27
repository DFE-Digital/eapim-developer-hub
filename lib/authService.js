import * as Msal from '@azure/msal-browser'

export const b2cPolicies = {
  signIn: 'b2c_1a_eapim_signin',
  signUp: 'b2c_1a_eapim_signup',
  forgotPassword: 'b2c_1a_eapim_passwordreset',
  editProfile: 'b2c_1a_eapim_profileedit',
  verify: 'b2c_1a_eapim_signinredemption',
  changePassword: 'b2c_1a_eapim_passwordchange'
}

export const msalConfig = ({ authority, clientId, redirectUri, postLogoutRedirectUri }) => {
  return {
    auth: {
      clientId,
      authority,
      knownAuthorities: [authority],
      redirectUri,
      postLogoutRedirectUri,
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true
    }
  }
}

const msalAuthConfig = {
  authority: process.env.NEXT_PUBLIC_B2C_SIGNIN_URL,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
  postLogoutRedirectUri: `${process.env.NEXT_PUBLIC_ROOT_URL}/logged-out`,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID
}

const msalAuthVerfiyConfig = {
  authority: process.env.NEXT_PUBLIC_B2C_SIGNIN_VERIFY_URL,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID
}

const msalRegisterConfig = {
  authority: process.env.NEXT_PUBLIC_B2C_SIGNUP_URL,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID
}

const msalEditProfileConfig = {
  authority: process.env.NEXT_PUBLIC_B2C_PROFILE_EDIT_URL,
  redirectUri: process.env.NEXT_PUBLIC_EDIT_PROFILE_REDIRECT_URL,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID
}

const msalForgotPasswordConfig = {
  authority: process.env.NEXT_PUBLIC_B2C_PASSWORD_RESET_URL,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID
}

const msalChangePasswordConfig = {
  authority: process.env.NEXT_PUBLIC_B2C_PASSWORD_CHANGE_URL,
  redirectUri: process.env.NEXT_PUBLIC_EDIT_PROFILE_REDIRECT_URL,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID
}

export const config = {
  login: msalConfig(msalAuthConfig),
  register: msalConfig(msalRegisterConfig),
  editProfile: msalConfig(msalEditProfileConfig),
  changePassword: msalConfig(msalChangePasswordConfig),
  forgotPassword: msalConfig(msalForgotPasswordConfig),
  verify: msalConfig(msalAuthVerfiyConfig)
}

/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest = {
  scopes: ['openid', 'profile']
}

export const signIn = async () => {
  const myMSALObj = new Msal.PublicClientApplication(config.login)
  myMSALObj.loginRedirect(loginRequest)
}

export const signOut = async (redirectUri) => {
  const authConfig = { ...msalAuthConfig }

  if (redirectUri) authConfig.postLogoutRedirectUri = redirectUri

  const myMSALObj = new Msal.PublicClientApplication(msalConfig(authConfig))
  myMSALObj.logoutRedirect()
}

export const signInRedeem = async (idTokenHint) => {
  const myMSALObj = new Msal.PublicClientApplication(config.verify)
  myMSALObj.loginRedirect({ ...loginRequest, extraQueryParameters: { id_token_hint: idTokenHint } })
}

export const register = async () => {
  const myMSALObj = new Msal.PublicClientApplication(config.register)
  myMSALObj.loginRedirect(loginRequest)
}

export const editProfile = async () => {
  const myMSALObj = new Msal.PublicClientApplication(config.editProfile)
  myMSALObj.loginRedirect({ authority: config.editProfile.auth.authority })
}

export const forgotPassword = async () => {
  const myMSALObj = new Msal.PublicClientApplication(config.forgotPassword)
  myMSALObj.loginRedirect({ authority: config.forgotPassword.auth.authority })
}

export const changePassword = async () => {
  const myMSALObj = new Msal.PublicClientApplication(config.changePassword)
  myMSALObj.loginRedirect({ authority: config.changePassword.auth.authority })
}

// export const deleteAccount = () => async dispatch => {
//   dispatch({ type: REQUEST_DELETE_ACCOUNT })
//   setTimeout(() => {
//     dispatch({ type: RECEIVE_DELETE_ACCOUNT })
//   }, 1000)
// }
