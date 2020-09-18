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

import { getApis, getApiTags, mapSubscriptionsToAPI } from '../../../lib/apiServices'
import { getApplication } from '../../../lib/applicationService'
import { getSubscriptions, getSubscriptionKeys, postSubscription, deleteSubscription } from '../../../lib/subscriptionService'

const page = 'API subscriptions'

const ApplicationApiSubscriptions = ({ apis, application, subscriptions, user, router, msalConfig }) => {
  const [subscriptionApis, setSubscriptionApis] = useState(apis)
  const [refLoaded, setRefLoaded] = useState(null)
  const loadedRef = useRef(null)

  const [subscribing, setSubscribing] = useState({})
  const [cancelling, setCancelling] = useState({})
  const [fetching, setFetching] = useState({})

  useEffect(() => {
    if (loadedRef.current !== refLoaded) {
      window.GOVUKFrontend.initAll()
      setRefLoaded(loadedRef.current)
    }
  })

  const onSubscribe = async (applicationId, apiName, environment) => {
    setSubscribing({ [apiName]: { ...subscribing[apiName], [environment]: true } })

    try {
      const newApis = await postSubscription(applicationId, apiName, environment)
      setSubscriptionApis(newApis)
      setSubscribing({ [apiName]: { ...subscribing[apiName], [environment]: false } })
    } catch (error) {
      console.log(`Error posting subscrition: ${error}`)
      setSubscribing({ [apiName]: { ...subscribing[apiName], [environment]: false } })
    }
  }

  const onCancel = async (subId, environment, apiName) => {
    setCancelling({ [apiName]: { ...cancelling[apiName], [environment]: true } })

    try {
      const newApis = await deleteSubscription(subId, environment, application.applicationId)
      setSubscriptionApis(newApis)
      setCancelling({ [apiName]: { ...cancelling[apiName], [environment]: false } })
    } catch (error) {
      console.log(`Error posting subscrition: ${error}`)
      setCancelling({ [apiName]: { ...cancelling[apiName], [environment]: false } })
    }
  }

  const onFetchKeys = async (apiName, environment, subId) => {
    setFetching({ [apiName]: { ...fetching[apiName], [environment]: true, subId } })

    try {
      const keys = await getSubscriptionKeys(subId, environment)
      const api = subscriptionApis.find(api => api.name === apiName)
      const sub = api.subscriptions.find(sub => sub.id === subId && sub.environment === environment)
      sub.keys = keys
      setSubscriptionApis(subscriptionApis)
      setFetching({ [apiName]: { ...fetching[apiName], [environment]: false, subId } })
    } catch (error) {
      console.log(`Error fetching keys: ${error}`)
    }
  }

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

                  <ContentBuilder sectionNav={false} data={Content.ApplicationManagement[page].Content} />

                  <APISubscriptions
                    apis={subscriptionApis}
                    applicationId={application.applicationId}
                    subscriptions={subscriptions}
                    onSubscribe={onSubscribe}
                    onCancel={onCancel}
                    onFetchKeys={onFetchKeys}
                    loadedRef={loadedRef}
                    subscribing={subscribing}
                    cancelling={cancelling}
                    fetching={fetching}
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

    mapSubscriptionsToAPI(apis, subscriptions)

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

export { ApplicationApiSubscriptions }
export default connect(mapStateToProps)(ApplicationApiSubscriptions)
