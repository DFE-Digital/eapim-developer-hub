import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import * as Msal from '@azure/msal-browser'
import { Loading } from 'components/Loading'
import { b2cPolicies, config, signOut } from '../lib/authService'
import { useAuth } from '../providers/AuthProvider'
import { useCookie, useInsights } from 'hooks'

const goTo = (url) => {
  window.location.href = url
}

const [trackException] = useInsights()

const errorHandling = async (error) => {
  console.log(`MSAL Error Message: ${error}`)
  trackException(error)

  if (!error.errorMessage) return goTo('/')

  // user has no account
  if (error.errorMessage.indexOf('AADB2C99002') > -1) return goTo('/')
  // user cancelled creating an account
  // user cancelled forgot password
  // user cancelled updating profile
  if (error.errorMessage.indexOf('AADB2C90091') > -1) return goTo('/')
  // user went from signin to create account
  if (error.errorMessage.indexOf('AADB2C90037') > -1) return goTo('/auth/register')
  // check for forgot password error
  if (error.errorMessage.indexOf('AADB2C90118') > -1) return goTo('/auth/forgot-password')

  // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
  if (error.errorMessage.indexOf('Invalid state') > -1) return goTo('/')

  await signOut()
  return goTo('/')
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
    const myMSALObj = new Msal.PublicClientApplication(config.login)
    const { setCookie } = useCookie()

    myMSALObj.handleRedirectPromise().then((tokenResponse) => {
      console.log('MSAL Response:', tokenResponse)
      let accountObj = null
      if (tokenResponse !== null) {
        accountObj = tokenResponse.account
        const idToken = tokenResponse.idToken
        const acr = tokenResponse.idTokenClaims.acr

        if (isForgotPassword(acr)) {
          return goTo('/password-changed')
        }

        if (isAuth(acr)) {
          console.log(`idToken acquired at: ${new Date().toString()}`)
          setUser(accountObj)
          setCookie('msal.idtoken', idToken)
          goTo('/?loggedin=true')
        } else {
          throw Error('Invalid auth')
        }
      } else {
        const currentAccounts = myMSALObj.getAllAccounts()
        if (!currentAccounts || currentAccounts.length === 0) {
          throw Error('No user')
        } else if (currentAccounts.length > 1) {
          throw Error('multiple users')
        } else {
          accountObj = currentAccounts[0]
          goTo('/?loggedin=true')
        }
      }
    }).catch((error) => {
      return errorHandling(error)
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
