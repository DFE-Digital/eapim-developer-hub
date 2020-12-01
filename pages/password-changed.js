import React from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'

import { getContent } from '../content/site'
const content = getContent('password-changed')

const PasswordChanged = () => {
  return (
    <Page title={content.title} layout='three-quarters'>
      <h1 role='alert' aria-live='assertive' className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

export default PasswordChanged
