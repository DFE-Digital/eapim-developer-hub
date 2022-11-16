import fetch from 'isomorphic-unfetch'
import ClientCredentials from './clientCredentials'

export const getSubscriptionKeys = async (subscriptionId, environment, req, res) => {
  const token = await ClientCredentials.getOauthToken()

  try {
    const request = await fetch(`${process.env.PLATFORM_API_URL}/subscriptionkeys?subscriptionId=${subscriptionId}&environment=${environment}`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      }
    })

    const response = await request.json()
    return response
  } catch (error) {
    console.log(`Error fetching a subscription: ${error}`)
    throw error
  }
}

export const getSubscriptions = async (applicationId, req, res) => {
  const token = await ClientCredentials.getOauthToken()

  try {
    const request = await fetch(`${process.env.PLATFORM_API_URL}/Subscriptions?applicationId=${applicationId}`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      }
    })

    const response = await request.json()
    if (response.statusCode) return null

    return response.values
  } catch (error) {
    console.log(`Error fetching suscriptions: ${error}`)
    throw error
  }
}

export const postSubscription = async (applicationId, apiName, environment, req, res) => {
  const token = await ClientCredentials.getOauthToken()

  try {
    const request = await fetch(`${process.env.PLATFORM_API_URL}/subscription`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ applicationId, apiName, environment })
    })

    await request.json()

    return await getSubscriptions(applicationId)
  } catch (error) {
    console.log(`Error posting suscription: ${error}`)
    throw error
  }
}

export const deleteSubscription = async (subscriptionId, environment, req, res) => {
  const token = await ClientCredentials.getOauthToken()

  try {
    await fetch(`${process.env.PLATFORM_API_URL}/subscription`, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subscriptionId, environment })
    })
  } catch (error) {
    console.log(`Error deleteing suscription: ${error}`)
    throw error
  }
}
