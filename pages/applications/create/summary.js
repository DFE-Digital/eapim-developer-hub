import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ApplicationPage from 'components/pages/ApplicationPage'
import { useAuth } from '../../../providers/AuthProvider'
import { useApplication } from '../../../providers/ApplicationProvider'
import { registerApplication } from '../../../lib/applicationService'
import { isEmpty } from '../../../src/utils/validation'

import { getContent } from '../../../content/application'
const content = getContent('create-summary')

const ApplicationCreateSummary = () => {
  const { user } = useAuth()
  const { application, clear } = useApplication()
  const router = useRouter()

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
    <ApplicationPage title={content.title} breadcrumbs={[{ text: 'to application redirect url ', href: '/applications/create/step3', back: true }]} hideSidebar>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.headings.name}</dt>
          <dd className='govuk-summary-list__value'>{application.name}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.headings.description}</dt>
          <dd className='govuk-summary-list__value'>{application.description}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.headings.redirectUrl}</dt>
          <dd className='govuk-summary-list__value'>{application.redirectUrl}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.headings.owner}</dt>
          <dd className='govuk-summary-list__value'>{user.name()}</dd>
        </div>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>{content.headings.email}</dt>
          <dd className='govuk-summary-list__value'>{user.email()}</dd>
        </div>
      </dl>

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
    </ApplicationPage>
  )
}

export default ApplicationCreateSummary
