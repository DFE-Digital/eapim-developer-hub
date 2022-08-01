import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from '../lib/authService'
import React from 'react'
import Link from 'next/link'
import ErrorPage from 'components/pages/ErrorPage'
import Page from 'components/Page'
import ContentBuilder from 'components/ContentBuilder'
import { useAuth } from '../providers/AuthProvider'
import { checkBasicAuth } from 'checkAuth'

import errorHandler from '../lib/errorHandler'
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

DeleteAcountConfirm.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {
    try {
      var body = req._req ? req._req.body : req.body

      const token = getOAuthToken(req, res)
      const idtoken = await checkBasicAuth(req, res)
      const userID = idtoken.sub
      const userEmail = idtoken.email
      const { userName } = body

      const url = `${process.env.PLATFORM_API_URL}/Account`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userName, userEmail, userID })
      })

      if (response.status !== 204) {
        throw new Error(response.status)
      }

      res.setHeader('x-deleted-account', 'true')
      res.redirect('/delete-account?account=deleted')
      res.end()
    } catch (error) {
      return errorHandler(res, error, 500)
    }
  }

  return { status: 200 }
}

export default DeleteAcountConfirm
