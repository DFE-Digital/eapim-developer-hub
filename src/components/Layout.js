import React, { useState, useEffect } from 'react'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import Footer from 'components/common/Footer'
import IE11BrowserMessage from 'components/common/IE11BrowserMessage'
import CookieBanner from 'components/common/CookieBanner'

import { useIsIE11 } from '../hooks'

const Layout = ({ children, msalConfig, msalRegisterConfig }) => {
  if (useIsIE11()) return <IE11BrowserMessage />
  
  const [siteLoaded, setSiteLoaded] = useState(false)
  const [bannerCookie, setBannerCookie] = useState(null)

  useEffect(() => {
    const cookies = (document.cookie.split(';'))
    const cookie = cookies.find(item => item.indexOf('cookie_message') > -1)
    setBannerCookie(cookie)
    if (!bannerCookie) {
      const date = new Date()
      date.setTime(date.getTime() + (28 * 24 * 60 * 60 * 1000))
      document.cookie = `seen_cookie_message=true; expires=${date.toUTCString()}; path=/`
      setSiteLoaded(true)
    }
  }, [])

  return (
    <>
      {siteLoaded && !bannerCookie && <CookieBanner cookie={bannerCookie} />}
      <Header msalConfig={msalConfig} msalRegisterConfig={msalRegisterConfig} />
      <PhaseBanner />
      <a href='#main-content' className='govuk-skip-link'>Skip to main content</a>
      {children}
      <Footer />
    </>
  )
}

export default Layout
