import React, { useState, useEffect } from 'react'
import { useCookie } from 'hooks'

const CookieBanner = () => {
  const [cookie, updateCookie] = useState(null)
  const { hasCookie, setCookie } = useCookie()

  useEffect(() => {
    const item = hasCookie('set_banner_message')

    if (!item) {
      setCookie('set_banner_message', 'true')
    } else {
      updateCookie(true)
    }
  }, [])

  if (cookie) return null

  return (
    <div className='cookie-banner' id='govuk-banner-message'>
      <div className='govuk-width-container'>
        <span className='govuk-body middle'>GOV.UK uses cookies to make the site simpler. <a href='/cookies' className='govuk-link'>Find out more about cookies</a></span>
      </div>
    </div>
  )
}

export default CookieBanner
