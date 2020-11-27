import React, { useRef, useState, useEffect } from 'react'
import ErrorPage from 'components/ErrorPage'
import Content from '../../../content.json'
import ContentBuilder from 'components/ContentBuilder'
import APISubscriptions from 'components/APISubscriptions'
import Page from 'components/Page'

import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

import { getApis, getApiTags } from '../../../lib/apiServices'
import { getApplication } from '../../../lib/applicationService'
import { getSubscriptions } from '../../../lib/subscriptionService'

const page = 'API subscriptions'

const ApplicationApiSubscriptions = ({ apis, application, subscriptions, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const [updateSubscriptions, setUpdateSubscriptions] = useState(subscriptions)
  const [refLoaded, setRefLoaded] = useState(null)
  const loadedRef = useRef(null)

  useEffect(() => {
    if (loadedRef.current !== refLoaded) {
      window.GOVUKFrontend.initAll()
      setRefLoaded(loadedRef.current)
    }
  })

  const onSubscriptionChange = (subscriptions) => setUpdateSubscriptions(subscriptions)

  return (
    <Page title={page} router={router} sidebarContent={Content.ApplicationManagement} sidebarData={{ type: 'application', application }}>
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
    </Page>
  )
}

ApplicationApiSubscriptions.getInitialProps = async ({ res, query }) => {
  try {
    const application = await getApplication(query.slug)
    if (!application) return getInitialPropsErrorHandler(res, 404)

    const apis = await getApis()
    if (!apis) return getInitialPropsErrorHandler(res, 404)

    const subscriptions = await getSubscriptions(application.applicationId)

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
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

ApplicationApiSubscriptions.displayName = 'Application Api Subscriptions'

export default ApplicationApiSubscriptions
