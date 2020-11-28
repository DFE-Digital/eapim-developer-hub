import { createContext, useEffect, useReducer, useContext } from 'react'

const initialState = {
  name: '',
  description: '',
  redirectUrl: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      const init = window.localStorage.getItem('application')
      return (init) ? { ...JSON.parse(init) } : initialState
    case 'UPDATE':
      const data = { ...state, ...action.payload }
      window.localStorage.setItem('application', JSON.stringify(data))
      return data
    case 'CLEAR':
      window.localStorage.removeItem('application')
      return initialState
    default:
  }
}

export const ApplicationContext = createContext({
  application: initialState,
  update: () => {},
  clear: () => {}
})

export const ApplicationProvider = ({ children }) => {
  const [application, dispatch] = useReducer(reducer, initialState)

  const update = (payload) => dispatch({ type: 'UPDATE', payload })
  const clear = () => dispatch({ type: 'CLEAR' })

  useEffect(() => {
    dispatch({ type: 'INIT' })
  }, [])

  return (
    <ApplicationContext.Provider value={{ application, update, clear }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplication = () => useContext(ApplicationContext)
