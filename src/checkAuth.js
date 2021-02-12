import cookies from 'next-cookies'

export const checkAuth = (req, res) => {
  const items = cookies({ req })
  const idtoken = items['msal.idtoken']

  if (!idtoken) {
    res.redirect('/auth/login')
    res.end()
  }
}
