import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from './authService'

export const getPendingSubscriptions = async (environment, res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/GetPendingSubscriptions?environment=${environment}`

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

    console.log(result)

    return result
  } catch (error) {
    console.log(`Error fetching application: ${error}`)
    throw error
  }
}
