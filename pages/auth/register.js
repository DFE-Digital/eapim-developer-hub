import React, { useEffect } from 'react'
import { register } from '../../src/actions/authenticate'

const Register = ({ msalRegisterConfig }) => {
  useEffect(() => {
    async function handler () {
      await register(msalRegisterConfig)
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to create account...</span>
  )
}

Register.displayName = 'Register'

export default Register
