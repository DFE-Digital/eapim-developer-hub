import fetch from 'isomorphic-unfetch'
import React from 'react'
import Link from 'next/link'
import Content from '../content.json'
import ErrorPage from 'components/pages/ErrorPage'
import Page from 'components/Page'
import { useAuth } from '../providers/AuthProvider'

import errorHandler from '../lib/errorHandler'

const page = 'Profile'

const DeleteAcountConfirm = ({ router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const { user } = useAuth()

  return (
    <Page router={router} layout='two-thirds'>
      {!user.getToken() && null}

      <h1 className='govuk-heading-xl'>Are you sure you want us to delete your account?</h1>

      <table className='govuk-table'>
        <caption className='govuk-table__caption govuk-heading-m'>{Content[page].Content.AccountDetails.Heading}</caption>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Name</th>
            <td className='govuk-table__cell'>{user.given_name} {user.family_name}</td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Email address</th>
            <td className='govuk-table__cell'>{user.email}</td>
          </tr>
        </tbody>
      </table>

      <p className='govuk-body'>This will be deleted immediately. We cannot restore accounts once they have been deleted.</p>

      <form method='POST' action='/delete-account-confirm' noValidate>
        <input type='hidden' name='userName' value={`${user.given_name} ${user.family_name}`} />
        <input type='hidden' name='userEmail' value={user.email} />
        <input type='hidden' name='userID' value={user.accountIdentifier} />
        <button type='submit' className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'>Delete account</button>
        <Link href='/profile'>
          <a className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>Cancel</a>
        </Link>
      </form>
    </Page>
  )
}

DeleteAcountConfirm.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {
    try {
      const { userName, userEmail, userID } = req.body
      const url = `${process.env.PLATFORM_API_URL}/Account`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
        body: JSON.stringify({ userName, userEmail, userID })
      })

      if (response.status !== 204) {
        throw new Error(response.status)
      }

      res.setHeader('x-deleted-account', 'true')
      res.redirect('/?account=deleted')
      res.end()

      return {}
    } catch (error) {
      return errorHandler(error, res, 500)
    }
  } else {
    return { status: 200 }
  }
}

DeleteAcountConfirm.displayName = 'DeleteAcountConfirm'

export default DeleteAcountConfirm
