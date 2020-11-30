import React, { useEffect } from 'react'
import { signInRedeem } from '../../lib/authService'

const Verify = ({ idTokenHint }) => {
  useEffect(() => {
    async function handler () {
      await signInRedeem(idTokenHint)
    }

    handler()
  }, [])

  return (
    <span className='govuk-visually-hidden'>Redirecting you to login...</span>
  )
}

Verify.getInitialProps = async ({ query }) => {
  return { idTokenHint: query.id_token_hint }
}

Verify.displayName = 'Verify email address'

export default Verify
