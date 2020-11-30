import React, { useEffect } from 'react'
import * as Msal from 'msal'
import { b2cPolicies, config } from '../lib/authService'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { useAuth } from '../providers/AuthProvider'
import { getContent } from '../content/profile'

const content = getContent('profile')

const goTo = (url) => {
  window.location.href = url
}

const isEditProfile = (acr) => acr === b2cPolicies.editProfile

const errorHandling = (error) => {
  console.log(`MSAL Error Message: ${error.errorMessage}`)

  // user cancelled action
  if (error.errorMessage.indexOf('AADB2C90091') > -1) goTo('/profile')
}

const Profile = ({ router }) => {
  const { user, setToken } = useAuth()

  useEffect(() => {
    const myMSALObj = new Msal.UserAgentApplication(config.editProfile)

    myMSALObj.handleRedirectCallback((error, response) => {
      if (error) errorHandling(error)

      const acr = response.idToken.claims['acr']
      const isIdToken = response.tokenType === 'id_token'

      if (isIdToken && isEditProfile(acr)) {
        console.log(`id_token acquired at: ${new Date().toString()}`)

        if (!myMSALObj.getAccount()) return myMSALObj.loginRedirect()

        const account = myMSALObj.getAccount()
        setToken(account)
        goTo('/profile')
      } else {
        console.log(`Token type is: ${response.tokenType}`)
        goTo('/profile')
      }
    })
  }, [])

  return (
    <Page title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <table className='govuk-table'>
        <caption className='govuk-table__caption govuk-heading-m'>{content.tableCaption}</caption>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.name}</th>
            <td className='govuk-table__cell'>{user.name()}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.email}</th>
            <td className='govuk-table__cell'>{user.email()}</td>
          </tr>
        </tbody>
      </table>
      <a href='/auth/edit-profile' className='govuk-button govuk-!-margin-bottom-9'>
        {content.buttons.edit}
      </a>

      {/* <h2 className='govuk-heading-l govuk-!-margin-top-9'>{Content[page].Content.ChangePassword.Heading}</h2>
      <a href="/auth/change-password" className='govuk-button govuk-button--default'>{Content[page].Content.ChangePassword.Button}</a> */}

      <ContentBuilder sectionNav={false} data={content.deleteAccount} />
      <a role='button' href='/delete-account-confirm' className='govuk-button govuk-button--warning'>
        {content.buttons.delete}
      </a>
    </Page>
  )
}

Profile.displayName = 'Profile'

export default Profile
