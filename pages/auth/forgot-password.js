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
    <div className='govuk-width-container'>
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h3 className='govuk-heading-m govuk-!-margin-0'>Redirecting you to reset password...</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ForgotPassword
