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
        <title>{text} | Find and Use an API</title>
      </Helmet>
    </>
  )
}

export default B2CHandler
