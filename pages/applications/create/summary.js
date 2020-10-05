import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { registerApplication, cancelApplication } from '../../../src/actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

class ApplicationCreateSummary extends Component {
  async createApplication (user, details) {
    const appData = {
      userName: `${user.idToken.given_name} ${user.idToken.family_name}`,
      userEmail: user.idToken['email'],
      userID: user.accountIdentifier,
      organization: user.idToken.extension_OrganizationName,
      role: 'role',
      applicationName: details['app-name'],
      description: details['app-description'],
      redirectUri: details['app-redirect-url']
    }

    const registration = await this.props.registerApplication(appData)
    if (registration !== 'failed') Router.push('/applications/[slug]/success', `/applications/${registration.applicationId}/success`)
  }

  render () {
    const {
      user: { data },
      application: { details, registering }
    } = this.props

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <div className='govuk-width-container'>
          <a href='#' className='govuk-back-link' onClick={() => Router.back()}>Back</a>
          <main className='govuk-main-wrapper ' id='main-content' role='main'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
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

                <button type='submit' disabled={registering} className='govuk-button govuk-!-margin-right-1' onClick={() => this.createApplication(data.User, details)}>
                  {!registering && 'Register application'}
                  {registering && 'Registering...'}
                </button>
                <button
                  type='button'
                  className='govuk-button govuk-button--secondary'
                  onClick={() => {
                    this.props.cancelApplication()
                    Router.push('/applications')
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </main>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    application: state.application
  }
}

export { ApplicationCreateSummary }
export default connect(mapStateToProps, { registerApplication, cancelApplication })(ApplicationCreateSummary)
