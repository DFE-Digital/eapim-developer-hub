import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import { getContent } from '../../../content/applicationManagement'

import { getApplication } from '../../../lib/applicationService'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

const content = getContent('delete-application')

const DeleteApplication = ({ application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  return (
    <ApplicationManagementPage title={content.title} application={application} layout='two-thirds' hideSidebar backLink>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Application:</dt>
          <dd className='govuk-summary-list__value'>{application.applicationName}</dd>
        </div>
      </dl>

      <a href={`/applications/${application.applicationId}/delete-confirm`} className='govuk-button govuk-!-margin-top-6 govuk-!-margin-right-1' role='button'>{content.buttons.continue}</a>
      <a href={`/applications/${application.applicationId}/details`} className='govuk-button govuk-button--secondary govuk-!-margin-top-6' role='button'>{content.buttons.cancel}</a>
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

export default DeleteApplication
