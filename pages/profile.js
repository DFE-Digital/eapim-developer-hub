import React, { useEffect } from 'react'
import * as Msal from '@azure/msal-browser'
import { b2cPolicies, config, signOut } from '../lib/authService'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { useAuth } from '../providers/AuthProvider'
import { getContent } from '../content/profile'
import { useInsights } from 'hooks'

const content = getContent('profile')

const goTo = (url) => {
  window.location.href = url
}

const [trackException] = useInsights()

const isEditProfile = (acr) => acr === b2cPolicies.editProfile

const errorHandling = async (error) => {
  console.log(`MSAL Error Message: ${error}`)
  trackException(error)
  // user cancelled action
  if (!error.errorMessage) return goTo('/')

  if (error.errorMessage.indexOf('AADB2C90091') > -1) goTo('/profile')

  await signOut()
  return goTo('/')
}

const Profile = () => {
  const { user, setUser } = useAuth()

  useEffect(async () => {
    const myMSALObj = new Msal.PublicClientApplication(config.editProfile)

    myMSALObj.handleRedirectPromise().then((tokenResponse) => {
      if (tokenResponse !== null) {
        console.log(tokenResponse)
        const acr = tokenResponse.idTokenClaims.acr
        const accountObj = tokenResponse.account

        if (isEditProfile(acr)) {
          console.log('edited profile refreshing')
          setUser(accountObj)
          goTo('/profile')
        } else {
          console.log(`Token type is: ${tokenResponse.tokenType}`)
          goTo('/profile')
        }
      }
    }).catch(async (error) => {
      errorHandling(error)
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

export default Profile
