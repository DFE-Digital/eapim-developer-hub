import React, { useEffect } from 'react'
import { signInRedeem } from '../../src/actions/authenticate'

const Verify = ({ id_token_hint, msalAuthVerfiyConfig }) => {
  useEffect(() => {
    async function handler () {
      await signInRedeem(msalAuthVerfiyConfig, id_token_hint)
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
  const { id_token_hint } = query
  return { id_token_hint }
}

export default Verify
