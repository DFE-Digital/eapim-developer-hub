import React from 'react'
import { connect } from 'react-redux'
import Page from 'components/Page'
import { registerApplication, cancelApplication } from '../../../src/actions/application'

import { useAuth } from 'context'

const ApplicationCreateSummary = ({ application, registerApplication, router }) => {
  const { user } = useAuth()

  const { details, registering } = application

  const createApplication = async () => {
    const appData = {
      userName: user.name(),
      userEmail: user.email(),
      userID: user.id(),
      applicationName: details['app-name'],
      description: details['app-description'],
      redirectUri: details['app-redirect-url']
    }

    const registration = await registerApplication(appData)
    if (registration !== 'failed') router.push('/applications/[slug]/success', `/applications/${registration.applicationId}/success`)
  }

  return (
    <Page router={router} back='to what is your applications redirect URL'>
      <h1 className='govuk-heading-xl'>Application summary</h1>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Name:</th>
            <td className='govuk-table__cell'>{details['app-name']}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Description:</th>
            <td className='govuk-table__cell'>{details['app-description']}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Redirect url:</th>
            <td className='govuk-table__cell'>{details['app-redirect-url']}</td>
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
          cancelApplication()
          router.push('/applications')
        }}
      >
        Cancel
      </button>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    application: state.application
  }
}

ApplicationCreateSummary.displayName = 'Application added summary'

export default connect(mapStateToProps, { registerApplication, cancelApplication })(ApplicationCreateSummary)
