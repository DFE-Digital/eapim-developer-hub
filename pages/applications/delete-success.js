import React from 'react'
import ApplicationPage from 'components/pages/ApplicationPage'
import { getContent } from '../../content/applicationManagement'

const content = getContent('delete-application').pageSuccess

const ApplicationDeleteSuccess = ({ router }) => {
  return (
    <ApplicationPage title={content.title} router={router} layout='two-thirds'>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <a role='button' href='/applications' className='govuk-button govuk-!-margin-top-6'>
        {content.buttons.return}
      </a>
    </ApplicationPage>
  )
}

ApplicationDeleteSuccess.displayName = 'Application Delete Success'

export default ApplicationDeleteSuccess
