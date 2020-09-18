import fetch from 'isomorphic-unfetch'

import { getApis, getApiTags, mapSubscriptionsToAPI } from './apiServices'

export const getSubscriptionKeys = async (subscriptionId, environment) => {
  try {
    const request = await fetch(`${process.env.PLATFORM_API_URL}/subscriptionkeys?subscriptionId=${subscriptionId}&environment=${environment}`, {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY }
    })

    const response = await request.json()
    return response
  } catch (error) {
    console.log(`Error fetching a subscription: ${error}`)
    throw error
  }
}

export const getSubscriptions = async (applicationId) => {
  try {
    const request = await fetch(`${process.env.PLATFORM_API_URL}/Subscriptions?applicationId=${applicationId}`, {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY }
    })

    const response = await request.json()

    if (response.values.length) {
      return response.values.sort((a, b) => {
        if (a.environment > b.environment) return -1
        if (a.environment < b.environment) return 1
        return 0
      })
    }

    return response.values
  } catch (error) {
    console.log(`Error fetching suscriptions: ${error}`)
    throw error
  }
}

export const postSubscription = async (applicationId, apiName, environment) => {
  try {
    const request = await fetch(`${process.env.PLATFORM_API_URL}/subscription`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
      body: JSON.stringify({ applicationId, apiName, environment })
    })

    await request.json()

    const apis = await getApis()
    const subscriptions = await getSubscriptions(applicationId)

    await Promise.all(apis.map(async (api) => {
      api.tags = await getApiTags(api.name)
      return api
    }))

    mapSubscriptionsToAPI(apis, subscriptions)

    return apis
  } catch (error) {
    console.log(`Error posting suscription: ${error}`)
    throw error
  }
}

export const deleteSubscription = async (subscriptionId, environment, applicationId) => {
  try {
    await fetch(`${process.env.PLATFORM_API_URL}/subscription`, {
      method: 'DELETE',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
      body: JSON.stringify({ subscriptionId, environment })
    })

    const apis = await getApis()
    const subscriptions = await getSubscriptions(applicationId)

    await Promise.all(apis.map(async (api) => {
      api.tags = await getApiTags(api.name)
      return api
    }))

    mapSubscriptionsToAPI(apis, subscriptions)

    return apis
  } catch (error) {
    console.log(`Error deleteing suscription: ${error}`)
    throw error
  }
}
