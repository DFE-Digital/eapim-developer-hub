import React from 'react'
import { connect } from 'react-redux'
import AccessChecker from 'components/common/AccessChecker'
import Router from 'next/router'
import ReturnTo from 'components/common/ReturnTo'
import { PrivateRoute } from 'components/common/PrivateRoute'

import { getApplication } from '../../../../../lib/applicationService'
import { getSubscriptions, deleteSubscription } from '../../../../../lib/subscriptionService'

import getInitialPropsErrorHandler from '../../../../../lib/getInitialPropsErrorHandler'

const Unsubscribe = ({ application, subscription, router, msalConfig }) => {
  return (
    <>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect={'/applications'} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <a href='#' className='govuk-back-link' onClick={() => Router.back()}>Back</a>
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column'>
              {subscription && (
                <>
                  <h1 className='govuk-heading-xl'>
                    Are you sure you want unsubscribe from {subscription.apiName}?
                  </h1>

                  <dl className='govuk-summary-list'>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>Application:</dt>
                      <dd className='govuk-summary-list__value'>{(application ? application.applicationName : '')}</dd>
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
                    <a href={`/applications/${application.applicationId}/api-subscriptions`} className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>
                      Cancel
                    </a>
                  </form>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

Unsubscribe.getInitialProps = async ({ req, res, query }) => {
  if (req && req.method === 'GET') {
    try {
      const application = await getApplication(query.slug)
      const subscriptions = await getSubscriptions(application.applicationId)

      if (!application) return getInitialPropsErrorHandler(res, 404)

      application.subscriptions = subscriptions
      const subscription = subscriptions.find(sub => sub.id === query.subid)

      return {
        id: query.slug,
        application,
        subscription
      }
    } catch (error) {
      console.log(`Error getting application: ${error}`)
      return {
        error,
        id: query.slug
      }
    }
  }

  if (req && req.method === 'POST') {
    try {
      const { subscriptionId, environment, applicationId } = req.body
      await deleteSubscription(subscriptionId, environment)

      res.writeHead(301, { Location: `/applications/${applicationId}/unsubscribe/confirmed` })
      res.end()
    } catch (error) {
      console.log(`Error unsubscribing: ${error}`)
      return {
        error,
        id: query.slug
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Unsubscribe.displayName = 'Would you unsubscribe'

export default connect(mapStateToProps)(Unsubscribe)
