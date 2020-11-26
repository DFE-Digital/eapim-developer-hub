import React, { useState, useEffect } from 'react'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import Footer from 'components/common/Footer'
import CookieBanner from 'components/common/CookieBanner'

const Layout = ({ children }) => {
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
      <Header />
      <PhaseBanner />
      {children}
      <Footer />
    </>
  )
}

export default Layout
