import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ErrorPage from 'components/ErrorPage'

import { getApplication } from '../../../lib/applicationService'
import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

const page = 'Delete application'

const DeleteApplication = ({ application, router, msalConfig, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

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

              <Link href='/applications/[slug]/delete-confirm' as={`/applications/${application.applicationId}/delete-confirm`} passHref>
                <a className={'govuk-button govuk-!-margin-top-6'} role='button'>Continue</a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

DeleteApplication.getInitialProps = async ({ res, query }) => {
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

DeleteApplication.displayName = 'Application Delete'

export default DeleteApplication
