import React, { Fragment } from 'react'
import Content from '../../content.json'

const ErrorPage = ({ statusCode }) => {
  let title
  let caption

  switch (statusCode) {
    case 404:
      title = 'Page not found.'
      caption = 'If you entered a web address please check it was correct.'
      break
    case 500:
      title = 'Server Error'
      caption = 'Page contains a server error'
      break
    default:
      title = 'Server Error'
      caption = 'Page contains a server error'
  }

  return (
    <Fragment>
      <div className='govuk-width-container'>
        <div className='govuk-breadcrumbs'>
          <ol className='govuk-breadcrumbs__list'>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
            </li>
          </ol>
        </div>
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              <h1 className='govuk-heading-xl'>{title}</h1>
              <p className='govuk-body'>{caption}</p>
              <a href='/' className='govuk-body govuk-link govuk-!-margin-top- govuk-!-margin-bottom-0'>Go back to the homepage</a>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

export default ErrorPage
