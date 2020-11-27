import React from 'react'
import Content from '../../content.json'
import ContentBuilder from './ContentBuilder'
import Page from './Page'

const parent = 'Documentation'

const DocumentationPage = ({ page, router, hasNav = true }) => {
  return (
    <Page
      title={parent}
      router={router}
      sidebarContent={Content.Documentation}
    >
      <h1 className='govuk-heading-xl'>{Content.Documentation[page].Page}</h1>
      <ContentBuilder data={Content.Documentation[page].Content} sectionNav={hasNav} />
    </Page>
  )
}

export default DocumentationPage
