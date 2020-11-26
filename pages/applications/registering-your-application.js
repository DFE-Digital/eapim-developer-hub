import React from 'react'
import Content from '../../content.json'
import SideBar from 'components/common/SideBar'
import ContentBuilder from 'components/common/ContentBuilder'
import Page from 'components/Page'

const parent = 'Applications'
const page = 'Registering your application'

const RegisteringApplications = ({ router }) => {
  return (
    <Page router={router} sidebarComponent={<SideBar title={parent} nav={Content.Applications} />}>
      <h1 className='govuk-heading-xl'>{Content.Applications[page].Page}</h1>

      <ContentBuilder sectionNav={false} data={Content.Applications[page].Content.Body} />
      <p className='govuk-body'>
        Go to <a href='/applications' className='govuk-link govuk-!-margin-top-7'>{Content.Applications[page].Content.Button}</a>.
      </p>
    </Page>
  )
}

RegisteringApplications.displayName = page

export default RegisteringApplications
