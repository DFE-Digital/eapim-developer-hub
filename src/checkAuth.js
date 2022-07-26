import cookies from 'next-cookies'
import jwtDecode from 'jwt-decode'
import IdTokenVerifier from 'idtoken-verifier'

import { getApplications } from '../lib/applicationService'

export const decodeToken = (req, res) => {
  const items = cookies({ req, res })
  const idtoken = items['msal.idtoken']

  let session = null

  try {
    session = jwtDecode(idtoken)
  } catch {
    session = null
  }

  return session
}

export const checkAuth = async (req, res, appId) => {
  const items = cookies({ req, res })

  const idtoken = items['msal.idtoken']

  let session = null

  try {
    session = jwtDecode(idtoken)
  } catch {
    session = null
  }

  if (!session) {
    res.redirect('/auth/login')
    res.end()
  }

  const applications = await getApplications({
    email: session.email,
    give_name: session.give_name,
    family_name: session.family_name,
    accountIdentifier: session.sub
  }, res)

  const isUsersApplication = applications.find(app => app.applicationId === appId)

  if (!isUsersApplication) {
    throw new Error('Unauthorized')
  }

  return true
}

function verify (req, res) {
  const items = cookies({ req, res })

  const idtoken = items['msal.idtoken']

  let session = null

  try {
    session = jwtDecode(idtoken)
  } catch {
    session = null
  }

  if (!session) {
    throw new Error('Unauthorized')
  }

  const verifier = new IdTokenVerifier({
    issuer: process.env.MSAL_ID_ISSUER,
    audience: process.env.NEXT_PUBLIC_CLIENT_ID,
    jwksURI: process.env.MSAL_ID_VERIFICATION_URL
  })

  var result = new Promise((resolve, reject) => {
    verifier.verify(idtoken, session.nonce, (error, payload) => {
      if (error) {
        reject(error)
      } else {
        resolve(session)
      }
    })
  })

  return result
}

export const checkBasicAuth = async (req, res, callback) => {
  var result = await verify(req, res).catch(() => {
    res.redirect('/auth/login')
    res.end()
  })
  return result
}
