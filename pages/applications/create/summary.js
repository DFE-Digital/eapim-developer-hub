import React, { useState } from 'react'
import Page from 'components/Page'

import { useAuth } from 'context'
import { useApplication } from '../../../providers/ApplicationProvider'

const ApplicationCreateSummary = ({ registerApplication, router }) => {
  const { user } = useAuth()
  const { application, clear } = useApplication()

  const [registering, setRegistering] = useState(false)

  const createApplication = async () => {
    setRegistering(true)

    const appData = {
      userName: user.name(),
      userEmail: user.email(),
      userID: user.id(),
      applicationName: application.name,
      description: application.description,
      redirectUri: application.redirectUrl
    }

    const registration = await registerApplication(appData)

    if (registration !== 'failed') {
      router.push('/applications/[slug]/success', `/applications/${registration.applicationId}/success`)
    }
  }

  return (
    <Page router={router} back='to what is your applications redirect URL'>
      <h1 className='govuk-heading-xl'>Application summary</h1>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Name:</th>
            <td className='govuk-table__cell'>{application.name}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Description:</th>
            <td className='govuk-table__cell'>{application.description}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Redirect url:</th>
            <td className='govuk-table__cell'>{application.redirectUrl}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Application owner:</th>
            <td className='govuk-table__cell'>{user.name()}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Contact email:</th>
            <td className='govuk-table__cell'>{user.email()}</td>
          </tr>
        </tbody>
      </table>

      <button type='submit' disabled={registering} className='govuk-button govuk-!-margin-right-1' onClick={() => createApplication()}>
        {!registering && 'Register application'}
        {registering && 'Registering...'}
      </button>
      <button
        type='button'
        className='govuk-button govuk-button--secondary'
        onClick={() => {
          clear()
          router.push('/applications')
        }}
      >
        Cancel
      </button>
    </Page>
  )
}

ApplicationCreateSummary.displayName = 'Application added summary'

export default ApplicationCreateSummary
