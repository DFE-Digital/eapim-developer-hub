import React, { useState } from 'react'
import Page from 'components/Page'
import { useAuth } from '../../../providers/AuthProvider'
import { useApplication } from '../../../providers/ApplicationProvider'
import { registerApplication } from '../../../lib/applicationService'

import { isEmpty } from '../../../src/utils/validation'

import { getContent } from '../../../content/application'
const content = getContent('create-summary')

const ApplicationCreateSummary = ({ router }) => {
  const { user } = useAuth()
  const { application, clear } = useApplication()

  const [registering, setRegistering] = useState(false)

  const isValid = () => {
    const { name, description, redirectUrl } = application
    return !isEmpty(name) && !isEmpty(description) && !isEmpty(redirectUrl)
  }

  const createApplication = async () => {
    setRegistering(true)

    const data = {
      userName: user.name(),
      userEmail: user.email(),
      userID: user.id(),
      applicationName: application.name,
      description: application.description,
      redirectUri: application.redirectUrl
    }

    try {
      const registration = await registerApplication(data)
      window.localStorage.setItem('credentials', JSON.stringify({ primarySecret: registration.PrimarySecret, secondarySecret: registration.SecondarySecret }))
      clear()
      setRegistering(false)
      window.location.href = `/applications/${registration.applicationId}/success`
    } catch (err) {
      setRegistering(false)
    }
  }

  return (
    <Page title={content.title} router={router}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.headings.name}:</th>
            <td className='govuk-table__cell'>{application.name}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.headings.description}:</th>
            <td className='govuk-table__cell'>{application.description}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.headings.redirectUrl}:</th>
            <td className='govuk-table__cell'>{application.redirectUrl}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.headings.owner}:</th>
            <td className='govuk-table__cell'>{user.name()}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.headings.email}:</th>
            <td className='govuk-table__cell'>{user.email()}</td>
          </tr>
        </tbody>
      </table>

      <button type='submit' disabled={registering || !isValid()} className='govuk-button govuk-!-margin-right-1' onClick={() => createApplication()}>
        {!registering && content.buttons.register}
        {registering && content.buttons.registering}
      </button>
      <button
        type='button'
        className='govuk-button govuk-button--secondary'
        onClick={() => { router.push('/applications'); clear() }}>
        {content.buttons.cancel}
      </button>
    </Page>
  )
}

ApplicationCreateSummary.displayName = 'Application added summary'

export default ApplicationCreateSummary
