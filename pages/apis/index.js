import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../../content.json'
import { storeApi } from 'actions/apis'
import SideBar from 'components/common/SideBar'
import ReturnTo from 'components/common/ReturnTo'
import ErrorPage from 'components/ErrorPage'
import Breadcrumbs from 'components/common/Breadcrumbs'

import { getApis } from '../../lib/apiServices'
import getInitialPropsErrorHandler from '../../lib/getInitialPropsErrorHandler'

const page = 'APIs'

const Apis = ({ storeApi, user, apis, router, msalConfig }) => {
  const selectApi = (e, api) => {
    e.preventDefault()
    storeApi(api)
    router.push('/apis/[slug]', `/apis/${api.name}`)
  }

  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

  if (!apis) return <ErrorPage statusCode={404} router={router} msalConfig={msalConfig} />

  const apiList = apis.map((api, i) => {
    return (
      <tr className='govuk-table__row' key={i}>
        <th scope='row' className={`govuk-table__header ${(api.requiresAuth && !isLoggedIn) ? ' lock' : ''}`}>
          <a href='#' onClick={(e) => selectApi(e, api)}>{api.properties.displayName}</a>
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
    <Fragment>
      <AccessChecker msalConfig={msalConfig} />
      <ReturnTo parentPath={router.asPath} />

      <div className='govuk-width-container'>
        <Breadcrumbs items={[{ text: page }]} />
        <section className='mainWrapper govuk-!-margin-top-7'>
          <aside className='sideBar'>
            <div className='sideBar_content'>
              <SideBar nav={Content.Apis} loggedIn={isLoggedIn} />
            </div>
          </aside>

          <main className='mainContent' id='main-content' role='main'>
            <div className='govuk-main-wrapper govuk-!-padding-top-0'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  <h1 className='govuk-heading-xl'>{Content.Apis[page].Page}</h1>
                  <table className='govuk-table'>
                    <tbody className='govuk-table__body'>
                      {apiList}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </Fragment>
  )
}

Apis.getInitialProps = async ({ res }) => {
  try {
    const apis = await getApis()

    if (!apis || apis.length === 0) return getInitialPropsErrorHandler(res, 404)

    return { apis }
  } catch (error) {
    console.log(`Error fetching apis: ${error}`)
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Apis.displayName = 'Apis'

export { Apis }
export default connect(mapStateToProps, { storeApi })(Apis)
