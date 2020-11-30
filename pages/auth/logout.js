import React from 'react'
import { useAuth } from '../../providers/AuthProvider'
import B2CHandler from 'components/B2CHandler'

const Logout = () => {
  const { logout } = useAuth()
  return <B2CHandler func={logout} text='Signing out...' />
}

export default Logout
