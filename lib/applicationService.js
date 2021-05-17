import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from './authService'

export const getApplication = async (id, res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/ApplicationByID?applicationId=${id}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      }
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

export const getApplications = async (user, res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/GetApplications`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userID: user.accountIdentifier
      })
    })

    const result = await response.json()
    if (result.statusCode) throw result

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

export const registerApplication = async (data, res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/RegisterApplication`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    if (response.status === 400) throw result

    return result
  } catch (error) {
    console.log(`Error creating application: ${error}`)
    throw error
  }
}

export const updateApplication = async (data, res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/UpdateApplication`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const result = await response.text()
    return result === ''
  } catch (error) {
    console.log(`Error updating application: ${error}`)
    throw error
  }
}

export const deleteApplication = async (data, res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/DeleteApplication`

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    console.log('deleted application', response)
    return response
  } catch (error) {
    console.log(`Error deleting application: ${error}`)
    throw error
  }
}
