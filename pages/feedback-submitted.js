import React from 'react'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'
import { getContent } from '../content/site'
const content = getContent('feedback-submitted')

const FeedbackSubmitted = () => {
  return (
    <Page title={content.title} layout='three-quarters'>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

export async function getServerSideProps (context) {
  return {
    props: {
    }
  }
}

export default FeedbackSubmitted
