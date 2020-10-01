import fetch from 'isomorphic-unfetch'

const LIFECYCLE_STAGE_STATE = {
  Live: 'Alpha'
}

export const buildTagsModel = (arr) => {
  const data = {}

  const prodUrl = arr.find(tag => tag.properties.displayName === 'ProductionURL')
  const sandboxUrl = arr.find(tag => tag.properties.displayName === 'SandboxURL')
  const stage = arr.find(tag => tag.properties.displayName === 'LifecycleStage')
  const auth = arr.find(tag => tag.properties.displayName === 'RequiresLogin')
  const authEndpoint = arr.find(tag => tag.properties.displayName === 'OAuth2AuthorizationEndpoint')
  const tokenEndpoint = arr.find(tag => tag.properties.displayName === 'OAuth2TokenEndpoint')
  const swaggerFile = arr.find(tag => tag.properties.displayName === 'SwaggerFile')
  const guideline = arr.find(tag => tag.properties.displayName === 'Guideline')

  data.productionUrl = prodUrl ? prodUrl.properties.value : ''
  data.sandboxUrl = sandboxUrl ? sandboxUrl.properties.value : ''
  data.lifecycleStage = stage ? LIFECYCLE_STAGE_STATE[stage.properties.value] : ''
  data.requiresLogin = auth ? auth.properties.value : ''
  data.authEndpoint = authEndpoint ? authEndpoint.properties.value : ''
  data.tokenEndpoint = tokenEndpoint ? tokenEndpoint.properties.value : ''
  data.swaggerFile = swaggerFile ? swaggerFile.properties.value : null
  data.guideline = guideline ? guideline.properties.value : null

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

export const getApiTags = async (apiName) => {
  const tagsUrl = `${process.env.PLATFORM_API_URL}/GetApiTags`

  try {
    const response = await fetch(tagsUrl, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
      body: JSON.stringify({ apiName, environment: 'production' })
    })

    const res = await response.json()
    return buildTagsModel(res.value)
  } catch (error) {
    console.log(`Error fetching api tags: ${error}`)
    throw error
  }
}

export const getApis = async () => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const tags = ['Public']
  const odataFilterEntries = []
  const tagFilterEntries = tags.map((tag, i) => `Tags[${i}]=${tag}`)
  odataFilterEntries.push(`${tagFilterEntries.join('&')}`)
  const url = `${PLATFORM_API_URL}/apis?${odataFilterEntries}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY }
    })

    const res = await response.json()

    res.value.map(api => {
      if (api) {
        api.subscriptions = []
        api.tags = { productionUrl: '', sandboxUrl: '', lifecycleStage: '', requiresLogin: '' }
      }
      return api
    })

    return res.value
  } catch (error) {
    console.log(`Error fetching apis: ${error}`)
    throw error
  }
}
