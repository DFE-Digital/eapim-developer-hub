// this should only ever be used server side
// next.js should shake this file if accidentally added due to window check
// https://github.com/vercel/next.js/discussions/30556
if (typeof window === 'undefined') {
  const fetch = require('isomorphic-unfetch')
  const jwtdecode = require('jwt-decode')

  const data =
    'grant_type=client_credentials' +
    `&client_id=${encodeURIComponent(
      process.env.OAUTH_CLIENT_CREDENTIALS_ID
    )}` +
    `&client_secret=${encodeURIComponent(
      process.env.OAUTH_CLIENT_CREDENTIALS_SECRET
    )}` +
    `&resource=${encodeURIComponent(process.env.OAUTH_RESOURCE)}`

  const fetchToken = async () => {
    const request = await fetch(process.env.OAUTH_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    })

    return request.json()
  }

  let accessToken = null

  class ClientCredentials {
    getOauthToken = async () => {
      if (accessToken) {
        const token = jwtdecode(accessToken)
        const expired = Date.now() >= token.exp * 1000
        if (expired) {
          const newtoken = await fetchToken()
          accessToken = newtoken.access_token
          return accessToken
        } else {
          return accessToken
        }
      } else {
        const newtoken = await fetchToken()
        accessToken = newtoken.access_token
        return accessToken
      }
    }
  }

  module.exports = new ClientCredentials()
}
