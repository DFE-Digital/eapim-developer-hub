import React, { useState } from 'react'
import { getContent } from '../../../content/applicationManagement'
import ContentBuilder from 'components/ContentBuilder'
import ErrorPage from 'components/ErrorPage'
import ApplicationPage from 'components/pages/ApplicationPage'
import { useAuth } from 'context'
import { getApplication, deleteApplication } from '../../../lib/applicationService'
import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

const content = getContent('delete-application').pageConfirm

const ApplicationDeleteConfirm = ({ application, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

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

    const deleteApp = await deleteApplication(body)

    if (deleteApp && !deleting) {
      setDeleting(false)
      router.push('/applications/delete-success')
    }
  }

  return (
    <ApplicationPage title={content.title} router={router} layout='two-thirds' back='to application details page'>
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
      >
        {!deleting ? content.buttons.delete : content.buttons.deleting}
      </button>
      <a href={`/applications/${application.applicationId}/details`} className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>
        {content.buttons.cancel}
      </a>
    </ApplicationPage>
  )
}

ApplicationDeleteConfirm.getInitialProps = async ({ res, query }) => {
  try {
    const application = await getApplication(query.slug)
    if (!application) return getInitialPropsErrorHandler(res, 404)

    return {
      id: query.slug,
      application
    }
  } catch (error) {
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

ApplicationDeleteConfirm.displayName = 'Application Delete Confirm'

export default ApplicationDeleteConfirm
