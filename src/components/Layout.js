import React, { useState, useEffect } from 'react'
import Header from './Header'
import PhaseBanner from './PhaseBanner'
import Footer from './Footer'
import CookieBanner from './CookieBanner'

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
