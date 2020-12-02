import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import * as Msal from 'msal'
import { Loading } from 'components/Loading'
import { b2cPolicies, config } from '../lib/authService'
import { useAuth } from '../providers/AuthProvider'
import { useCookie, useInsights } from 'hooks'

const goTo = (url) => {
  window.location.href = url
}

const errorHandling = (error) => {
  console.log(`MSAL Error Message: ${error.errorMessage}`)

  // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
  if (error.errorMessage.indexOf('Invalid state') > -1) goTo('/')
  // user has no account
  if (error.errorMessage.indexOf('AADB2C99002') > -1) goTo('/')
  // user cancelled creating an account
  // user cancelled forgot password
  // user cancelled updating profile
  if (error.errorMessage.indexOf('AADB2C90091') > -1) goTo('/')
  // user went from signin to create account
  if (error.errorMessage.indexOf('AADB2C90037') > -1) goTo('/auth/register')
  // check for forgot password error
  if (error.errorMessage.indexOf('AADB2C90118') > -1) goTo('/auth/forgot-password')

  goTo('/')
}

const policy = (acr, key) => acr === b2cPolicies[key]

const isSignIn = (acr) => policy(acr, 'signIn')
const isSignUp = (acr) => policy(acr, 'signUp')
const isVerify = (acr) => policy(acr, 'verify')
const isForgotPassword = (acr) => policy(acr, 'forgotPassword')

const isAuth = (acr) => isSignIn(acr) || isSignUp(acr) || isVerify(acr)

const SignInSuccess = () => {
  const { setUser } = useAuth()

  useEffect(() => {
    const myMSALObj = new Msal.UserAgentApplication(config.login)
    const { setCookie, deleteCookie } = useCookie()
    const [trackException] = useInsights()

    myMSALObj.handleRedirectCallback((error, response) => {
      console.log('MSAL Response:', response)

      if (error) {
        trackException(error)
        return errorHandling(error)
      }

      const acr = response.idToken.claims['acr']
      const isIdToken = response.tokenType === 'id_token'

      if (isIdToken && isForgotPassword(acr)) {
        return goTo('/password-changed')
      }

      if (isIdToken && isAuth(acr)) {
        console.log(`id_token acquired at: ${new Date().toString()}`)

        if (!myMSALObj.getAccount()) {
          deleteCookie('msal.idtoken', null)
          return myMSALObj.loginRedirect()
        }

        const account = myMSALObj.getAccount()
        setUser(account)
        setCookie('msal.idtoken', response.idToken.rawIdToken)
        goTo('/?loggedin=true')
      } else {
        console.log(`Token type is: ${response.tokenType}`)
        goTo('/')
      }
    })
  }, [])

  return (
    <>
      <Loading />
      <Helmet>
        <title>Redirecting... | DfE Developer Hub</title>
      </Helmet>
    </>
  )
}

export default SignInSuccess
