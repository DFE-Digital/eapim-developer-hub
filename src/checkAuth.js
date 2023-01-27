import cookies from 'next-cookies'
import jwtDecode from 'jwt-decode'
import IdTokenVerifier from 'idtoken-verifier'

import { getApplications } from '../lib/applicationService'
import { getSubscriptions } from '../lib/subscriptionService'

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

export const checkUserOwnsApp = async (session, appId) => {
  const applications = await getApplications({
    email: session.email,
    give_name: session.give_name,
    family_name: session.family_name,
    accountIdentifier: session.sub
  })

  const isUsersApplication = applications.find(app => app.applicationId === appId)

  if (!isUsersApplication) {
    throw new Error('Unauthorized')
  }

  return true
}

export const checkUserOwnsSub = async (session, appId, subId, environment) => {
  const applications = await getApplications({
    email: session.email,
    give_name: session.give_name,
    family_name: session.family_name,
    accountIdentifier: session.sub
  })

  const userApp = applications.find(app => app.applicationId === appId)

  if (!userApp) {
    throw new Error('Unauthorized')
  }

  const subscriptions = await getSubscriptions(appId)
  const userSub = subscriptions.find(sub => sub.id === subId && sub.environment === environment)
  if (!userSub) {
    throw new Error('Unauthorized')
  }

  return true
}

export function verify (req, res) {
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

  const result = new Promise((resolve, reject) => {
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
  const result = await verify(req, res).catch(() => {
    const response = res._res ? res._res : res

    response.redirect('/auth/login')
    response.end()
  })
  return result
}
