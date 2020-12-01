import { createContext, useState, useEffect, useContext } from 'react'

import User from '../lib/userService'
import { signOut } from '../lib/authService'
import { useCookie } from 'hooks'

export const AuthContext = createContext({
  user: null,
  setToken: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }) => {
  const [pageLoaded, setPageLoaded] = useState(false)
  const [token, updateToken] = useState(null)
  const { deleteCookie } = useCookie()

  useEffect(() => {
    let token = window.localStorage.getItem('token')

    if (token) {
      token = JSON.parse(token)
      updateToken(token)
    }

    setPageLoaded(true)
  }, [])

  const setToken = (token) => {
    window.localStorage.setItem('token', JSON.stringify(token))
    updateToken(token)
  }

  const logout = async () => {
    window.localStorage.removeItem('token')
    updateToken(null)
    deleteCookie('msal.idtoken')
    await signOut()
  }

  return (
    <AuthContext.Provider value={{ user: new User(token), setToken, logout, pageLoaded }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
