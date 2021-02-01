const fetch = require('isomorphic-unfetch')
const jwtdecode = require('jwt-decode')

const data = 'grant_type=client_credentials' +
  `&client_id=${encodeURIComponent(process.env.OAUTH_CLIENT_CREDENTIALS_ID)}` +
  `&client_secret=${encodeURIComponent(process.env.OAUTH_CLIENT_CREDENTIALS_SECRET)}` +
  `&resource=${encodeURIComponent(process.env.OAUTH_RESOURCE)}`

const getToken = async () => {
  const request = await fetch(process.env.OAUTH_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data
  })

  return request.json()
}

module.exports = async (req, res, next) => {
  if (req.cookies.access_token) {
    try {
      const token = jwtdecode(req.cookies.access_token)
      const expired = Date.now() >= (token.exp * 1000)

      if (expired) {
        try {
          const newtoken = await getToken()
          res.cookie('access_token', newtoken.access_token, { secure: false })
          next()
        } catch (err) {
          next(err)
        }
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  } else {
    try {
      const newtoken = await getToken()
      res.cookie('access_token', newtoken.access_token, { secure: false })
      res.locals.access_token = newtoken.access_token
      next()
    } catch (err) {
      next(err)
    }
  }
}
