import React, { useState, useEffect } from 'react'
import { getContent, sidebar } from '../../content/application'
import { Loading } from 'components/Loading'
import AuthWarning from 'components/AuthWarning'
import Page from 'components/Page'
import { useAuth } from '../../providers/AuthProvider'

import { getApplications } from '../../lib/applicationService'

const content = getContent('applications')

const Applications = ({ router }) => {
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

  return (
    <Page title={content.title} router={router} sidebarContent={sidebar()}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      {fetching && <Loading />}
      {!user.getToken() && <AuthWarning warning={content.authWarning} />}

      {applications.length === 0 && !fetching && user.getToken() && (
        <>
          <p className='govuk-body'>{content.empty}</p>
          <button type='button' className='govuk-button govuk-!-margin-top-6' onClick={() => router.push('/applications/create/step1')}>{content.buttons.start}</button>
        </>
      )}
      {applications.length > 0 && !fetching && user.getToken() && (
        <>
          <table className='govuk-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header'>{content.title}</th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>
              {applications.length && applications.map((app, i) => {
                return (
                  <tr className='govuk-table__row' key={i}>
                    <th scope='row' className={`govuk-table__header`}>
                      <a href={`/applications/${app.applicationId}/details`}>{app.applicationName}</a>
                    </th>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {applications.length < 5 && (
            <button type='button' className='govuk-button govuk-!-margin-top-6' onClick={() => router.push('/applications/create/step1')}>
              {content.buttons.addNew}
            </button>
          )}
        </>
      )}
    </Page>
  )
}

Applications.displayName = 'Applications listing'

export default Applications
