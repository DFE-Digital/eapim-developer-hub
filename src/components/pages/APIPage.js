import React from 'react'
import { getContent, sidebar } from '../../../content/apis'
import Page from 'components/Page'

const content = getContent('apis')

const APIPage = ({ children, title, hideTitle = false, ...props }) => {
  title = title ? `${title} - ${content.title}` : content.title

  return (
    <Page title={title} sidebarContent={sidebar()} {...props}>
      {!hideTitle && <h1 className='govuk-heading-xl'>{content.title}</h1>}
      {children}
    </Page>
  )
}

export default APIPage
