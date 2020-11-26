import React from 'react'
import Content from '../../content.json'
import SideBar from 'components/common/SideBar'
import ContentBuilder from 'components/common/ContentBuilder'
import Page from 'components/Page'

const parent = 'Documentation'

const DocumentationPage = ({ page, router, hasNav = true }) => {
  return (
    <Page
      page={page}
      router={router}
      sidebarComponent={<SideBar title={parent} nav={Content.Documentation} />}
    >
      <h1 className='govuk-heading-xl'>{Content.Documentation[page].Page}</h1>
      <ContentBuilder data={Content.Documentation[page].Content} sectionNav={hasNav} />
    </Page>
  )
}

export default DocumentationPage
