import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import AccessChecker from 'components/common/AccessChecker'
import SideBar from 'components/common/SideBar'
import ReturnTo from 'components/common/ReturnTo'

import ErrorPage from 'components/ErrorPage'
import DfEAPIInformation from 'components/DfEAPIInformation'
import SchoolAPIInformation from 'components/SchoolAPIInformation'
import AttendanceAPIInformation from 'components/AttendanceAPIInformation'

import { getApis, getApiTags } from '../../lib/apiServices'
import getInitialPropsErrorHandler from '../../lib/getInitialPropsErrorHandler'

const ApiDetails = ({ api, router, msalConfig, user }) => {
  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

  let informationComonent

  if (!api) return <ErrorPage statusCode={404} router={router} msalConfig={msalConfig} />

  switch (api.name) {
    case 'SchoolsInformationApi_V1':
    case 'schools-information-api':
      informationComonent = <SchoolAPIInformation msalConfig={msalConfig} selectedApi={api} isLoggedIn={isLoggedIn} />
      break
    case 'AttendanceApi_V1':
      informationComonent = <AttendanceAPIInformation msalConfig={msalConfig} selectedApi={api} isLoggedIn={isLoggedIn} />
      break
    default:
      informationComonent = <DfEAPIInformation selectedApi={api} isLoggedIn={isLoggedIn} />
  }

  console.log(api)

  return (
    <Fragment>
      <AccessChecker msalConfig={msalConfig} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <div className='govuk-breadcrumbs'>
          <ol className='govuk-breadcrumbs__list'>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Apis'].APIs.Url}>{Content['Apis'].APIs.Page}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item' aria-current='page'>{(api ? api.properties.displayName : '')}</li>
          </ol>
        </div>
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
                  {informationComonent}
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </Fragment>
  )
}

ApiDetails.getInitialProps = async ({ res, query }) => {
  try {
    const apis = await getApis()
    const api = apis.find(api => api.name === query.slug)
    api.tags = await getApiTags(api.name)

    if (!api) return getInitialPropsErrorHandler(res, 404)

    return { api }
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

ApiDetails.displayName = 'ApiDetails'

export { ApiDetails }
export default connect(mapStateToProps, null)(ApiDetails)
