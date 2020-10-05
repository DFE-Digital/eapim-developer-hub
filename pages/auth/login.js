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
    <div className='govuk-width-container'>
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h3 className='govuk-heading-m govuk-!-margin-0'>Redirecting you to login...</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

Login.displayName = 'Login'

export default Login
