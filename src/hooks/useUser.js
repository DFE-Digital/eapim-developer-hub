import { useState, useEffect } from 'react'

export default function useUser () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let token = window.localStorage.getItem('token')

    if (token) {
      token = JSON.parse(token)
      return setUser({ accountIdentifier: token.accountIdentifier, ...token.idTokenClaims })
    } else {
      console.log('here')
    }

    setUser(null)
  })

  return user
}
