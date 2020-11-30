import React, { useEffect } from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { useInsights } from 'hooks'

import { getContent } from '../../../content/site'

const ErrorPage = ({ code, error }) => {
  const [trackException] = useInsights()

  useEffect(() => {
    trackException(new Error(error))
  }, [])

  const content = getContent(code.toString())

  return (
    <Page title={content.title} layout='two-thirds'>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

export default ErrorPage
