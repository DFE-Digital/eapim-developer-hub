import React from 'react'

const ValidationMessages = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <div className='govuk-error-summary' aria-labelledby='error-summary-title' role='alert' tabIndex='-1' data-module='govuk-error-summary'>
          <h2 className='govuk-error-summary__title' id='error-summary-title'>There is a problem</h2>
          <div className='govuk-error-summary__body'>
            <ul className='govuk-list govuk-error-summary__list'>
              {errors.map((error, i) => {
                return (
                  <li key={i}>
                    <a href={`#${error.id}`}>{error.message}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default ValidationMessages
