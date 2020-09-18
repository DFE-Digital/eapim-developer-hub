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
    <div className='govuk-width-container'>
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h3 className='govuk-heading-m govuk-!-margin-0'>Redirecting you to create account...</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Register
