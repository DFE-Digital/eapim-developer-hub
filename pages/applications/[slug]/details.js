import timezone from 'moment-timezone'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../../../content.json'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import { clearApplication } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ApplicationSideBar from 'components/common/ApplicationSideBar'

const page = 'Application details'
class ApplicationDetails extends Component {
  render () {
    const {
      selectedApplication,
      user: { data }
    } = this.props

    if (!selectedApplication) return <Loading />

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
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
                <a className='govuk-breadcrumbs__link' href={`/applications/${selectedApplication.applicationId}/details`}>{selectedApplication.applicationName}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item' aria-current='page'>{page}</li>
            </ol>
          </div>
          <section className='mainWrapper govuk-!-margin-top-7'>
            <aside className='sideBar'>
              <div className='sideBar_content'>
                <ApplicationSideBar nav={Content.ApplicationManagement} app={selectedApplication} currentPage={page} />
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
                          {(selectedApplication ? selectedApplication.applicationName : '')}
                        </dd>
                      </div>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Created on:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          {(selectedApplication ? timezone.tz(selectedApplication.createdOn, 'Europe/London').format('DD/MM/YYYY HH:mm:ss').toString() : '')}
                        </dd>
                      </div>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Environment:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          Sandbox
                        </dd>
                      </div>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Client id:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          {(selectedApplication ? selectedApplication.clientId : '')}
                        </dd>
                      </div>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Description:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          {(selectedApplication ? selectedApplication.description : '')}
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

                    <Link href='/applications/[slug]/api-subscriptions' as={`/applications/${selectedApplication.applicationId}/api-subscriptions`}>
                      <a className={'govuk-button govuk-button--default govuk-!-margin-top-6'}>Subscribe to APIs</a>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    selectedApplication: state.application.selectedApplication
  }
}

export { ApplicationDetails }
export default connect(mapStateToProps, { clearApplication })(ApplicationDetails)
