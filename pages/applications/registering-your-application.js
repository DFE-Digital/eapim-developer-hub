import React from 'react'
import { getContent } from '../../content/application'
import ContentBuilder from 'components/ContentBuilder'
import ApplicationPage from 'components/pages/ApplicationPage'

const content = getContent('registering-your-application')
const page = 'Registering your application'

const RegisteringApplications = () => {
  return (
    <ApplicationPage title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <ContentBuilder sectionNav={false} data={content.content} />
      <p className='govuk-body'>
        Go to <a href='/applications' className='govuk-link govuk-!-margin-top-7'>{content.buttons.register}</a>.
      </p>
    </ApplicationPage>
  )
}

RegisteringApplications.displayName = page

export default RegisteringApplications
