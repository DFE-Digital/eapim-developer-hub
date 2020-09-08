import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'

const ErrorPage = ({ statusCode, router, msalConfig, user }) => {
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

  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

  return (
    <Fragment>
      <ReturnTo parentPath={router.asPath} />
      <Header msalConfig={msalConfig} isLoggedIn={isLoggedIn} />
      <PhaseBanner />
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
              {/* <ContentBuilder sectionNav={false} data={Content[page].Content.Body} /> */}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ErrorPage)
