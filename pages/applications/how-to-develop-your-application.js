import React from 'react'
import { getContent, sidebar } from '../../content/application'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'

const content = getContent('how-to-develop-your-application')

const ApplicationsHowTo = ({ router }) => {
  return (
    <Page title={content.title} router={router} sidebarContent={sidebar()}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

ApplicationsHowTo.displayName = `How to developer your application`

export default ApplicationsHowTo
