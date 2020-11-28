import React from 'react'
import APIPage from 'components/pages/APIPage'
import ErrorPage from 'components/ErrorPage'
import APISummary from 'components/APISummary'

import { getApis, getApiTags, getSummary } from '../../lib/apiServices'
import getInitialPropsErrorHandler from '../../lib/getInitialPropsErrorHandler'

const ApiDetails = ({ api, summary, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <APIPage title={api.name} router={router} hideTitle>
      <APISummary api={api} summary={summary} />
    </APIPage>
  )
}

ApiDetails.getInitialProps = async ({ res, query }) => {
  try {
    const apis = await getApis()
    if (!apis) return getInitialPropsErrorHandler(res, 404)

    const api = apis.find(api => api.name === query.slug)
    if (!api) return getInitialPropsErrorHandler(res, 404)

    api.tags = await getApiTags(api.name)

    const summary = await getSummary(api.tags.summary)
    if (!summary) return getInitialPropsErrorHandler(res, 404)

    return { api, summary }
  } catch (error) {
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

ApiDetails.displayName = 'API documentation'

export default ApiDetails
