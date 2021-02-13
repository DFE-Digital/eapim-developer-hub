import React, { useRef, useState, useEffect } from 'react'
import ErrorPage from 'components/pages/ErrorPage'
import { getContent } from '../../../content/applicationManagement'
import ContentBuilder from 'components/ContentBuilder'
import APISubscriptions from 'components/APISubscriptions'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'

import errorHandler from '../../../lib/errorHandler'

import { getApis, getApiTags } from '../../../lib/apiServices'
import { getApplication } from '../../../lib/applicationService'
import { getSubscriptions } from '../../../lib/subscriptionService'

import { checkAuth } from 'checkAuth'

const content = getContent('api-subscriptions')

const ApplicationApiSubscriptions = ({ apis, application, subscriptions, router, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const [updateSubscriptions, setUpdateSubscriptions] = useState(subscriptions)
  const [refLoaded, setRefLoaded] = useState(null)
  const loadedRef = useRef(null)

  useEffect(() => {
    if (loadedRef.current !== refLoaded) {
      window.GOVUKFrontend.initAll()
      setRefLoaded(loadedRef.current)
    }
  }, [])

  const onSubscriptionChange = (subscriptions) => setUpdateSubscriptions(subscriptions)

  return (
    <ApplicationManagementPage title={content.title} application={application}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <ContentBuilder sectionNav={false} data={content.content} />

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Application:</dt>
          <dd className='govuk-summary-list__value'>{application.applicationName}</dd>
        </div>
      </dl>

      <APISubscriptions
        apis={apis}
        applicationId={application.applicationId}
        loadedRef={loadedRef}
        subscriptions={updateSubscriptions}
        onSubscriptionChange={onSubscriptionChange}
      />
    </ApplicationManagementPage>
  )
}

ApplicationApiSubscriptions.getInitialProps = async ({ req, res, query }) => {
  try {
    await checkAuth(req, res, query.slug)

    const application = await getApplication(query.slug, res)
    if (!application) return errorHandler(res)

    const apis = await getApis(res)
    if (!apis) return errorHandler(res)

    const subscriptions = await getSubscriptions(application.applicationId, res)

    await Promise.all(apis.map(async (api) => {
      api.tags = await getApiTags(api.name, res)
      return api
    }))

    return {
      apis,
      application,
      subscriptions
    }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default ApplicationApiSubscriptions
