import { createContext } from 'react'

const AuthContext = createContext({
  token: null,
  login: () => {},
  logout: () => {}
})

export default AuthContext
