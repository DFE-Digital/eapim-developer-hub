import React from 'react'
import { connect } from 'react-redux'
import Page from 'components/Page'
import { registerApplication, cancelApplication } from '../../../src/actions/application'

const ApplicationCreateSummary = ({ user, application, registerApplication, router }) => {
  const createApplication = async (user, details) => {
    const appData = {
      userName: `${user.idToken.given_name} ${user.idToken.family_name}`,
      userEmail: user.idToken['email'],
      userID: user.accountIdentifier,
      applicationName: details['app-name'],
      description: details['app-description'],
      redirectUri: details['app-redirect-url']
    }

    const registration = await registerApplication(appData)
    if (registration !== 'failed') router.push('/applications/[slug]/success', `/applications/${registration.applicationId}/success`)
  }

  const { data } = user
  const { details, registering } = application

  return (
    <Page router={router} back='to what is your applications redirect URL'>
      <h1 className='govuk-heading-xl'>Application summary</h1>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Name:</th>
            <td className='govuk-table__cell'>{details ? details['app-name'] : 'app-name'}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Description:</th>
            <td className='govuk-table__cell'>{details ? details['app-description'] : 'app-description'}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Redirect url:</th>
            <td className='govuk-table__cell'>{details ? details['app-redirect-url'] : 'app-redirect-url'}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Application owner:</th>
            <td className='govuk-table__cell'>{(data && data.User) ? data.User.idToken.given_name : null} {(data && data.User) ? data.User.idToken.family_name : null}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Contact email:</th>
            <td className='govuk-table__cell'>{(data && data.User) ? data.User.idToken['email'] : null}</td>
          </tr>
        </tbody>
      </table>

      <button type='submit' disabled={registering} className='govuk-button govuk-!-margin-right-1' onClick={() => createApplication(data.User, details)}>
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
    user: state.user,
    application: state.application
  }
}

ApplicationCreateSummary.displayName = 'Application added summary'

export default connect(mapStateToProps, { registerApplication, cancelApplication })(ApplicationCreateSummary)
