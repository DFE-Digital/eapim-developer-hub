import { createContext, useState, useEffect, useContext } from 'react'

import User from '../lib/userService'
import { signOut } from '../lib/authService'

export const AuthContext = createContext({
  user: null,
  setToken: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }) => {
  const [token, updateToken] = useState(null)

  useEffect(() => {
    let token = window.localStorage.getItem('token')

    if (token) {
      token = JSON.parse(token)
      updateToken(token)
    }
  }, [])

  const setToken = (token) => {
    window.localStorage.setItem('token', JSON.stringify(token))
    updateToken(token)
  }

  const logout = async () => {
    window.localStorage.removeItem('token')
    updateToken(null)
    await signOut()
  }

  return (
    <AuthContext.Provider value={{ user: new User(token), setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
