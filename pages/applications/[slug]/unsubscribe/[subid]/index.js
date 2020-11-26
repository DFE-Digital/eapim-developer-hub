import React from 'react'
import { connect } from 'react-redux'
import ErrorPage from 'components/ErrorPage'
import Page from 'components/Page'

import { getApplication } from '../../../../../lib/applicationService'
import { getSubscriptions, deleteSubscription } from '../../../../../lib/subscriptionService'
import getInitialPropsErrorHandler from '../../../../../lib/getInitialPropsErrorHandler'

const Unsubscribe = ({ application, subscription, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <Page router={router} back='to the API subscription page'>
      <h1 className='govuk-heading-xl'>
        Are you sure you want unsubscribe from {subscription.apiName}?
      </h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Application:</dt>
          <dd className='govuk-summary-list__value'>{application.applicationName}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>API:</dt>
          <dd className='govuk-summary-list__value'>{subscription.apiName}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Environment:</dt>
          <dd className='govuk-summary-list__value'>{subscription.environment}</dd>
        </div>
      </dl>

      <form method='POST' action={`/applications/${application.applicationId}/unsubscribe/${subscription.id}`}>
        <input type='hidden' name='subscriptionId' value={subscription.id} />
        <input type='hidden' name='environment' value={subscription.environment} />
        <input type='hidden' name='applicationId' value={application.applicationId} />
        <button type='submit' className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'>
          Confirm unsubscription
        </button>
        <a href={`/applications/${application.applicationId}/api-subscriptions`} className='govuk-button govuk-button--secondary govuk-!-margin-top-6'>
          Cancel
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
      return getInitialPropsErrorHandler(res, 500, error)
    }
  }

  try {
    const subid = query.subid.substr(0, query.subid.lastIndexOf('-'))
    const environment = query.subid.split('-').pop()

    const application = await getApplication(query.slug)
    if (!application) return getInitialPropsErrorHandler(res, 404)

    const subscriptions = await getSubscriptions(application.applicationId)
    if (!subscriptions) return getInitialPropsErrorHandler(res, 404)

    application.subscriptions = subscriptions

    const subscription = subscriptions.find(sub => sub.id === subid && sub.environment === environment)
    if (!subscription) return getInitialPropsErrorHandler(res, 404)

    return {
      id: query.slug,
      application,
      subscription
    }
  } catch (error) {
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Unsubscribe.displayName = 'Would you unsubscribe'

export default connect(mapStateToProps)(Unsubscribe)
