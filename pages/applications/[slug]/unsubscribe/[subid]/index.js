import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'
import Page from 'components/Page'

import { getApplication } from '../../../../../lib/applicationService'
import { getSubscriptions, deleteSubscription } from '../../../../../lib/subscriptionService'
import errorHandler from '../../../../../lib/errorHandler'

import { getContent } from '../../../../../content/applicationManagement'

const content = getContent('api-subscriptions-unsubscribe')

const Unsubscribe = ({ application, subscription, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const title = `${content.title} ${subscription.apiName}`

  return (
    <Page title={title} router={router}>
      <h1 className='govuk-heading-xl'>{title}</h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.summaryListHeadings.application}:</dt>
          <dd className='govuk-summary-list__value'>{application.applicationName}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.summaryListHeadings.api}:</dt>
          <dd className='govuk-summary-list__value'>{subscription.apiName}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.summaryListHeadings.environment}:</dt>
          <dd className='govuk-summary-list__value'>{subscription.environment}</dd>
        </div>
      </dl>

      <form method='POST' action={`/applications/${application.applicationId}/unsubscribe/${subscription.id}`} noValidate>
        <input type='hidden' name='subscriptionId' value={subscription.id} />
        <input type='hidden' name='environment' value={subscription.environment} />
        <input type='hidden' name='applicationId' value={application.applicationId} />
        <button type='submit' className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'>
          {content.buttons.confirm}
        </button>
        <a href={`/applications/${application.applicationId}/api-subscriptions`} className='govuk-button govuk-button--secondary govuk-!-margin-top-6'>
          {content.buttons.cancel}
        </a>
      </form>
    </Page>
  )
}

Unsubscribe.getInitialProps = async ({ req, res, query }) => {
  if (req && req.method === 'POST') {
    try {
      const { subscriptionId, environment, applicationId } = req.body
      await deleteSubscription(subscriptionId, environment)

      res.writeHead(301, { Location: `/applications/${applicationId}/unsubscribe/confirmed` })
      res.end()
    } catch (error) {
      return errorHandler(error, res, 500)
    }
  }

  try {
    const subid = query.subid.substr(0, query.subid.lastIndexOf('-'))
    const environment = query.subid.split('-').pop()

    const application = await getApplication(query.slug)
    if (!application) return errorHandler(res)

    const subscriptions = await getSubscriptions(application.applicationId)
    if (!subscriptions) return errorHandler(res)

    application.subscriptions = subscriptions

    const subscription = subscriptions.find(sub => sub.id === subid && sub.environment === environment)
    if (!subscription) return errorHandler(res)

    return {
      id: query.slug,
      application,
      subscription
    }
  } catch (error) {
    return errorHandler(error, res, 500)
  }
}

Unsubscribe.displayName = 'Would you unsubscribe'

export default Unsubscribe
