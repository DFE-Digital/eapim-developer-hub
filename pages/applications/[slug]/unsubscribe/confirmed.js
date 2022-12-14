import React from 'react'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import { getApplication } from '../../../../lib/applicationService'
import { getContent } from '../../../../content/applicationManagement'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

const content = getContent('api-subscriptions-unsubscribe-confirmed')

const UnsubscribeConfirmed = ({ application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  return (
    <ApplicationManagementPage title={content.title} application={application} hideSidebar backLink>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <a href={`/applications/${application.applicationId}/api-subscriptions`} className='govuk-button govuk-button--default govuk-!-margin-top-6'>
        {content.buttons.back}
      </a>
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
      application
    }
  }
}

export default UnsubscribeConfirmed
