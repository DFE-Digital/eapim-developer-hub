import React from 'react'
import { getContent, sidebar } from '../../../content/overview'
import ContentBuilder from '../ContentBuilder'
import Page from 'components/Page'

const parentTitle = 'documentation'

const DocumentationPage = ({ contentKey, hasNav = true }) => {
  const content = getContent(contentKey)

  const breadcrumbs = [{ title: content.title }]

  return (
    <Page title={content.title} parentTitle={parentTitle} sidebarContent={sidebar()} breadcrumbs={breadcrumbs}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder data={content.content} sectionNav={hasNav} />
    </Page>
  )
}

export default DocumentationPage
