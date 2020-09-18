import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../src/actions/authenticate'

const Logout = ({ signOut, msalConfig }) => {
  useEffect(() => {
    async function handler () {
      await signOut(msalConfig)
    }

    handler()
  })

  return (
    <div className='govuk-width-container'>
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h3 className='govuk-heading-m govuk-!-margin-0'>Signing out...</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

export default connect(null, { signOut })(Logout)
