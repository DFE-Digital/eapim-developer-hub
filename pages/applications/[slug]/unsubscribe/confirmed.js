import React from 'react'
import Content from '../../../../content.json'

import AccessChecker from 'components/common/AccessChecker'
import PrivateRoute from 'components/common/PrivateRoute'
import ReturnTo from 'components/common/ReturnTo'

import getInitialPropsErrorHandler from '../../../../lib/getInitialPropsErrorHandler'

const UnsubscribeConfirmed = ({ applicationId, router, msalConfig }) => {
  return (
    <>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect={'/applications'} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <div className='govuk-breadcrumbs'>
          <ol className='govuk-breadcrumbs__list'>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item' aria-current='page'>
              <a className='govuk-breadcrumbs__link' href={`/application/${applicationId}/api-subscriptions`}>Back</a>
            </li>
          </ol>
        </div>
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column'>
              <h1 className='govuk-heading-xl'>You have successfully unsubscribed</h1>
              <a href={`/applications/${applicationId}/api-subscriptions`} className='govuk-button govuk-button--default govuk-!-margin-top-6'>Back to subscriptions</a>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

UnsubscribeConfirmed.getInitialProps = ({ res, query }) => {
  const { slug } = query

  if (!slug) return getInitialPropsErrorHandler(res, 404)

  return { applicationId: slug }
}

UnsubscribeConfirmed.displayName = 'Unsubscribe confirmed'

export default UnsubscribeConfirmed
