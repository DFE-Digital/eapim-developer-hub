import { createContext, useState, useEffect, useContext } from 'react'
import { getItem, setItem } from '../src/utils/localstorage'

const initialState = {
  returnUrl: '/'
}

export const AppContext = createContext({
  returnUrl: '/'
})

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const app = getItem('app')
    setState(app)
  }, [])

  const updateApp = (data) => {
    setItem('app', data)
    setState(data)
  }

  const setReturnUrl = (url) => {
    if (url === '/logged-out') url = '/'
    updateApp({ returnUrl: url })
  }

  return (
    <AppContext.Provider value={{ ...state, setReturnUrl }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
