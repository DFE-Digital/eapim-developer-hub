import React, { useRef, useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../../content.json'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import ContentBuilder from 'components/common/ContentBuilder'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ApplicationSideBar from 'components/common/ApplicationSideBar'
import APISubscriptions from 'components/common/APISubscriptions'

import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

import { getApis, getApiTags } from '../../../lib/apiServices'
import { getApplication } from '../../../lib/applicationService'
import { getSubscriptions } from '../../../lib/subscriptionService'

const page = 'API subscriptions'

const ApplicationApiSubscriptions = ({ apis, application, subscriptions, router, msalConfig }) => {
  const [updateSubscriptions, setUpdateSubscriptions] = useState(subscriptions)
  const [refLoaded, setRefLoaded] = useState(null)
  const loadedRef = useRef(null)

  console.log(subscriptions)

  useEffect(() => {
    if (loadedRef.current !== refLoaded) {
      window.GOVUKFrontend.initAll()
      setRefLoaded(loadedRef.current)
    }
  })

  const onSubscriptionChange = (subscriptions) => setUpdateSubscriptions(subscriptions)

  if (!apis || apis.length === 0) return <Loading />
  if (!application) return <Loading />

  return (
    <Fragment>
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

                  <ContentBuilder sectionNav={false} data={Content.ApplicationManagement[page].Content} />

                  <dl className='govuk-summary-list'>
                    <div className='govuk-summary-list__row'>
                      <dt className='govuk-summary-list__key'>
                        Application:
                      </dt>
                      <dd className='govuk-summary-list__value'>
                        {(application ? application.applicationName : '')}
                      </dd>
                    </div>
                  </dl>

                  <APISubscriptions
                    apis={apis}
                    applicationId={application.applicationId}
                    loadedRef={loadedRef}
                    subscriptions={updateSubscriptions}
                    onSubscriptionChange={onSubscriptionChange}
                  />
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </Fragment>
  )
}

ApplicationApiSubscriptions.getInitialProps = async ({ req, res, query }) => {
  try {
    const application = await getApplication(query.slug)
    const apis = await getApis()
    const subscriptions = await getSubscriptions(application.applicationId)

    if (!application) return getInitialPropsErrorHandler(res, 404)

    await Promise.all(apis.map(async (api) => {
      api.tags = await getApiTags(api.name)
      return api
    }))

    return {
      apis,
      application,
      subscriptions
    }
  } catch (error) {
    console.log(`Error fetching application: ${error}`)
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationApiSubscriptions.displayName = 'Application Api Subscriptions'

export default connect(mapStateToProps)(ApplicationApiSubscriptions)
