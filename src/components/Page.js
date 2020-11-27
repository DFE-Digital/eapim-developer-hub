import React from 'react'
import { useCookieBanner } from 'hooks'
import Header from './Header'
import PhaseBanner from './PhaseBanner'
import Banner from './Banner'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import ReturnTo from './ReturnTo'
import Sidebar from './Sidebar'
import ApplicationSidebar from './ApplicationSidebar'

const Page = ({ children, router, title, sidebarContent, sidebarData, layout = 'full', back = false }) => {
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

  const sidebarComponent = (sidebarData) ? <ApplicationSidebar title={title} items={sidebarContent} data={sidebarData} /> : <Sidebar title={title} items={sidebarContent} />

  if (sidebarContent) {
    template = (
      <section className='mainWrapper govuk-!-margin-top-7'>
        <aside className='sideBar'>
          <div className='sideBar_content'>
            {sidebarComponent}
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
        <Banner router={router} back={back} />
        {template}
      </div>
      <Footer />
    </>
  )
}

export default Page
