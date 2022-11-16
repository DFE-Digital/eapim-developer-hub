import React from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { send } from '../lib/emailService'
import { template } from '../emails/survey'
import errorHandler from '../lib/errorHandler'

import { getContent } from '../content/site'
const content = getContent('logged-out')

const LoggedOut = () => {
  return (
    <Page title={content.title} layout='three-quarters'>
      <h1 className='govuk-heading-l'>{content.title}</h1>
      <a href='/' className='govuk-button govuk-button--default' role='button'>
        {content.buttons.home}
      </a>

      <hr className='govuk-section-break govuk-section-break--l govuk-section-break--visible' />

      <ContentBuilder sectionNav={false} data={content.content} />
    </Page>
  )
}

LoggedOut.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {
    try {
      var body = req._req ? req._req.body : req.body

      await send({
        'email-to': process.env.SUPPORT_EMAIL,
        subject: 'Developer Hub Feedback Survey',
        'content-type': 'text/html',
        'email-content': template(body)
      }, req, res)

      const response = res._res ? res._res : res
      response.writeHead(301, { Location: '/' })
      response.end()
    } catch (error) {
      return errorHandler(res, error, 500)
    }
  }

  return {
    status: 200
  }
}

export default LoggedOut
