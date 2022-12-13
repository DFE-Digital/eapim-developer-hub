import { format } from 'date-fns'
import React from 'react'
import Link from 'next/link'
import { getContent } from '../../../content/applicationManagement'
import ErrorPage from 'components/pages/ErrorPage'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import { useAuth } from '../../../providers/AuthProvider'
import { getApplication } from '../../../lib/applicationService'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

const content = getContent('details')

const ApplicationDetails = ({ application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const { user } = useAuth()

  return (
    <ApplicationManagementPage title={content.title} application={application}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>
            Application:
          </dt>
          <dd className='govuk-summary-list__value'>
            {application.applicationName}
          </dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>
            Created on:
          </dt>
          <dd className='govuk-summary-list__value'>
            {format(new Date(application.createdOn), 'dd MMM yyyy, hh:mmaaa')}
          </dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>
            Client id:
          </dt>
          <dd className='govuk-summary-list__value'>
            {application.clientId}
          </dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>
            Description:
          </dt>
          <dd className='govuk-summary-list__value'>
            {application.description}
          </dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>
            Application Owner:
          </dt>
          <dd className='govuk-summary-list__value'>
            {user.name()}
          </dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>
            Contact email:
          </dt>
          <dd className='govuk-summary-list__value'>
            {user.email()}
          </dd>
        </div>
      </dl>

      <Link legacyBehavior href='/applications/[slug]/api-subscriptions' as={`/applications/${application.applicationId}/api-subscriptions`} passHref>
        <a role='button' className='govuk-button govuk-button--default govuk-!-margin-top-6'>{content.buttons.subscribe}</a>
      </Link>
    </ApplicationManagementPage>
  )
}

export async function getServerSideProps (context) {
  const session = await checkBasicAuth(context.req, context.res)
  await checkUserOwnsApp(session, context.query.slug)

  const application = await getApplication(context.query.slug)
  if (!application) throw new Error('Forbidden')

  return {
    props: {
      id: context.query.slug,
      application
    }
  }
}

export default ApplicationDetails
