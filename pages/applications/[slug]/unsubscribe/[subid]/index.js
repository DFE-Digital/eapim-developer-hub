import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import { getApplication } from '../../../../../lib/applicationService'
import { getSubscriptions, deleteSubscription } from '../../../../../lib/subscriptionService'

import { getContent } from '../../../../../content/applicationManagement'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

const content = getContent('api-subscriptions-unsubscribe')

const Unsubscribe = ({ application, subscription, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const title = `${content.title} ${subscription.apiName}`

  return (
    <ApplicationManagementPage title={title} application={application} hideSidebar backLink>
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
    </ApplicationManagementPage>
  )
}

export async function getServerSideProps (context) {
  const session = await checkBasicAuth(context.req, context.res)
  await checkUserOwnsApp(session, context.query.slug)

  if (context.req && context.req.method === 'POST') {
    var body = context.req._req ? context.req._req.body : context.req.body
    const { subscriptionId, environment, applicationId } = body

    await deleteSubscription(subscriptionId, environment)

    return {
      redirect: {
        destination: `/applications/${applicationId}/unsubscribe/confirmed`,
        permanent: false
      }
    }
  }

  const subid = context.query.subid.substr(0, context.query.subid.lastIndexOf('-'))
  const environment = context.query.subid.split('-').pop()

  const application = await getApplication(context.query.slug)
  if (!application) throw Error('Forbidden')

  const subscriptions = await getSubscriptions(application.applicationId)
  application.subscriptions = subscriptions

  const subscription = subscriptions.find(sub => sub.id === subid && sub.environment === environment)
  if (!subscription) throw Error('Forbidden')

  return {
    props: {
      id: context.query.slug,
      application,
      subscription
    }
  }
}

export default Unsubscribe
