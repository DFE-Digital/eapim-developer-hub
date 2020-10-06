import fetch from 'isomorphic-unfetch'

export const getApplication = async (id) => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/ApplicationByID?applicationId=${id}`

  console.log('getApplication id', id)
  console.log('getApplication url', url)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY }
    })

    const result = await response.json()
    console.log('getApplication result', result)

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
        userID: user.accountIdentifier,
        organization: user.idToken.extension_OrganizationName,
        role: 'role' // user.idToken.extension_Role
      })
    })

    const result = await response.json()

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
