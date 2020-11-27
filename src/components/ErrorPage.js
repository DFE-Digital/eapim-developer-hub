import React from 'react'
import Page from 'components/Page'
import { useRouter } from 'next/router'

const ErrorPage = ({ statusCode }) => {
  const router = useRouter()

  let title
  let caption

  switch (statusCode) {
    case 404:
      title = 'Page not found.'
      caption = 'If you entered a web address please check it was correct.'
      break
    case 500:
      title = 'Server Error'
      caption = 'Page contains a server error'
      break
    default:
      title = 'Server Error'
      caption = 'Page contains a server error'
  }

  return (
    <Page router={router} error>
      <h1 className='govuk-heading-xl'>{title}</h1>
      <p className='govuk-body'>{caption}</p>
      <a href='/' className='govuk-body govuk-link govuk-!-margin-top- govuk-!-margin-bottom-0'>Go back to the homepage</a>
    </Page>
  )
}

export default ErrorPage
