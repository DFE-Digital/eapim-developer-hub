import cookies from 'next-cookies'
import jwtDecode from 'jwt-decode'

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
