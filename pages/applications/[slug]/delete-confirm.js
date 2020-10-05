import React, { useState } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import AccessChecker from 'components/common/AccessChecker'
import Router from 'next/router'
import ReturnTo from 'components/common/ReturnTo'
import { deleteApplication } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

import { getApplication } from '../../../lib/applicationService'

const ApplicationDeleteConfirm = ({ user, application, router, msalConfig, deleteApplication }) => {
  const [deleting, setDeleting] = useState(false)

  console.log(application)

  const deleteConfirm = async () => {
    setDeleting(true)

    const { data } = user

    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['email'],
      userID: data.User.accountIdentifier,
      applicationId: application.applicationId
    }

    console.log(body)

    const deleteApp = await deleteApplication(body)
    console.log(deleteApp)

    if (deleteApp && !deleting) {
      setDeleting(false)
      console.log('Successfully Deleted!')
      Router.push('/applications/delete-success')
    }
  }

  return (
    <>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect={'/applications'} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <a href='#' className='govuk-back-link' onClick={() => Router.back()}>Back</a>
        <main className='govuk-main-wrapper ' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {application && (
                <>
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
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

ApplicationDeleteConfirm.getInitialProps = async ({ query }) => {
  try {
    const application = await getApplication(query.slug)

    return {
      id: query.slug,
      application
    }
  } catch (error) {
    console.log(`Error getting application: ${error}`)
    return {
      error,
      id: query.slug
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export { ApplicationDeleteConfirm }
export default connect(mapStateToProps, { deleteApplication })(ApplicationDeleteConfirm)
