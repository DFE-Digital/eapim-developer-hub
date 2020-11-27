import React from 'react'
import Content from '../../content.json'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'

const page = 'How to develop your application'

const ApplicationsHowTo = ({ router }) => {
  return (
    <Page title={page} router={router} sidebarContent={Content.Applications}>
      <h1 className='govuk-heading-xl'>{Content.Applications[page].Page}</h1>
      <ContentBuilder sectionNav={false} data={Content.Applications[page].Content.Body} />
    </Page>
  )
}

ApplicationsHowTo.displayName = `Application ${page}`

export default ApplicationsHowTo
