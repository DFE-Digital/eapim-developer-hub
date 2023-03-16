import React from 'react'
import ContentBuilder from 'components/ContentBuilder'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import { getApplication } from '../../../lib/applicationService'

import { getContent } from '../../../content/applicationManagement'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

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

export default ApplicationCreateSuccess
