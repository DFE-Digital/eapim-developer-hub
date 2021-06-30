import React from 'react'
import { useRouter } from 'next/router'
import { sidebar } from '../../../content/application'
import Page from 'components/Page'

const parentTitle = 'applications'

const PendingSubscriptionsPage = ({ children, title, hideSidebar, backLink, breadcrumbs, ...props }) => {
  const router = useRouter()
  const sidebarContent = (!hideSidebar) ? sidebar() : null

  const back = backLink && 'to application listing'
  breadcrumbs = breadcrumbs || [{ title: parentTitle, href: `/${parentTitle}`, back }]

  if (parentTitle !== title.toLowerCase()) breadcrumbs.push({ title, href: router.asPath })

  return (
    <Page title={title} parentTitle={parentTitle} sidebarContent={sidebarContent} breadcrumbs={breadcrumbs} {...props}>
      {children}
    </Page>
  )
}

export default PendingSubscriptionsPage
