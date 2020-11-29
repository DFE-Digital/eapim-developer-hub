import React from 'react'
import ContentBuilder from 'components/ContentBuilder'
import ApplicationPage from 'components/pages/ApplicationPage'
import ErrorPage from 'components/pages/ErrorPage'
import { getApplication } from '../../../lib/applicationService'
import errorHandler from '../../../lib/errorHandler'

import { getContent } from '../../../content/applicationManagement'
const content = getContent('create-success')

const ApplicationCreateSuccess = ({ application, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <ApplicationPage title={content.title} router={router}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <h2 className='govuk-heading-l'>You added {application.applicationName}</h2>
      <ContentBuilder sectionNav={false} data={content.content} />
      <a role='button' className='govuk-button' href={`/applications/${application.applicationId}/credentials`}>{content.buttons.view}</a>
    </ApplicationPage>
  )
}

ApplicationCreateSuccess.getInitialProps = async ({ res, query }) => {
  try {
    const application = await getApplication(query.slug)
    if (!application) return errorHandler(res)
    return {
      application
    }
  } catch (error) {
    return errorHandler(error, res, 500)
  }
}

ApplicationCreateSuccess.displayName = 'Application added success'

export default ApplicationCreateSuccess
