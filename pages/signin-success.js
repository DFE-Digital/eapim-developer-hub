import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Msal from 'msal'
import Router from 'next/router'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import { Loading } from 'components/common/Loading'
import { signIn, signInToken } from 'actions/authenticate'
import { b2cPolicies } from '../src/auth/config'

class SignInSuccess extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      user: undefined,
      passwordChanged: false
    }
  }

  async signIn (e) {
    e.preventDefault()
    await this.props.signIn(this.props.msalConfig)
  }

  componentWillReceiveProps = () => {
    const myMSALObj = new Msal.UserAgentApplication(this.props.msalConfig)

    myMSALObj.handleRedirectCallback((error, response) => {
      console.log(response)
      // Error handling
      if (error) {
        console.log(error)

        // user has no account
        if (error.errorMessage.indexOf('AADB2C99002') > -1) {
          return myMSALObj.loginRedirect({ authority: this.props.msalConfig.authority })
        }

        if (error.errorMessage.indexOf('AADB2C90091') > -1) {
          const { returnTo: { returnUrl } } = this.props
          return Router.push(returnUrl || '/')
        }

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          console.log('error.errorMessage', error.errorMessage)
          try {
            // Password reset policy/authority
            myMSALObj.loginRedirect({ authority: this.props.msalForgotPasswordConfig.auth.authority })
          } catch (err) {
            console.log(err)
          }
        }
      } else {
        // We need to reject id tokens that were not issued with the default sign-in policy.
        // 'acr' claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use 'tfp' instead of 'acr')
        // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview

        if (response.tokenType === 'id_token' && response.idToken.claims['acr'] === b2cPolicies.names.forgotPassword) {
          console.log(response.idToken.claims['acr'])
          this.setState({ passwordChanged: true })
        } else if (response.tokenType === 'id_token' && response.idToken.claims['acr'] === b2cPolicies.names.signUpSignIn) {
          console.log('id_token acquired at: ' + new Date().toString())

          if (!myMSALObj.getAccount()) {
            myMSALObj.loginRedirect({ authority: this.props.msalConfig.auth.authority })
          } else {
            const account = myMSALObj.getAccount()
            const userName = myMSALObj.getAccount().name
            if (this.state.name === '') {
              this.setState({
                name: userName,
                user: account
              })
              this.props.signInToken(account)
            }
          }
        } else {
          console.log('Token type is: ' + response.tokenType)
        }
      }
    })
  }

  render () {
    const {
      user: { data },
      returnTo: { returnUrl }
    } = this.props
    if (
      data &&
      data.isAuthed &&
      returnUrl &&
      (this.state.name === data.User.name)
    ) Router.push(returnUrl || '/')
    return (
      <Fragment>
        <Header msalConfig={this.props.msalConfig} isLoggedIn={false} />
        <PhaseBanner />
        {!this.state.passwordChanged && (<Loading />)}
        {this.state.passwordChanged && (
          <div className='govuk-width-container'>
            <main className='govuk-main-wrapper' id='main-content' role='main'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  <div className='notification notification-success' role='alert' aria-label='Password has been reset successfully. Please sign-in with your new password.' aria-live='polite'>
                    <h2 className='govuk-!-margin-bottom-4'>Password has been reset successfully.</h2>
                    <p className='govuk-body govuk-!-margin-bottom-0'>Please sign-in with your new password.</p>
                  </div>

                  <p className='govuk-body'><a href='#' onClick={e => this.signIn(e)} className='govuk-link'><strong>Sign in</strong></a> to the Developer Hub.</p>
                </div>
              </div>
            </main>
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    returnTo: state.returnTo
  }
}

export { SignInSuccess }
export default connect(mapStateToProps, { signIn, signInToken })(SignInSuccess)
