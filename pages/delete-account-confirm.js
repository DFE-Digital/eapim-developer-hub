import fetch from 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../content.json'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import { PrivateRoute } from 'components/common/PrivateRoute'

const page = 'Profile'

const DeleteAcountConfirm = ({ user, msalConfig, router }) => {
  let isLoggedIn = false
  if (user.data && user.data.isAuthed) isLoggedIn = true

  return (
    <Fragment>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect={'/'} />
      <ReturnTo parentPath={router.asPath} />
      <Header msalConfig={msalConfig} isLoggedIn={isLoggedIn} />
      <PhaseBanner />
      <div className='govuk-width-container'>
        <a href='#' className='govuk-back-link' onClick={() => router.back()}>Back</a>
        <main className='govuk-main-wrapper ' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
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
                        <td className='govuk-table__cell'>{user.data.User.idToken['signInNames.emailAddress']}</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className='govuk-body'>This will be deleted immediately. We cannot restore accounts once they have been deleted.</p>

                  <form method='POST' action='/delete-account-confirm'>
                    <input type='hidden' name='userName' value={`${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`} />
                    <input type='hidden' name='userEmail' value={user.data.User.idToken['signInNames.emailAddress']} />
                    <input type='hidden' name='userID' value={user.data.User.accountIdentifier} />
                    <button type='submit' className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'>Delete account</button>
                    <Link href='/profile'>
                      <a className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>Cancel</a>
                    </Link>
                  </form>
                </Fragment>
              )}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

DeleteAcountConfirm.getInitialProps = async ({ req, res, store }) => {
  if (req && req.method === 'POST') {
    const { userName, userEmail, userID } = req.body

    try {
      const url = `${process.env.PLATFORM_API_URL}/Account`

      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
        body: JSON.stringify({ userName, userEmail, userID })
      })

      if (response.status !== 204) throw new Error('Error deleting account')

      res.setHeader('x-deleted-account', 'true')
      res.redirect('/?account=deleted')
      res.end()

      return {}
    } catch (error) {
      console.log(error)
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

export { DeleteAcountConfirm }
export default connect(mapStateToProps)(DeleteAcountConfirm)
