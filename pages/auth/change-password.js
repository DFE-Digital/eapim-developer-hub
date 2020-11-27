import React, { useEffect } from 'react'
import { changePassword } from '../../lib/authService'

const ChangePassword = () => {
  useEffect(() => {
    async function handler () {
      await changePassword()
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to change password...</span>
  )
}

ChangePassword.displayName = 'Change Password'

export default ChangePassword
