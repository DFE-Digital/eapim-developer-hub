import React, { useState } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import { deleteApplication } from 'actions/application'
import ErrorPage from 'components/ErrorPage'
import Page from 'components/Page'
import { useAuth } from 'context'
import { getApplication } from '../../../lib/applicationService'
import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

const ApplicationDeleteConfirm = ({ application, router, errorCode, deleteApplication }) => {
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
      Router.push('/applications/delete-success')
    }
  }

  return (
    <Page router={router} layout='two-thirds' back='to application details page'>
      <h1 className='govuk-heading-xl'>Are you sure you want us to delete your application?</h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Application:</dt>
          <dd className='govuk-summary-list__value'>{(application ? application.applicationName : '')}</dd>
        </div>
      </dl>

      <p className='govuk-body'>This will be deleted immediately. We cannot restore applications once they have been deleted.</p>

      <button
        type='submit'
        disabled={deleting}
        className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'
        onClick={() => deleteConfirm()}
      >
        {!deleting ? 'Delete application' : 'Deleting...'}
      </button>
      <Link href='/applications/[slug]/details' as={`/applications/${application.applicationId}/details`}>
        <a className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>Cancel</a>
      </Link>
    </Page>
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

export default connect(null, { deleteApplication })(ApplicationDeleteConfirm)
