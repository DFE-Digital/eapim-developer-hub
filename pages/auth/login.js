import React, { useEffect } from 'react'
import { signIn } from '../../src/actions/authenticate'

const Login = ({ msalConfig }) => {
  useEffect(() => {
    async function handler () {
      await signIn(msalConfig)
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to login...</span>
  )
}

Login.displayName = 'Login'

export default Login
