import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import { getContent } from '../../../content/applicationManagement'
import ContentBuilder from 'components/ContentBuilder'
import ErrorPage from 'components/pages/ErrorPage'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import { useAuth } from '../../../providers/AuthProvider'
import { getApplication } from '../../../lib/applicationService'
import errorHandler from '../../../lib/errorHandler'
import errorHandlerClient from '../../../lib/errorHandlerClient'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

const content = getContent('delete-application').pageConfirm

const ApplicationDeleteConfirm = ({ application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const router = useRouter()
  const { user } = useAuth()

  const [deleting, setDeleting] = useState(false)

  const deleteConfirm = async () => {
    setDeleting(true)

    const body = {
      userName: user.name(),
      userEmail: user.email(),
      userID: user.getToken().accountIdentifier,
      applicationId: application.applicationId
    }

    const deleteAppUrl = `/api/applications/${application.applicationId}`
    const response = await fetch(deleteAppUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    errorHandlerClient(response)

    const deleteApp = await response.json()

    if (deleteApp && !deleting) {
      setDeleting(false)
      router.push('/applications/delete-success')
    }
  }

  return (
    <ApplicationManagementPage title={content.title} application={application} layout='two-thirds' hideSidebar backLink>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Application:</dt>
          <dd className='govuk-summary-list__value'>{application.applicationName}</dd>
        </div>
      </dl>

      <ContentBuilder sectionNav={false} data={content.content} />

      <button
        type='submit'
        disabled={deleting}
        className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'
        onClick={deleteConfirm}
        aria-live='polite'
      >
        {!deleting ? content.buttons.delete : content.buttons.deleting}
      </button>
      <a href={`/applications/${application.applicationId}/details`} className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>
        {content.buttons.cancel}
      </a>
    </ApplicationManagementPage>
  )
}

ApplicationDeleteConfirm.getInitialProps = async ({ req, res, query }) => {
  try {
    const session = await checkBasicAuth(req, res)
    await checkUserOwnsApp(session, query.slug)

    const application = await getApplication(query.slug)
    if (!application) return errorHandler(res)

    return {
      id: query.slug,
      application
    }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default ApplicationDeleteConfirm
