import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../content.json'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import ContentBuilder from 'components/common/ContentBuilder'

const page = 'Privacy'

const PrivacyPolicy = ({ user, msalConfig, router }) => {
  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

  return (
    <Fragment>
      <AccessChecker msalConfig={msalConfig} />
      <ReturnTo parentPath={router.asPath} />
      <Header msalConfig={msalConfig} isLoggedIn={isLoggedIn} />
      <PhaseBanner />
      <div className='govuk-width-container'>
        <div className='govuk-breadcrumbs'>
          <ol className='govuk-breadcrumbs__list'>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item' aria-current='page'>{Content[page].Page}</li>
          </ol>
        </div>
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
              <ContentBuilder sectionNav={false} data={Content[page].Content.Body} />
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

export { PrivacyPolicy }
export default connect(mapStateToProps)(PrivacyPolicy)
