import React, { useEffect } from 'react'

const B2CHandler = ({ func, text }) => {
  useEffect(() => {
    async function handler () {
      await func()
    }
    handler()
  })

  return (
    <span className='govuk-visually-hidden'>{text}</span>
  )
}

export default B2CHandler
