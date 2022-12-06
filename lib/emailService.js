import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from './authService'

export const send = async (payload, formName, req, res) => {
  const token = getOAuthToken(req, res)

  var endpoint = ''
  try {
    switch (formName) {
      case 'feedback':
        endpoint = `/EmailFeedback`
        break
      case 'support':
        endpoint = `/EmailSupport`
        break
      default:
        throw new Error('Unknown endpoint')
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
  const url = `${process.env.PLATFORM_API_URL}${endpoint}`

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
