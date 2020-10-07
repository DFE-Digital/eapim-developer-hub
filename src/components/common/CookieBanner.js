import React from 'react'

const CookieBanner = () => {
  return (
    <div className='cookie-banner' id='govuk-banner-message'>
      <div className='govuk-width-container'>
        <span className="govuk-body middle">GOV.UK uses cookies to make the site simpler. <a href='/cookies' className='govuk-link'>Find out more about cookies</a></span>
      </div>
    </div>
  )
}

export default CookieBanner
