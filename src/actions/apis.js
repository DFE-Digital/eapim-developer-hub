import fetch from 'isomorphic-unfetch'

export const REQUEST_APIS = Symbol('REQUEST_APIS')
export const RECEIVED_APIS = Symbol('RECEIVED_APIS')
export const STORE_APIS = Symbol('STORE_APIS')
export const STORE_API = Symbol('STORE_API')
export const CLEAR_API = Symbol('CLEAR_API')

export const getApis = () => async dispatch => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const tags = ['Public']
  const odataFilterEntries = []
  const tagFilterEntries = tags.map((tag, i) => `Tags[${i}]=${tag}`)
  odataFilterEntries.push(`${tagFilterEntries.join('&')}`)
  const url = `${PLATFORM_API_URL}/apis?${odataFilterEntries}`

  try {
    dispatch({ type: REQUEST_APIS })
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY
      }
    })
    const res = await response.json()
    if (res && res.value) dispatch({ type: RECEIVED_APIS, payload: res.value })
  } catch (error) {
    dispatch({ type: RECEIVED_APIS, payload: [] })
  }
}

export const storeApis = (apis) => {
  return dispatch => {
    dispatch({ type: STORE_APIS, payload: apis })
  }
}

export const storeApi = (api) => {
  return dispatch => {
    dispatch({ type: STORE_API, payload: api })
  }
}

export const clearApi = () => {
  return dispatch => {
    dispatch({ type: CLEAR_API })
  }
}
