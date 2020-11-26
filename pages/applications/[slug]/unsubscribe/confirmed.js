import React from 'react'
import Page from 'components/Page'
import ErrorPage from 'components/ErrorPage'

import getInitialPropsErrorHandler from '../../../../lib/getInitialPropsErrorHandler'

const UnsubscribeConfirmed = ({ applicationId, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <Page router={router} back='to the API subscription page'>
      <h1 className='govuk-heading-xl'>You have successfully unsubscribed</h1>
      <a href={`/applications/${applicationId}/api-subscriptions`} className='govuk-button govuk-button--default govuk-!-margin-top-6'>
        Back to subscriptions
      </a>
    </Page>
  )
}

UnsubscribeConfirmed.getInitialProps = ({ res, query }) => {
  const { slug } = query

  if (!slug) return getInitialPropsErrorHandler(res, 404)

  return { applicationId: slug }
}

UnsubscribeConfirmed.displayName = 'Unsubscribe confirmed'

export default UnsubscribeConfirmed
