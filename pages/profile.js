import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Msal from 'msal'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../content.json'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import { editProfile, signInToken } from '../src/actions/authenticate'
import { b2cPolicies } from '../src/auth/config'
import { PrivateRoute } from 'components/common/PrivateRoute'

const page = 'Profile'

class Profile extends Component {
  componentWillReceiveProps = () => {
    const myMSALObj = new Msal.UserAgentApplication(this.props.msalConfig)
    myMSALObj.handleRedirectCallback((error, response) => {
      // Error handling
      if (error) {
        console.log(error)

        if (error.errorMessage.indexOf('AADB2C90091') > -1) {
          Router.push(this.props.router.route || '/')
        }

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          console.log('error.errorMessage', error.errorMessage)
          try {
            // Password reset policy/authority
            myMSALObj.loginRedirect(this.props.msalForgotPasswordConfig.auth.authority)
          } catch (err) {
            console.log(err)
          }
        }
      } else {
        if (response.tokenType === 'id_token' && response.idToken.claims['acr'] === b2cPolicies.names.editProfile) {
          console.log('id_token acquired at: ' + new Date().toString())
          myMSALObj.loginRedirect(this.props.msalConfig)
        } else {
          console.log('Token type is: ' + response.tokenType)
        }
      }
    })
  }

  render = () => {
    const {
      user: { data }
    } = this.props
    let isLoggedIn = false
    if (data && data.isAuthed) isLoggedIn = true
    if (data && !data.User) return null

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <Header msalConfig={this.props.msalConfig} isLoggedIn={isLoggedIn} router={this.props.router} />
        <PhaseBanner />
        <div className='govuk-width-container'>
          <div className='govuk-breadcrumbs'>
            <ol className='govuk-breadcrumbs__list'>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item' aria-current='page'>{Content[page].Page}</li>
            </ol>
          </div>
          <main className='govuk-main-wrapper' id='main-content' role='main'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
                {data && data.User && (
                  <Fragment>
                    <table className='govuk-table'>
                      <caption className='govuk-table__caption govuk-heading-m'>{Content[page].Content.AccountDetails.Heading}</caption>
                      <tbody className='govuk-table__body'>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Display name</th>
                          <td className='govuk-table__cell'>{data.User.name}</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Name</th>
                          <td className='govuk-table__cell'>{data.User.idToken.given_name} {data.User.idToken.family_name}</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Email address</th>
                          <td className='govuk-table__cell'>{data.User.idToken['signInNames.emailAddress']}</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Organisation</th>
                          <td className='govuk-table__cell'>{data.User.idToken.extension_OrganizationName}</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Role</th>
                          <td className='govuk-table__cell'>{data.User.idToken.extension_Role}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button type='button' onClick={() => this.props.editProfile(this.props.msalEditProfileConfig)} className='govuk-button'>{Content[page].Content.AccountDetails.Button}</button>
                  </Fragment>
                )}
                <h2 className='govuk-heading-l govuk-!-margin-top-9'>{Content[page].Content.DeleteAccount.Heading}</h2>
                <p className='govuk-body'>{Content[page].Content.DeleteAccount.Copy}</p>
                <button className='govuk-button govuk-button--warning' onClick={() => Router.push('/delete-account-confirm')}>{Content[page].Content.DeleteAccount.Button}</button>
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
    user: state.user
  }
}

export { Profile }
export default connect(mapStateToProps, { editProfile, signInToken })(Profile)
