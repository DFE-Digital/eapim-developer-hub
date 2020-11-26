import React from 'react'
import Content from '../content.json'
import ContentBuilder from 'components/common/ContentBuilder'
import Page from 'components/Page'

const page = 'Privacy'

const PrivacyPolicy = ({ router }) => {
  return (
    <Page page={page} router={router}>
      <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
      <ContentBuilder sectionNav={false} data={Content[page].Content.Body} />
    </Page>
  )
}

PrivacyPolicy.displayName = 'Privacy Policy'

export default PrivacyPolicy
