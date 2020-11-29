import React from 'react'
import Page from 'components/Page'
import ErrorPage from 'components/pages/ErrorPage'
import errorHandler from '../../../../lib/errorHandler'
import { getContent } from '../../../../content/applicationManagement'

const content = getContent('api-subscriptions-unsubscribe-confirmed')

const UnsubscribeConfirmed = ({ applicationId, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <Page title={content.title} router={router}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <a href={`/applications/${applicationId}/api-subscriptions`} className='govuk-button govuk-button--default govuk-!-margin-top-6'>
        {content.buttons.back}
      </a>
    </Page>
  )
}

UnsubscribeConfirmed.getInitialProps = ({ res, query }) => {
  const { slug } = query

  if (!slug) return errorHandler(res)

  return { applicationId: slug }
}

UnsubscribeConfirmed.displayName = 'Unsubscribe confirmed'

export default UnsubscribeConfirmed
