import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import { PrivateRoute } from 'components/common/PrivateRoute'

import { getApplication } from '../../../lib/applicationService'

const page = 'Delete application'

const DeleteApplication = ({ application, router, msalConfig }) => {
  if (!application) return <Loading />

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
              <h1 className='govuk-heading-xl'>{page}</h1>

              <dl className='govuk-summary-list'>
                <div className='govuk-summary-list__row'>
                  <dt className='govuk-summary-list__key'>Application:</dt>
                  <dd className='govuk-summary-list__value'>{(application ? application.applicationName : '')}</dd>
                </div>
              </dl>

              <p className='govuk-body'>Before deleting this application, check with all your <Link href='/applications/[slug]/team-members' as={`/applications/${application.applicationId}/team-members`}><a className={'govuk-link'}>team members</a></Link>.</p>

              <Link href='/applications/[slug]/delete-confirm' as={`/applications/${application.applicationId}/delete-confirm`}>
                <a className={'govuk-button govuk-!-margin-top-6'}>Continue</a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

DeleteApplication.getInitialProps = async ({ query }) => {
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

export default DeleteApplication
