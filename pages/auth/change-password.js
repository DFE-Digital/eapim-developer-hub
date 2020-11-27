import React, { useEffect } from 'react'
import { changePassword } from '../../src/actions/authenticate'

const ChangePassword = ({ msalChangePasswordConfig }) => {
  useEffect(() => {
    async function handler () {
      await changePassword(msalChangePasswordConfig)
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to change password...</span>
  )
}

ChangePassword.displayName = 'Change Password'

export default ChangePassword
