import React from 'react'
import { getContent, sidebar } from '../../../content/application'
import Page from 'components/Page'

const content = getContent('subscriptions')

const parentTitle = 'Pending Subscriptions'

const PendingSubscriptionsPage = ({ children, title, layout }) => {
  title = title || content.title

  const breadcrumbs = [{ title: parentTitle, href: `/${parentTitle.toLowerCase()}` }]

  return (
    <Page title={title} sidebarContent={sidebar()} breadcrumbs={breadcrumbs} layout={layout}>
      {children}
    </Page>
  )
}

export default PendingSubscriptionsPage
