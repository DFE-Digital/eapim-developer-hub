import React from 'react'
import { Helmet } from 'react-helmet'
import { useCookieBanner } from 'hooks'
import Header from './Header'
import PhaseBanner from './PhaseBanner'
import AuthNavigation from './AuthNavigation'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import ReturnTo from './ReturnTo'
import Sidebar from './Sidebar'

const Page = ({ children, router, title, parentTitle, sidebarContent, layout = 'full', back = false, error = false }) => {
  const { siteLoaded, bannerCookie } = useCookieBanner()

  let template = (
    <main className='govuk-main-wrapper' id='main-content' role='main'>
      <div className='govuk-grid-row'>
        <div className={`govuk-grid-column-${layout}`}>
          {children}
        </div>
      </div>
    </main>
  )

  if (sidebarContent) {
    template = (
      <section className='mainWrapper govuk-!-margin-top-7'>
        <aside className='sideBar'>
          <div className='sideBar_content'>
            <Sidebar title={parentTitle} items={sidebarContent} />
          </div>
        </aside>
        <main className='govuk-main-wrapper govuk-!-padding-top-0 mainContent' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className={`govuk-grid-column-${layout}`}>
              {children}
            </div>
          </div>
        </main>
      </section>
    )
  }

  return (
    <>
      {siteLoaded && !bannerCookie && <CookieBanner cookie={bannerCookie} />}
      <Header />
      <PhaseBanner />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <div className='govuk-width-container service-banner'>
          {!error && <Breadcrumbs router={router} back={back} />}
          <AuthNavigation />
        </div>
        {template}
      </div>
      <Footer />
      <Helmet>
        <title>{title} | DfE Developer Hub</title>
      </Helmet>
    </>
  )
}

export default Page
