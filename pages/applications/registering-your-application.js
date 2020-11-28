import React from 'react'
import { getContent, sidebar } from '../../content/application'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'

const content = getContent('registering-your-application')
const page = 'Registering your application'

const RegisteringApplications = ({ router }) => {
  return (
    <Page title={content.title} router={router} sidebarContent={sidebar()}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <ContentBuilder sectionNav={false} data={content.content} />
      <p className='govuk-body'>
        Go to <a href='/applications' className='govuk-link govuk-!-margin-top-7'>{content.buttons.register}</a>.
      </p>
    </Page>
  )
}

RegisteringApplications.displayName = page

export default RegisteringApplications
