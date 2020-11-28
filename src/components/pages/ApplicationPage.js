import React from 'react'
import { sidebar } from '../../../content/applicationManagement'
import Page from 'components/Page'

const ApplicationPage = ({ children, application, ...props }) => {
  const sidebarContent = application ? sidebar(application) : null

  return (
    <Page parentTitle='Application management' sidebarContent={sidebarContent} {...props}>
      {children}
    </Page>
  )
}

export default ApplicationPage
