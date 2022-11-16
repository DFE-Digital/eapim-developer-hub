import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from './authService'

export const send = async (payload, req, res) => {
  const token = getOAuthToken(req, res)

  const url = `${process.env.PLATFORM_API_URL}/EmailSupport`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    await response.text()
  } catch (error) {
    console.log(`Error sending email: ${error}`)
    throw error
  }
}
