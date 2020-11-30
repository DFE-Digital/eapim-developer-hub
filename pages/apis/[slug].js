import React from 'react'
import APIPage from 'components/pages/APIPage'
import ErrorPage from 'components/pages/ErrorPage'
import APISummary from 'components/APISummary'

import { getApis, getApiTags, getSummary } from '../../lib/apiServices'
import errorHandler from '../../lib/errorHandler'

const ApiDetails = ({ api, summary, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  return (
    <APIPage title={api.name} hideTitle>
      <APISummary api={api} summary={summary} />
    </APIPage>
  )
}

ApiDetails.getInitialProps = async ({ res, query }) => {
  try {
    const apis = await getApis()
    if (!apis) return errorHandler(res)

    const api = apis.find(api => api.name === query.slug)
    if (!api) return errorHandler(res)

    api.tags = await getApiTags(api.name)

    const summary = await getSummary(api.tags.summary)
    if (!summary) return errorHandler(res)

    return { api, summary }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

ApiDetails.displayName = 'API documentation'

export default ApiDetails
