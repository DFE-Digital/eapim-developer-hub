import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'
import APIPage from 'components/pages/APIPage'

import { getApis } from '../../lib/apiServices'
import errorHandler from '../../lib/errorHandler'

const Apis = ({ apis, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const apiList = apis.map((api, i) => {
    return (
      <tr className='govuk-table__row' key={i}>
        <th scope='row' className='govuk-table__header'>
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
    <APIPage router={router}>
      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          {apiList}
        </tbody>
      </table>
    </APIPage>
  )
}

Apis.getInitialProps = async ({ res }) => {
  try {
    const apis = await getApis()
    if (!apis) return errorHandler(res)

    return { apis }
  } catch (error) {
    return errorHandler(error, res, 500)
  }
}

Apis.displayName = 'APIs listing'

export default Apis
