import React, { Fragment } from 'react'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import Footer from 'components/common/Footer'

const Layout = ({ children, msalConfig }) => {
  return (
    <Fragment>
      <Header msalConfig={msalConfig} />
      <PhaseBanner />
      <a href='#main-content' className='govuk-skip-link'>Skip to main content</a>
      {children}
      <Footer />
    </Fragment>
  )
}

export default Layout
