import React, { useEffect } from 'react'
import { forgotPassword } from '../../src/actions/authenticate'

const ForgotPassword = ({ msalForgotPasswordConfig }) => {
  useEffect(() => {
    async function handler () {
      await forgotPassword(msalForgotPasswordConfig)
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to reset password...</span>
  )
}

ForgotPassword.displayName = 'Forgot Password'

export default ForgotPassword
