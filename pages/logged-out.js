import React, { useEffect } from 'react'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { send } from '../lib/emailService'
import { template } from '../emails/survey'
import * as Msal from '@azure/msal-browser'
import { config } from '../lib/authService'
import { useInsights } from 'hooks'

import { getContent } from '../content/site'
const content = getContent('logged-out')
const [trackException] = useInsights()

const LoggedOut = () => {
  useEffect(() => {
    const myMSALObj = new Msal.PublicClientApplication(config.login)

    myMSALObj.handleRedirectPromise()
      .then(res => {
        // complete logout interation
      })
      .catch(error => {
        trackException(error)
      })
  })

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

export async function getServerSideProps (context) {
  if (context.req && context.req.method === 'POST') {
    const body = context.req._req ? context.req._req.body : context.req.body

    await send({
      'email-to': process.env.SUPPORT_EMAIL,
      subject: 'Developer Hub Feedback Survey',
      'content-type': 'text/html',
      'email-content': template(body)
    })

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}

export default LoggedOut
