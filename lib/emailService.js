import fetch from 'isomorphic-unfetch'
import ClientCredentials from './clientCredentials'

export const send = async (payload, req, res) => {
  const token = await ClientCredentials.getToken()

  const url = `${process.env.PLATFORM_API_URL}/Email`

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
