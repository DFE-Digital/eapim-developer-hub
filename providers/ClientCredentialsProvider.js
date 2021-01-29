import jscookie from 'js-cookie'
import { createContext, useState, useEffect } from 'react'

export const ClientCredentialsContext = createContext()

export const ClientCredentialsProvider = ({ children }) => {
  const [oauth, setOAuth] = useState(null)

  useEffect(() => {
    setOAuth(jscookie.get('access_token'))
  }, [])

  return (
    <ClientCredentialsContext.Provider value={{ oauth }}>
      {children}
    </ClientCredentialsContext.Provider>
  )
}
