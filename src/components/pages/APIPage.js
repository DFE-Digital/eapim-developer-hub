import React from 'react'
import { useRouter } from 'next/router'
import { getContent, sidebar } from '../../../content/apis'
import Page from 'components/Page'

const content = getContent('apis')

const parentTitle = 'APIs'

const APIPage = ({ children, title, hideTitle = false, layout }) => {
  title = title || content.title

  const router = useRouter()
  const breadcrumbs = [{ title: parentTitle, href: `/${parentTitle.toLowerCase()}` }]

  if (parentTitle !== title) breadcrumbs.push({ title, href: router.asPath })

  return (
    <Page title={title} sidebarContent={sidebar()} breadcrumbs={breadcrumbs} layout={layout}>
      {!hideTitle && <h1 className='govuk-heading-xl'>{content.title}</h1>}
      {children}
    </Page>
  )
}

export default APIPage
