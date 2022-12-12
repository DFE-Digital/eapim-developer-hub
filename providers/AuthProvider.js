import { createContext, useState, useEffect, useContext } from 'react'

import User from '../lib/userService'
import { signOut } from '../lib/authService'
import { useCookie } from 'hooks'

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }) => {
  const [pageLoaded, setPageLoaded] = useState(false)
  const [account, setAccount] = useState(null)
  const { deleteCookie } = useCookie()

  useEffect(() => {
    const item = window.localStorage.getItem('account')
    if (item) setAccount(JSON.parse(item))

    setPageLoaded(true)
  }, [])

  const setUser = (data) => {
    window.localStorage.setItem('account', JSON.stringify(data))
    setAccount('msal.idtoken', data)
  }

  const logout = async (redirectUri = null) => {
    window.localStorage.removeItem('account')
    setAccount(null)
    deleteCookie('msal.idtoken')
    await signOut()
  }

  return (
    <AuthContext.Provider value={{ user: new User(account), setUser, logout, pageLoaded }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
