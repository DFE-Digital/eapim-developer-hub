import React from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { getContent } from '../content/site'

const content = getContent('privacy')

const PrivacyPolicy = ({ router }) => {
  return (
    <Page title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

PrivacyPolicy.displayName = 'Privacy Policy'

export default PrivacyPolicy
