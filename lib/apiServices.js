import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from './authService'

const getTag = (arr, tag) => {
  const item = arr.find(item => item.properties.displayName === tag)
  return item ? item.properties.value : null
}

const getName = (arr, env) => getTag(arr, `${env}-Name`)
const getAPIName = (arr, env) => getTag(arr, `${env}-APINAme`)
const getAPIVersion = (arr, env) => getTag(arr, `${env}-APIVersion`)
const getURL = (arr, env) => getTag(arr, `${env}-URL`)
const getVisibility = (arr, env) => getTag(arr, `${env}-Visible`)
const getOAuth2AuthorisationEndpoint = (arr, env) => getTag(arr, `${env}-OAuth2AuthorisationEndpoint`)
const getOAuth2TokenEndpoint = (arr, env) => getTag(arr, `${env}-OAuth2TokenEndpoint`)
const getOAuth2Scopes = (arr, env) => {
  const value = getTag(arr, `${env}-OAuth2Scopes`)
  if (!value) return value
  return value.indexOf('|') >= 0 ? value.split('|') : [value]
}
const getAuthorisationType = (arr, env) => {
  const value = getTag(arr, `${env}-AuthorisationType`)
  return value ? value.split('|') : value
}

export const buildTagsModel = (arr) => {
  const data = {}

  /** Metadata */
  data.swaggerFile = getTag(arr, 'SwaggerFile')
  data.guideline = getTag(arr, 'Guideline')
  data.summary = getTag(arr, 'APIDocumentationFile')
  data.lifecycleStage = getTag(arr, 'LifecycleStage')
  data.authType = getAuthorisationType(arr, 'Production')

  /** Production */
  data.environments = []

  /** Sandbox environments */
  const envs = []

  if (arr.find(item => item.properties.displayName.indexOf('Environment-1-Name') >= 0)) envs.push('Environment-1')
  if (arr.find(item => item.properties.displayName.indexOf('Environment-2-Name') >= 0)) envs.push('Environment-2')
  if (arr.find(item => item.properties.displayName.indexOf('Environment-3-Name') >= 0)) envs.push('Environment-3')
  if (arr.find(item => item.properties.displayName.indexOf('Environment-4-Name') >= 0)) envs.push('Environment-4')

  if (envs.length !== 0) {
    envs.map(env => {
      data.environments.push({
        id: env,
        name: getName(arr, env),
        environment: 'Sandbox',
        apiName: getAPIName(arr, env),
        version: getAPIVersion(arr, env),
        url: getURL(arr, env),
        visible: getVisibility(arr, env),
        authType: getAuthorisationType(arr, env),
        authEndpoint: getOAuth2AuthorisationEndpoint(arr, env),
        tokenEndpoint: getOAuth2TokenEndpoint(arr, env),
        scopes: getOAuth2Scopes(arr, env)
      })
    })
  }

  data.environments.push({
    id: 'Production',
    name: 'Production',
    environment: 'Production',
    apiName: getAPIName(arr, 'Production'),
    version: getAPIVersion(arr, 'Production'),
    url: getURL(arr, 'Production'),
    visible: getVisibility(arr, 'Production'),
    authType: getAuthorisationType(arr, 'Production'),
    authEndpoint: getOAuth2AuthorisationEndpoint(arr, 'Production'),
    tokenEndpoint: getOAuth2TokenEndpoint(arr, 'Production'),
    scopes: getOAuth2Scopes(arr, 'Production')
  })

  return data
}

export const mapSubscriptionsToAPI = (apis, subscriptions) => {
  subscriptions.map(async (sub) => {
    const api = apis.find(api => sub.apiName.toLowerCase() === api.name.toLowerCase())
    if (!api.subscriptions) api.subscriptions = []
    api.subscriptions.push(sub)
  })
}

export const mapTagsToAPI = (apis, tags) => {
  tags.map(tag => {
    const api = apis.find(api => api.name === tag.name)
    if (api) api.tags = tag
  })
}

export const getApiTags = async (apiName, res) => {
  const token = getOAuthToken(res)
  const tagsUrl = `${process.env.PLATFORM_API_URL}/GetApiTags`

  try {
    const response = await fetch(tagsUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ apiName, environment: 'production' })
    })

    const result = await response.json()
    if (result.statusCode) return null

    return buildTagsModel(result.value)
  } catch (error) {
    console.log(`Error fetching api tags: ${error}`)
    throw error
  }
}

export const getApis = async (res) => {
  const token = getOAuthToken(res)

  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const tags = ['Public']
  const odataFilterEntries = []
  const tagFilterEntries = tags.map((tag, i) => `Tags[${i}]=${tag}`)
  odataFilterEntries.push(`${tagFilterEntries.join('&')}`)
  const url = `${PLATFORM_API_URL}/apis?${odataFilterEntries}`

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

    result.value.map(api => {
      if (api) api.tags = {}
      return api
    })

    return result.value
  } catch (error) {
    console.log(`Error fetching apis: ${error}`)
    throw error
  }
}

export const getSummary = async (summaryUrl) => {
  try {
    const response = await fetch(summaryUrl, {
      method: 'GET'
    })

    const result = await response.json()
    if (result.statusCode) return null

    return result
  } catch (error) {
    console.log(`Error fetching api summary: ${error}`)
    throw error
  }
}
