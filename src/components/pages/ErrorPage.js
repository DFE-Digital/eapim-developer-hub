import React from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'

import { getContent } from '../../../content/site'

const ErrorPage = ({ statusCode, router }) => {
  const content = getContent(statusCode.toString())

  return (
    <Page title={content.title} router={router} layout='two-thirds'>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

export default ErrorPage
