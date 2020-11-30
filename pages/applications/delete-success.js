import React from 'react'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import { getContent } from '../../content/applicationManagement'

const content = getContent('delete-application').pageSuccess

const ApplicationDeleteSuccess = () => {
  return (
    <ApplicationManagementPage title={content.title} layout='two-thirds' hideSidebar backLink>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <a role='button' href='/applications' className='govuk-button govuk-!-margin-top-6'>
        {content.buttons.return}
      </a>
    </ApplicationManagementPage>
  )
}

ApplicationDeleteSuccess.displayName = 'Application Delete Success'

export default ApplicationDeleteSuccess
