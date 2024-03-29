import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useRouter } from 'next/router'
import Header from './Header'
import PhaseBanner from './PhaseBanner'
import AuthNavigation from './AuthNavigation'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import Sidebar from './Sidebar'
import ErrorSummary from './ErrorSummary'
import { useInsights, useCookie } from 'hooks'
import { useAuth } from '../../providers/AuthProvider'

const Page = ({ children, title, parentTitle, sidebarContent, breadcrumbs, layout = 'full', errors = {} }) => {
  const router = useRouter()
  const { pageLoaded } = useAuth()
  const [pageView] = useInsights()
  const [bannerCookie, updateCookie] = useState(null)
  const { hasCookie, setCookie } = useCookie()

  useEffect(() => {
    const item = hasCookie('set_banner_message')

    if (!item) {
      setCookie('set_banner_message', 'true')
    } else {
      updateCookie(true)
    }
  }, [])

  useEffect(() => {
    pageView({ name: title, url: router.asPath })
  }, [])

  let template = (
    <main className='govuk-main-wrapper' id='main-content'>
      <div className='govuk-grid-row'>
        <div className={`govuk-grid-column-${layout}`}>
          <ErrorSummary pageTitle={title} errors={errors} />
          {children}
        </div>
      </div>
    </main>
  )

  if (sidebarContent) {
    template = (
      <div className='mainWrapper govuk-!-margin-top-7'>
        <aside className='sideBar'>
          <div className='sideBar_content'>
            <Sidebar title={parentTitle} items={sidebarContent} />
          </div>
        </aside>
        <main className='govuk-main-wrapper govuk-!-padding-top-0 mainContent' id='main-content'>
          <div className='govuk-grid-row'>
            <div className={`govuk-grid-column-${layout}`}>
              <ErrorSummary pageTitle={title} errors={errors} />
              {children}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      {pageLoaded && !bannerCookie && <CookieBanner />}
      <Header />
      <PhaseBanner />
      <div className='govuk-width-container'>
        <div className='service-banner'>
          <Breadcrumbs items={breadcrumbs} />
          <AuthNavigation />
        </div>
        {template}
      </div>
      <Footer />
      <Helmet>
        <title>{title} | Find and Use an API</title>
      </Helmet>
    </>
  )
}

export default Page
