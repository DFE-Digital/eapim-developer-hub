import fetch from 'isomorphic-unfetch'
import ClientCredentials from '../lib/clientCredentials'
import React from 'react'
import Link from 'next/link'
import ErrorPage from 'components/pages/ErrorPage'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { useAuth } from '../providers/AuthProvider'
import { checkBasicAuth } from 'checkAuth'

import { getContent } from '../content/profile'

const content = getContent('delete-account-confirm')

const DeleteAcountConfirm = ({ serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const { user } = useAuth()

  return (
    <Page title={content.title} layout='two-thirds'>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <table className='govuk-table'>
        <caption className='govuk-table__caption govuk-heading-m'>{content.tableCaption}</caption>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.name}</th>
            <td className='govuk-table__cell'>{user.name()}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.email}</th>
            <td className='govuk-table__cell'>{user.email()}</td>
          </tr>
        </tbody>
      </table>

      <ContentBuilder sectionNav={false} data={content.content} />

      <form method='POST' action='/delete-account-confirm' noValidate>
        <input type='hidden' name='userName' value={user.name()} />
        <input type='hidden' name='userEmail' value={user.email()} />
        <input type='hidden' name='userID' value={user.id()} />
        <button type='submit' className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'>Delete account</button>
        <Link href='/profile'>
          <a className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>{content.buttons.cancel}</a>
        </Link>
      </form>
    </Page>
  )
}

export async function getServerSideProps (context) {
  if (context.req && context.req.method === 'POST') {
    const idtoken = await checkBasicAuth(context.req, context.res)

    // use user id from token not trusted from client
    const userID = idtoken.sub
    const userEmail = idtoken.email

    var body = context.req._req ? context.req._req.body : context.req.body
    const { userName } = body

    const token = await ClientCredentials.getOauthToken()
    const url = `${process.env.PLATFORM_API_URL}/Account`

    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userName, userEmail, userID })
    })

    if (deleteResponse.status !== 204) {
      throw new Error(deleteResponse.status)
    }

    return {
      redirect: {
        destination: '/delete-account?account=deleted',
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}

export default DeleteAcountConfirm
