import React, { useEffect } from 'react'
import { signOut } from '../../src/actions/authenticate'

const Logout = ({ msalConfig }) => {
  useEffect(() => {
    async function handler () {
      await signOut(msalConfig)
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Signing out...</span>
  )
}

Logout.displayName = 'Logout'

export default Logout
