import React from 'react'
import { getContent, sidebar } from '../../content/overview'
import ContentBuilder from './ContentBuilder'
import Page from './Page'

const DocumentationPage = ({ router, contentKey, hasNav = true }) => {
  const content = getContent(contentKey)

  return (
    <Page title={content.title} parentTitle='Documentation' router={router} sidebarContent={sidebar()}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder data={content.content} sectionNav={hasNav} />
    </Page>
  )
}

export default DocumentationPage
