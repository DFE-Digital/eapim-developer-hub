import timezone from 'moment-timezone'
import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../../../content.json'
import ReturnTo from 'components/common/ReturnTo'
import { clearApplication } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ApplicationSideBar from 'components/common/ApplicationSideBar'
import ErrorPage from 'components/ErrorPage'

import { getApplication } from '../../../lib/applicationService'
import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

const page = 'Application details'

const ApplicationDetails = ({ user, application, router, msalConfig, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const { data } = user

  return (
    <>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect={'/applications'} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <div className='govuk-breadcrumbs'>
          <ol className='govuk-breadcrumbs__list'>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href='/applications'>Applications</a>
            </li>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={`/applications/${application.applicationId}/details`}>{application.applicationName}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item' aria-current='page'>{page}</li>
          </ol>
        </div>
        <section className='mainWrapper govuk-!-margin-top-7'>
          <aside className='sideBar'>
            <div className='sideBar_content'>
              <ApplicationSideBar nav={Content.ApplicationManagement} app={application} currentPage={page} />
            </div>
          </aside>

          <main className='mainContent' id='main-content' role='main'>
            <div className='govuk-main-wrapper govuk-!-padding-top-0'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  <h1 className='govuk-heading-xl'>{page}</h1>

                  <dl className='govuk-summary-list'>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Application:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(application ? application.applicationName : '')}
                      </dd>
                    </div>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Created on:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(application ? timezone.tz(application.createdOn, 'MM/DD/YYYY HH:mma', 'Europe/London').add(1, 'hour').format('DD MMMM YYYY, HH:mma') : '')}
                      </dd>
                    </div>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Client id:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(application ? application.clientId : '')}
                      </dd>
                    </div>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Description:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(application ? application.description : '')}
                      </dd>
                    </div>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Application Owner:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(data && data.User) ? data.User.idToken.given_name : null} {(data && data.User) ? data.User.idToken.family_name : null}
                      </dd>
                    </div>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Contact email:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(data && data.User) ? data.User.idToken['email'] : null}
                      </dd>
                    </div>
                  </dl>

                  <Link href='/applications/[slug]/api-subscriptions' as={`/applications/${application.applicationId}/api-subscriptions`}>
                    <a className={'govuk-button govuk-button--default govuk-!-margin-top-6'}>Subscribe to APIs</a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  )
}

ApplicationDetails.getInitialProps = async ({ res, query }) => {
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationDetails.displayName = 'Application details (subscribe to APIs)'

export { ApplicationDetails }
export default connect(mapStateToProps, { clearApplication })(ApplicationDetails)
