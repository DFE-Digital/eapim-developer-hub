import React from 'react'
import ContentBuilder from 'components/ContentBuilder'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import { getApplication } from '../../../lib/applicationService'
import errorHandler from '../../../lib/errorHandler'

import { getContent } from '../../../content/applicationManagement'

import { checkAuth } from 'checkAuth'

const content = getContent('create-success')

const ApplicationCreateSuccess = ({ application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  return (
    <ApplicationManagementPage title={content.title} application={application} hideSidebar backLink>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <h2 className='govuk-heading-l'>You added {application.applicationName}</h2>
      <ContentBuilder sectionNav={false} data={content.content} />
      <a role='button' className='govuk-button' href={`/applications/${application.applicationId}/credentials`}>{content.buttons.view}</a>
    </ApplicationManagementPage>
  )
}

ApplicationCreateSuccess.getInitialProps = async ({ req, res, query }) => {
  checkAuth(req, res)

  try {
    const application = await getApplication(query.slug, res)
    if (!application) return errorHandler(res)
    return {
      application
    }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default ApplicationCreateSuccess
