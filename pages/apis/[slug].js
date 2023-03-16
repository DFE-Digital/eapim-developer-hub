import React from 'react'
import APIPage from 'components/pages/APIPage'
import ErrorPage from 'components/pages/ErrorPage'
import APISummary from 'components/APISummary'

import { getApis, getApiTags, getSummary } from '../../lib/apiServices'

const ApiDetails = ({ api, summary, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  return (
    <APIPage title={api.name} hideTitle>
      <APISummary api={api} summary={summary} />
    </APIPage>
  )
}

export async function getServerSideProps (context) {
  const apis = await getApis()
  if (!apis) throw new Error('Forbidden')

  const api = apis.find(api => api.name === context.query.slug)
  if (!api) throw new Error('Forbidden')

  api.tags = await getApiTags(api.name)

  const summary = await getSummary(api.tags.summary)
  if (!summary) throw new Error('Forbidden')

  return {
    props: {
      api,
      summary
    }
  }
}

export default ApiDetails
