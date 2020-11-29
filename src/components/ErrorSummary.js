import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const createErrorSummary = (errors) => {
  const keys = Object.keys(errors)
  return keys.map(key => ({ id: key, message: errors[key] }))
}

const hasLength = (errors) => Object.keys(errors).length !== 0

const ErrorSummary = ({ errors, pageTitle }) => {
  if (!hasLength(errors)) return null

  useEffect(() => {
    if (hasLength(errors)) document.querySelector('.govuk-error-summary').focus()
  }, [errors])

  const summary = createErrorSummary(errors)

  return (
    <>
      <div className='govuk-error-summary' aria-labelledby='error-summary-title' role='alert' tabIndex='-1' data-module='govuk-error-summary'>
        <h2 className='govuk-error-summary__title' id='error-summary-title'>There is a problem</h2>
        <div className='govuk-error-summary__body'>
          <ul className='govuk-list govuk-error-summary__list'>
            {summary.map((error, i) => {
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
