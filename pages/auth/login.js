import React, { useEffect } from 'react'
import { signIn } from '../../lib/authService'

const Login = () => {
  useEffect(() => {
    async function handler () {
      await signIn()
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to login...</span>
  )
}

Login.displayName = 'Login'

export default Login
