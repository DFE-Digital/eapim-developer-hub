import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const B2CHandler = ({ func, text }) => {
  useEffect(() => {
    async function handler () {
      await func()
    }
    handler()
  }, [])

  return (
    <>
      <span className='govuk-visually-hidden'>{text}</span>
      <Helmet>
        <title>{text} | DfE Developer Hub</title>
      </Helmet>
    </>
  )
}

export default B2CHandler
