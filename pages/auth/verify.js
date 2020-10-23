import React, { useEffect } from 'react'
import { signInRedeem } from '../../src/actions/authenticate'

const Verify = ({ idTokenHint, msalAuthVerfiyConfig }) => {
  useEffect(() => {
    async function handler () {
      await signInRedeem(msalAuthVerfiyConfig, idTokenHint)
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

Verify.getInitialProps = async ({ query }) => {
  return { idTokenHint: query.id_token_hint }
}

Verify.displayName = 'Verify email address'

export default Verify
