import fetch from 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Content from '../content.json'
import ErrorPage from 'components/ErrorPage'
import Page from 'components/Page'

import getInitialPropsErrorHandler from '../lib/getInitialPropsErrorHandler'

const page = 'Profile'

const DeleteAcountConfirm = ({ user, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <Page router={router} layout='two-thirds'>
      {user.data && user.data.User && (
        <Fragment>
          <h1 className='govuk-heading-xl'>Are you sure you want us to delete your account?</h1>

          <table className='govuk-table'>
            <caption className='govuk-table__caption govuk-heading-m'>{Content[page].Content.AccountDetails.Heading}</caption>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <th scope='row' className='govuk-table__header'>Name</th>
                <td className='govuk-table__cell'>{user.data.User.idToken.given_name} {user.data.User.idToken.family_name}</td>
              </tr>
              <tr className='govuk-table__row'>
                <th scope='row' className='govuk-table__header'>Email address</th>
                <td className='govuk-table__cell'>{user.data.User.idToken['email']}</td>
              </tr>
            </tbody>
          </table>

          <p className='govuk-body'>This will be deleted immediately. We cannot restore accounts once they have been deleted.</p>

          <form method='POST' action='/delete-account-confirm'>
            <input type='hidden' name='userName' value={`${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`} />
            <input type='hidden' name='userEmail' value={user.data.User.idToken['email']} />
            <input type='hidden' name='userID' value={user.data.User.accountIdentifier} />
            <button type='submit' className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'>Delete account</button>
            <Link href='/profile'>
              <a className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>Cancel</a>
            </Link>
          </form>
        </Fragment>
      )}
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
        return getInitialPropsErrorHandler(res, response.status)
      }

      res.setHeader('x-deleted-account', 'true')
      res.redirect('/?account=deleted')
      res.end()

      return {}
    } catch (error) {
      return getInitialPropsErrorHandler(res, 500, error)
    }
  } else {
    return { status: 200 }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

DeleteAcountConfirm.displayName = 'DeleteAcountConfirm'

export default connect(mapStateToProps)(DeleteAcountConfirm)
