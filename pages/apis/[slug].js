import React from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import SideBar from 'components/common/SideBar'
import Page from 'components/Page'

import ErrorPage from 'components/ErrorPage'
import APISummary from 'components/APISummary'

import { getApis, getApiTags, getSummary } from '../../lib/apiServices'
import getInitialPropsErrorHandler from '../../lib/getInitialPropsErrorHandler'

const parent = 'APIs'

const ApiDetails = ({ api, summary, router, user, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <Page
      page={parent}
      router={router}
      sidebarComponent={<SideBar title={parent} nav={Content.Apis} />}
    >
      <APISummary api={api} summary={summary} />
    </Page>
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApiDetails.displayName = 'API documentation'

export { ApiDetails }
export default connect(mapStateToProps, null)(ApiDetails)
