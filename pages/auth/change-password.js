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
    <div className='govuk-width-container'>
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h3 className='govuk-heading-m govuk-!-margin-0'>Redirecting you to change password...</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChangePassword
