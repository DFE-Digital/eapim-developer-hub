import React from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import ErrorPage from 'components/ErrorPage'
import Page from 'components/Page'

import { getApis } from '../../lib/apiServices'
import getInitialPropsErrorHandler from '../../lib/getInitialPropsErrorHandler'

const page = 'APIs'

const Apis = ({ user, apis, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

  const apiList = apis.map((api, i) => {
    return (
      <tr className='govuk-table__row' key={i}>
        <th scope='row' className={`govuk-table__header ${(api.requiresAuth && !isLoggedIn) ? ' lock' : ''}`}>
          <a href={`/apis/${api.name}`}>{api.properties.displayName}</a>
        </th>
        <td className='govuk-table__cell govuk-table__cell--numeric'>
          <strong className={'govuk-tag govuk-tag-round' + (api.flag ? ` ${api.flag}` : '')}>
            REST API
          </strong>
        </td>
      </tr>
    )
  })

  return (
    <Page title={page} router={router} sidebarContent={Content.Apis}>
      <h1 className='govuk-heading-xl'>{Content.Apis[page].Page}</h1>
      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          {apiList}
        </tbody>
      </table>
    </Page>
  )
}

Apis.getInitialProps = async ({ res }) => {
  try {
    const apis = await getApis()
    if (!apis) return getInitialPropsErrorHandler(res, 404)

    return { apis }
  } catch (error) {
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Apis.displayName = 'APIs listing'

export default connect(mapStateToProps)(Apis)
