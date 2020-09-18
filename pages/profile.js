import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Msal from 'msal'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../content.json'
import ReturnTo from 'components/common/ReturnTo'
import { signInToken } from '../src/actions/authenticate'
import { b2cPolicies } from '../src/auth/config'
import { PrivateRoute } from 'components/common/PrivateRoute'

const page = 'Profile'

class Profile extends Component {
  componentWillReceiveProps = () => {
    const myMSALObj = new Msal.UserAgentApplication(this.props.msalEditProfileConfig)

    myMSALObj.handleRedirectCallback((error, response) => {
      // Error handling
      if (error) {
        console.log('props', this.props.msalEditProfileConfig)
        console.log('error.errorMessage', error.errorMessage)

        if (error.errorMessage.indexOf('AADB2C90091') > -1) {
          Router.push(this.props.router.route || '/')
        }

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          return Router.replace('/auth/forgot-password')
        }
      } else {
        if (response.tokenType === 'id_token' && response.idToken.claims['acr'] === b2cPolicies.names.editProfile) {
          console.log('id_token acquired at: ' + new Date().toString())
          const account = myMSALObj.getAccount()
          console.log(account)

          this.props.signInToken(account)
          // myMSALObj.loginRedirect(this.props.msalConfig)
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

    if (data && !data.User) return null

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/'} />
        <ReturnTo parentPath={this.props.router.asPath} />
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
                          <th scope='row' className='govuk-table__header'>Name</th>
                          <td className='govuk-table__cell'>{data.User.idToken.given_name} {data.User.idToken.family_name}</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Email address</th>
                          <td className='govuk-table__cell'>{data.User.idToken['email']}</td>
                        </tr>
                        <tr className='govuk-table__row'>
                          <th scope='row' className='govuk-table__header'>Organisation</th>
                          <td className='govuk-table__cell'>{data.User.idToken.extension_OrganizationName}</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href='/auth/edit-profile' className='govuk-button'>{Content[page].Content.AccountDetails.Button}</a>
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
export default connect(mapStateToProps, { signInToken })(Profile)
