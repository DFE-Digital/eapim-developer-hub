import fetch from 'isomorphic-unfetch'
export const STORE_DATA = Symbol('STORE_DATA')
export const CANCEL_APPLICATION = Symbol('CANCEL_APPLICATION')
export const REGISTER_APP = Symbol('REGISTER_APP')
export const REGISTER_APP_SUCESS = Symbol('REGISTER_APP_SUCESS')
export const SELECT_APPLICATION = Symbol('SELECT_APPLICATION')
export const CLEAR_APPLICATION = Symbol('CLEAR_APPLICATION')
export const REQUEST_APPLICATIONS = Symbol('REQUEST_APPLICATIONS')
export const RECEIVED_APPLICATIONS = Symbol('RECEIVED_APPLICATIONS')
export const REQUEST_UPDATE_APPLICATION = Symbol('REQUEST_UPDATE_APPLICATION')
export const RECEIVED_UPDATE_APPLICATION = Symbol('RECEIVED_UPDATE_APPLICATION')
export const REQUEST_DELETE_APPLICATION = Symbol('REQUEST_DELETE_APPLICATION')
export const RECEIVED_DELETE_APPLICATION = Symbol('RECEIVED_DELETE_APPLICATION')

export const getApplications = (user) => async dispatch => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/GetApplications`
  const body = {
    userName: `${user.idToken.given_name} ${user.idToken.family_name}`,
    userEmail: user.idToken['signInNames.emailAddress'],
    userID: user.accountIdentifier,
    organization: user.idToken.extension_OrganizationName,
    role: user.idToken.extension_Role
  }

  try {
    dispatch({ type: REQUEST_APPLICATIONS })
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY
      },
      body: JSON.stringify(body)
    })
    const res = await response.json()
    res.Applications.forEach(app => {
      app.applicationName = app.applicationName.split('-').pop()
    })
    if (res) dispatch({ type: RECEIVED_APPLICATIONS, payload: res.Applications })
  } catch (error) {
    dispatch({ type: RECEIVED_APPLICATIONS, payload: [] })
  }
}

export const saveAppData = (data) => async dispatch => {
  if (data) {
    dispatch({ type: STORE_DATA,
      payload: data
    })
  }
}

export const registerApplication = (data) => async dispatch => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/RegisterApplication`

  try {
    dispatch({ type: REGISTER_APP })
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY
      },
      body: JSON.stringify(data)
    })
    const res = await response.json()

    if (res) {
      dispatch({ type: REGISTER_APP_SUCESS })
      dispatch({ type: SELECT_APPLICATION, payload: res })
      return res
    }
  } catch (error) {
    dispatch({ type: CANCEL_APPLICATION })
    return 'failed'
  }
}

export const updateApplication = (data) => async dispatch => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/UpdateApplication`

  try {
    dispatch({ type: REQUEST_UPDATE_APPLICATION })
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      dispatch({ type: RECEIVED_UPDATE_APPLICATION })
      return response.ok
    }
  } catch (error) {
    // dispatch({ type: CANCEL_APPLICATION })
  }
}

export const deleteApplication = (data) => async dispatch => {
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const url = `${PLATFORM_API_URL}/DeleteApplication`

  try {
    dispatch({ type: REQUEST_DELETE_APPLICATION })
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      dispatch({ type: RECEIVED_DELETE_APPLICATION })
      return response.ok
    }
  } catch (error) {
    // dispatch({ type: CANCEL_APPLICATION })
  }
}

export const selectApplication = (data) => async dispatch => {
  dispatch({ type: SELECT_APPLICATION, payload: data })
}

export const clearApplication = () => async dispatch => {
  dispatch({ type: CLEAR_APPLICATION })
}

export const cancelApplication = () => async dispatch => {
  dispatch({ type: CANCEL_APPLICATION })
}
