import React from 'react'
import { useCookieBanner } from 'hooks'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import Banner from 'components/common/Banner'
import Footer from 'components/common/Footer'
import CookieBanner from 'components/common/CookieBanner'
import ReturnTo from 'components/common/ReturnTo'

const Page = ({ children, router, sidebarComponent, layout = 'full', back = false }) => {
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

  if (sidebarComponent) {
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
