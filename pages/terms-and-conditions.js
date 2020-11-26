import React from 'react'
import Content from '../content.json'
import ContentBuilder from 'components/common/ContentBuilder'
import Page from 'components/Page'

const page = 'Terms and conditions'

const TermsAndConditions = ({ router }) => {
  return (
    <Page page={page} router={router}>
      <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
      <ContentBuilder sectionNav={false} data={Content[page].Content.Body} />
    </Page>
  )
}

TermsAndConditions.displayName = 'Terms and conditions'

export default TermsAndConditions
