import { useState, useEffect } from 'react'

export const useIsIE11 = () => {
  const [isIe11, setIsIe11] = useState(false)

  useEffect(() => {
    const ie11 = !!(window.MSInputMethodContext && document.documentMode)
    setIsIe11(ie11)
  })

  return isIe11
}

export const useFocusMain = () => {
  useEffect(() => {
    return document.querySelector('#main-content').focus()
  }, [])
}

export const useCookieBanner = () => {
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

  return {
    siteLoaded,
    bannerCookie
  }
}
