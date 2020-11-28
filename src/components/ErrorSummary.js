import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const ErrorSummary = ({ errors, pageTitle }) => {
  if (!errors.length) return null

  useEffect(() => {
    if (errors.length) document.querySelector('.govuk-error-summary').focus()
  }, [])

  return (
    <>
      <div className='govuk-error-summary' aria-labelledby='error-summary-title' role='alert' tabIndex='-1' data-module='govuk-error-summary'>
        <h2 className='govuk-error-summary__title' id='error-summary-title'>There is a problem</h2>
        <div className='govuk-error-summary__body'>
          <ul className='govuk-list govuk-error-summary__list'>
            {errors.map((error, i) => {
              const href = error.href || `#${error.id}`
              return (
                <li key={i}>
                  <a href={href}>{error.message}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Helmet>
        <title>Error - {pageTitle} | DfE Developer Hub</title>
      </Helmet>
    </>
  )
}

export default ErrorSummary
