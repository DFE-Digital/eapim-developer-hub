import React from 'react'
import Content from '../content.json'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'

const page = 'Cookies'

const Cookies = ({ router }) => {
  return (
    <Page page={page} router={router}>
      <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
      <ContentBuilder sectionNav={false} data={Content[page].Content.Body} />
    </Page>
  )
}

Cookies.displayName = page

export default Cookies
