import React from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { getContent } from '../content/site'

const content = getContent('cookies')

const Cookies = ({ router }) => {
  return (
    <Page title={content.title} router={router}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

Cookies.displayName = 'Cookies'

export default Cookies
