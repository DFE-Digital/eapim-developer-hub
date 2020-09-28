import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../../content.json'
import SideBar from 'components/common/SideBar'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import AuthWarning from 'components/common/AuthWarning'
import { selectApplication } from '../../src/actions/application'

import { getApplications } from '../../lib/applicationService'

const page = 'Applications'

const Applications = ({ user, selectApplication, router, msalConfig }) => {
  const [fetching, setFetching] = useState(false)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      setFetching(true)
      const apps = await getApplications(user.data.User)
      setApplications(apps)
      setFetching(false)
    }

    if (user.data && user.data.User) fetchApplications()
  }, [user])

  const selectApp = (e, app) => {
    e.preventDefault()
    selectApplication(app)
    Router.push('/applications/[slug]/details', `/applications/${app.applicationId}/details`)
  }

  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

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
              <a className='govuk-breadcrumbs__link' href='/applications'>Applications</a>
            </li>
            <li className='govuk-breadcrumbs__list-item' aria-current='page'>{Content.Applications[page].Page}</li>
          </ol>
        </div>
        <section className='mainWrapper govuk-!-margin-top-7'>
          <aside className='sideBar'>
            <div className='sideBar_content'>
              <SideBar nav={Content.Applications} loggedIn={isLoggedIn} />
            </div>
          </aside>

          <main className='mainContent' id='main-content' role='main'>
            <div className='govuk-main-wrapper govuk-!-padding-top-0'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  <h1 className='govuk-heading-xl'>{Content.Applications[page].Page}</h1>

                  {!isLoggedIn && <AuthWarning msalConfig={msalConfig} warning={Content.Applications[page].Content.Auth.Warning} />}
                  {fetching && <Loading />}

                  {applications.length === 0 && !fetching && isLoggedIn && (
                    <Fragment>
                      <p className='govuk-body'>{Content.Applications[page].Content.NoApplications.Copy}</p>
                      {isLoggedIn && (
                        <button type='button' className='govuk-button govuk-!-margin-top-6' onClick={() => Router.push('/applications/create/step1')}>{Content.Applications[page].Content.NoApplications.Button}</button>
                      )}
                    </Fragment>
                  )}
                  {applications.length > 0 && !fetching && isLoggedIn && (
                    <Fragment>
                      <table className='govuk-table'>
                        <thead className='govuk-table__head'>
                          <tr className='govuk-table__row'>
                            {Content.Applications[page].Content.tableHeadings.map((th, i) => {
                              return <th key={i} scope='col' className='govuk-table__header'>{th.Heading}</th>
                            })}
                          </tr>
                        </thead>
                        <tbody className='govuk-table__body'>
                          {applications.length && applications.map((app, i) => {
                            return (
                              <tr className='govuk-table__row' key={i}>
                                <th scope='row' className={`govuk-table__header`}>
                                  <a href='#' onClick={(e) => selectApp(e, app)}>{app.applicationName}</a>
                                </th>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      {applications.length < 5 && (
                        <button type='button' className='govuk-button govuk-!-margin-top-6' onClick={() => Router.push('/applications/create/step1')}>Add new application</button>
                      )}
                      <p className='govuk-body govuk-!-margin-top-9'>{Content.Applications[page].Content.Production.Copy}</p>
                      <button type='button' className='govuk-button govuk-!-margin-bottom-0'>{Content.Applications[page].Content.Production.Button}</button>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export { Applications }
export default connect(mapStateToProps, { selectApplication })(Applications)
