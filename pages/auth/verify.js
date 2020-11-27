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
    <span className='govuk-visually-hidden'>Redirecting you to login...</span>
  )
}

Verify.getInitialProps = async ({ query }) => {
  return { idTokenHint: query.id_token_hint }
}

Verify.displayName = 'Verify email address'

export default Verify
