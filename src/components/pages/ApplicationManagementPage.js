import React from 'react'
import { sidebar } from '../../../content/applicationManagement'
import Page from 'components/Page'

const parentTitle = 'applications'

const ApplicationManagementPage = ({ children, application, hideSidebar, backLink, ...props }) => {
  const sidebarContent = (!hideSidebar) ? sidebar(application) : null

  const breadcrumbs = []
  const back = backLink && 'to application details'

  breadcrumbs.push({ title: parentTitle, href: `/${parentTitle}` })

  if (application) {
    breadcrumbs.push({ title: application.applicationName, href: `/${parentTitle}/${application.applicationId}/details`, back })
    breadcrumbs.push({ title: props.title })
  }

  if (!application && backLink) {
    breadcrumbs[0].back = back
  }

  return (
    <Page parentTitle={parentTitle} sidebarContent={sidebarContent} breadcrumbs={breadcrumbs} {...props}>
      {children}
    </Page>
  )
}

export default ApplicationManagementPage
