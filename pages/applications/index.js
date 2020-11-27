import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import { Loading } from 'components/Loading'
import AuthWarning from 'components/AuthWarning'
import Page from 'components/Page'
import { useAuth } from 'context'

import { selectApplication } from '../../src/actions/application'
import { getApplications } from '../../lib/applicationService'

const page = 'Applications'

const Applications = ({ selectApplication, router, msalRegisterConfig }) => {
  const { user } = useAuth()

  const [fetching, setFetching] = useState(false)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchApplications = async () => {
      setFetching(true)
      const apps = await getApplications(user.getToken())
      setApplications(apps)
      setFetching(false)
    }

    if (user.getToken()) fetchApplications()
  }, [user])

  const selectApp = (e, app) => {
    e.preventDefault()
    selectApplication(app)
    router.push('/applications/[slug]/details', `/applications/${app.applicationId}/details`)
  }

  return (
    <Page title={page} router={router} sidebarContent={Content.Applications}>
      <h1 className='govuk-heading-xl'>{Content.Applications[page].Page}</h1>

      {!user.getToken() && <AuthWarning warning={Content.Applications[page].Content.Auth.Warning} />}
      {fetching && <Loading />}

      {applications.length === 0 && !fetching && user.getToken() && (
        <>
          <p className='govuk-body'>{Content.Applications[page].Content.NoApplications.Copy}</p>
          <button type='button' className='govuk-button govuk-!-margin-top-6' onClick={() => router.push('/applications/create/step1')}>{Content.Applications[page].Content.NoApplications.Button}</button>
        </>
      )}
      {applications.length > 0 && !fetching && user.getToken() && (
        <>
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
            <button type='button' className='govuk-button govuk-!-margin-top-6' onClick={() => router.push('/applications/create/step1')}>Add new application</button>
          )}
        </>
      )}
    </Page>
  )
}

Applications.displayName = 'Applications listing'

export default connect(null, { selectApplication })(Applications)
