import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as Msal from 'msal'
import Content from '../content.json'
import { signInToken } from '../src/actions/authenticate'
import { b2cPolicies } from '../src/auth/config'
import Page from 'components/Page'

const page = 'Profile'

const Profile = ({ user, router, msalEditProfileConfig }) => {
  useEffect(() => {
    const myMSALObj = new Msal.UserAgentApplication(msalEditProfileConfig)

    myMSALObj.handleRedirectCallback((error, response) => {
      // Error handling
      if (error) {
        console.log('error.errorMessage', error.errorMessage)

        // user cancelled action
        if (error.errorMessage.indexOf('AADB2C90091') > -1) {
          return router.push('/profile')
        }

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          return router.replace('/auth/forgot-password')
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
  }, [])

  const { data } = user

  if (data && !data.User) return null

  return (
    <Page title={page} router={router}>
      <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>

      {data && data.User && (
        <>
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
            </tbody>
          </table>
          <a href='/auth/edit-profile' className='govuk-button'>{Content[page].Content.AccountDetails.Button}</a>
        </>
      )}

      {/* <h2 className='govuk-heading-l govuk-!-margin-top-9'>{Content[page].Content.ChangePassword.Heading}</h2>
      <a href="/auth/change-password" className='govuk-button govuk-button--default'>{Content[page].Content.ChangePassword.Button}</a> */}

      <h2 className='govuk-heading-l govuk-!-margin-top-9'>{Content[page].Content.DeleteAccount.Heading}</h2>
      <p className='govuk-body'>{Content[page].Content.DeleteAccount.Copy}</p>
      <button className='govuk-button govuk-button--warning' onClick={() => router.push('/delete-account-confirm')}>{Content[page].Content.DeleteAccount.Button}</button>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Profile.displayName = page

export default connect(mapStateToProps, { signInToken })(Profile)
