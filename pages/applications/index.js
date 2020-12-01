import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getContent } from '../../content/application'
import { Loading } from 'components/Loading'
import AuthWarning from 'components/AuthWarning'
import ApplicationPage from 'components/pages/ApplicationPage'
import { useAuth } from '../../providers/AuthProvider'
import { useApplication } from '../../providers/ApplicationProvider'

import { getApplications } from '../../lib/applicationService'

const content = getContent('applications')

const Applications = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { clear } = useApplication()

  const [fetching, setFetching] = useState(false)
  const [applications, setApplications] = useState([])

  const onStart = (e) => {
    e.preventDefault(e)
    clear()
    router.replace('/applications/create/step1')
  }

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
    <ApplicationPage title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      {fetching && <Loading />}
      {!user.getToken() && <AuthWarning warning={content.authWarning} />}

      {applications.length === 0 && !fetching && user.getToken() && (
        <>
          <p className='govuk-body'>{content.empty}</p>
          <a role='button' className='govuk-button govuk-!-margin-top-6' onClick={onStart} href='/applications/create/step1'>{content.buttons.start}</a>
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
            <a role='button' className='govuk-button govuk-!-margin-top-6' onClick={onStart} href='/applications/create/step1'>
              {content.buttons.addNew}
            </a>
          )}
        </>
      )}
    </ApplicationPage>
  )
}

export default Applications
