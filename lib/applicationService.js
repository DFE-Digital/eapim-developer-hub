import fetch from 'isomorphic-unfetch'

export const getApplication = async (id) => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/ApplicationByID?applicationId=${id}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY }
    })

    const result = await response.json()
    if (result.statusCode) return null

    result.applicationName = result.applicationName.split('-').pop()

    return result
  } catch (error) {
    console.log(`Error fetching application: ${error}`)
    throw error
  }
}

export const getApplications = async (user) => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/GetApplications`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
      body: JSON.stringify({
        userName: `${user.idToken.given_name} ${user.idToken.family_name}`,
        userEmail: user.idToken['email'],
        userID: user.accountIdentifier
      })
    })

    const result = await response.json()
    if (result.statusCode) return null

    if (result.Applications) {
      result.Applications.map(app => {
        app.applicationName = app.applicationName.split('-').pop()
      })

      return result.Applications
    }
  } catch (error) {
    console.log(`Error fetching application: ${error}`)
    throw error
  }
}
