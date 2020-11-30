import React from 'react'
import { getContent } from '../../content/application'
import ContentBuilder from 'components/ContentBuilder'
import ApplicationPage from 'components/pages/ApplicationPage'

const content = getContent('how-to-develop-your-application')

const ApplicationsHowTo = () => {
  return (
    <ApplicationPage title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </ApplicationPage>
  )
}

ApplicationsHowTo.displayName = `How to developer your application`

export default ApplicationsHowTo
