import React, { Fragment } from 'react'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import Footer from 'components/common/Footer'
import IE11BrowserMessage from 'components/common/IE11BrowserMessage'

const Layout = ({ children, msalConfig, msalRegisterConfig }) => {
  return (
    <Fragment>
      <IE11BrowserMessage />
      <Header msalConfig={msalConfig} msalRegisterConfig={msalRegisterConfig} />
      <PhaseBanner />
      <a href='#main-content' className='govuk-skip-link'>Skip to main content</a>
      {children}
      <Footer />
    </Fragment>
  )
}

export default Layout
