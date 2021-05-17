import React from 'react'
import { useRouter } from 'next/router'
import { getContent } from '../../content/application'
import AuthWarning from 'components/AuthWarning'
import ApplicationPage from 'components/pages/ApplicationPage'
import { useAuth } from '../../providers/AuthProvider'
import { useApplication } from '../../providers/ApplicationProvider'

import errorHandler from '../../lib/errorHandler'
import { getApplications } from '../../lib/applicationService'

import { decodeToken } from 'checkAuth'

const content = getContent('applications')
const APPLICATIONS_LIMIT = 10

const Applications = ({ applications = [] }) => {
  const router = useRouter()
  const { user } = useAuth()
  const { clear } = useApplication()

  const onStart = (e) => {
    e.preventDefault(e)
    clear()
    router.replace('/applications/create/step1')
  }

  return (
    <ApplicationPage title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      {!user.getToken() && <AuthWarning warning={content.messages.authWarning} />}

      {user.getToken() && (
        <div className='govuk-inset-text'>
          {content.messages.maximum}
        </div>
      )}

      {applications.length === 0 && user.getToken() && (
        <>
          <p className='govuk-body'>{content.messages.empty}</p>
          <a role='button' className='govuk-button govuk-!-margin-top-6' onClick={onStart} href='/applications/create/step1'>{content.buttons.start}</a>
        </>
      )}
      {applications.length > 0 && user.getToken() && (
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
                      <a className='govuk-link' href={`/applications/${app.applicationId}/details`}>{app.applicationName}</a>
                    </th>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {applications.length < APPLICATIONS_LIMIT && (
            <a role='button' className='govuk-button govuk-!-margin-top-6' onClick={onStart} href='/applications/create/step1'>
              {content.buttons.addNew}
            </a>
          )}
        </>
      )}
    </ApplicationPage>
  )
}

Applications.getInitialProps = async ({ req, res }) => {
  try {
    const token = decodeToken(req, res)

    const applications = await getApplications({ accountIdentifier: token.sub }, res)
    if (!applications) return errorHandler(res)

    return {
      applications 
    }

  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default Applications
