import React, { useEffect } from 'react'
import * as Msal from 'msal'
import Content from '../content.json'
import { b2cPolicies, config } from '../lib/authService'
import Page from 'components/Page'
import { useAuth } from 'context'

const page = 'Profile'

const Profile = ({ router }) => {
  const { user, setToken } = useAuth()

  useEffect(() => {
    const myMSALObj = new Msal.UserAgentApplication(config.editProfile)

    myMSALObj.handleRedirectCallback((error, response) => {
      // Error handling
      if (error) {
        console.log('error.errorMessage', error.errorMessage)

        // user cancelled action
        if (error.errorMessage.indexOf('AADB2C90091') > -1) {
          return router.replace('/profile')
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
          setToken(account)
        } else {
          console.log('Token type is: ' + response.tokenType)
        }
      }
    })
  }, [])

  return (
    <Page title={page} router={router}>
      <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
      <table className='govuk-table'>
        <caption className='govuk-table__caption govuk-heading-m'>{Content[page].Content.AccountDetails.Heading}</caption>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Name</th>
            <td className='govuk-table__cell'>{user.name()}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Email address</th>
            <td className='govuk-table__cell'>{user.email()}</td>
          </tr>
        </tbody>
      </table>
      <a href='/auth/edit-profile' className='govuk-button'>{Content[page].Content.AccountDetails.Button}</a>

      {/* <h2 className='govuk-heading-l govuk-!-margin-top-9'>{Content[page].Content.ChangePassword.Heading}</h2>
      <a href="/auth/change-password" className='govuk-button govuk-button--default'>{Content[page].Content.ChangePassword.Button}</a> */}

      <h2 className='govuk-heading-l govuk-!-margin-top-9'>{Content[page].Content.DeleteAccount.Heading}</h2>
      <p className='govuk-body'>{Content[page].Content.DeleteAccount.Copy}</p>
      <button className='govuk-button govuk-button--warning' onClick={() => router.push('/delete-account-confirm')}>{Content[page].Content.DeleteAccount.Button}</button>
    </Page>
  )
}

Profile.displayName = page

export default Profile
