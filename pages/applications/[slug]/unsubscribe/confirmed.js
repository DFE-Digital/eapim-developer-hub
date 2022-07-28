import React from 'react'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import { getApplication } from '../../../../lib/applicationService'
import errorHandler from '../../../../lib/errorHandler'
import { getContent } from '../../../../content/applicationManagement'

import { checkAuth } from 'checkAuth'

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

UnsubscribeConfirmed.getInitialProps = async ({ req, res, query }) => {
  try {
    await checkAuth(req, res, query.slug)

    const application = await getApplication(query.slug, req, res)
    if (!application) return errorHandler(res)
    return { application }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default UnsubscribeConfirmed
