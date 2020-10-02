export const b2cPolicies = {
  names: {
    signIn: 'b2c_1a_eapim_signin',
    signUp: 'b2c_1a_eapim_signup',
    forgotPassword: 'b2c_1a_eapim_passwordreset',
    editProfile: 'b2c_1a_eapim_profileedit',
    verify: 'b2c_1a_eapim_signinredemption',
    changePassword: 'b2c_1a_eapim_passwordchange'
  }
}

export const apiConfig = {
  b2cScopes: ['https://dfeb2cdev.onmicrosoft.com/83ebd549-6e84-4765-a704-760197daf0d3/demo.read'],
  webApi: 'https://fabrikamb2chello.azurewebsites.net/hello'
}

export const msalConfig = ({ authority, clientId, redirectUri, postLogoutRedirectUri }) => {
  return {
    auth: {
      clientId,
      authority,
      redirectUri,
      postLogoutRedirectUri,
      validateAuthority: false,
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: 'localStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false // Set this to 'true' to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
    }
  }
}

/**
   * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
   * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
   */
export const loginRequest = {
  scopes: ['openid', 'profile']
}

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: apiConfig.b2cScopes // e.g. ['https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read']
}
