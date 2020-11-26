import React from 'react'
import Content from '../../content.json'
import SideBar from 'components/common/SideBar'
import ContentBuilder from 'components/common/ContentBuilder'
import Page from 'components/Page'

const page = 'How to develop your application'

const ApplicationsHowTo = ({ router }) => {
  return (
    <Page router={router} sidebarComponent={<SideBar title={page} nav={Content.Applications} />}>
      <h1 className='govuk-heading-xl'>{Content.Applications[page].Page}</h1>
      <ContentBuilder sectionNav={false} data={Content.Applications[page].Content.Body} />
    </Page>
  )
}

ApplicationsHowTo.displayName = `Application ${page}`

export default ApplicationsHowTo
