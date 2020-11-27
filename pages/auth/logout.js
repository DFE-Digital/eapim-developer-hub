import React, { useEffect } from 'react'
import { useAuth } from 'context'

const Logout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  })

  return (
    <span className='govuk-visually-hidden'>Signing out...</span>
  )
}

Logout.displayName = 'Logout'

export default Logout
