import React, { useEffect } from 'react'
import { forgotPassword } from '../../lib/authService'

const ForgotPassword = () => {
  useEffect(() => {
    async function handler () {
      await forgotPassword()
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to reset password...</span>
  )
}

ForgotPassword.displayName = 'Forgot Password'

export default ForgotPassword
