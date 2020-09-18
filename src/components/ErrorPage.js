import React, { Fragment } from 'react'
import Content from '../../content.json'
import ReturnTo from 'components/common/ReturnTo'

const ErrorPage = ({ statusCode, router }) => {
  let message
  let caption

  switch (statusCode) {
    case 404:
      message = 'Not Found'
      caption = 'Page not found'
      break
    case 500:
      message = 'Server Error'
      caption = 'Page contains a server error'
      break
    default:
      message = 'Server Error'
      caption = 'Page contains a server error'
  }

  return (
    <Fragment>
      <ReturnTo parentPath={router.asPath} />
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
              <h1 className='govuk-heading-xl'>{statusCode} {message}</h1>
              <p className='govuk-body'>{caption}</p>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

export default ErrorPage
