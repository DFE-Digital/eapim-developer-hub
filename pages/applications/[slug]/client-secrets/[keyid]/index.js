import fetch from 'isomorphic-unfetch'
import React, { useState } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import ErrorPage from 'components/ErrorPage'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { PrivateRoute } from 'components/common/PrivateRoute'

import getInitialPropsErrorHandler from '../../../../../lib/getInitialPropsErrorHandler'
import { getApplication } from '../../../../../lib/applicationService'
import clipboard from '../../../../../src/utils/clipboard'

const ApplicationClientSecretsConfirm = ({ user, id, secret, applicationName, router, msalConfig, errorCode, newClientKey, newClientKeyDisplayName, startDateTime, endDateTime }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e, element) => {
    e.preventDefault()

    const res = clipboard(element)
    if (res) setCopied(true)
  }

  const isLoggedIn = !!((user.data && user.data.isAuthed))

  return (
    <>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect='/applications' />
      <ReturnTo parentPath={router.asPath} />

      <div className='govuk-width-container'>
        <a className='govuk-back-link' href={`/applications/${id}/client-secrets`}>Back</a>

        <main className='govuk-main-wrapper ' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            {newClientKey &&
              <div className='govuk-grid-column'>
                <h1 className='govuk-heading-xl'>Your {newClientKeyDisplayName} key has been regenerated successfully</h1>

                <p className='govuk-body'>Make sure to copy your new secret as we only show it to you once.</p>

                <table className='govuk-table'>
                  <thead className='govuk-table__head'>
                    <tr className='govuk-table__row'>
                      <th scope='col' className='govuk-table__header'>{newClientKeyDisplayName} secret</th>
                      <th scope='col' className='govuk-table__header'>Created</th>
                      <th scope='col' className='govuk-table__header'>Expires</th>
                      <th scope='col' className='govuk-table__header govuk-table__header--numeric'>Action</th>
                    </tr>
                  </thead>
                  <tbody className='govuk-table__body'>
                    <tr className='govuk-table__row'>
                      <td id='newKey' className='govuk-table__cell middle'>{newClientKey}</td>
                      <td className='govuk-table__cell middle'>{moment(startDateTime).format('DD MMM YYYY')}</td>
                      <td className='govuk-table__cell middle'>{moment(endDateTime).format('DD MMM YYYY')}</td>
                      <td className='govuk-table__cell middle govuk-table__cell--numeric'>
                        <button type='button' className='govuk-button govuk-!-margin-0' onClick={(e) => copyToClipboard(e, '#newKey')}>
                          {copied ? `Copied` : `Copy`}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <a href={`/applications/${id}/client-secrets`} className='govuk-button govuk-button--default' role='button'>Back to client secrets</a>
              </div>
            }

            {!newClientKey && isLoggedIn &&
              <div className='govuk-grid-column-two-thirds'>
                <h1 className='govuk-heading-xl'>Are you sure you want to regenerate your key?</h1>

                <dl className='govuk-summary-list'>
                  <div className='govuk-summary-list__row'>
                    <dt className='govuk-summary-list__key'>Application:</dt>
                    <dd className='govuk-summary-list__value'>{applicationName}</dd>
                  </div>
                  <div className='govuk-summary-list__row'>
                    <dt className='govuk-summary-list__key'>Secret name:</dt>
                    <dd className='govuk-summary-list__value'>{secret.displayName}</dd>
                  </div>
                  <div className='govuk-summary-list__row'>
                    <dt className='govuk-summary-list__key'>Secret hint:</dt>
                    <dd className='govuk-summary-list__value'>{secret.hint}••••••••••••••••••••••••••••••••</dd>
                  </div>
                </dl>

                <form method='POST' action={`/applications/${id}/client-secrets/${secret.keyId}`}>
                  <input type='hidden' name='userName' value={`${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`} />
                  <input type='hidden' name='userEmail' value={user.data.User.idToken['email']} />
                  <input type='hidden' name='userID' value={user.data.User.accountIdentifier} />
                  <input type='hidden' name='organization' value={user.data.User.idToken.extension_OrganizationName} />
                  <input type='hidden' name='applicationId' value={id} />
                  <input type='hidden' name='KeyDisplayName' value={secret.displayName} />
                  <input type='hidden' name='KeyId' value={secret.keyId} />
                  <button type='submit' className='govuk-button govuk-button--default govuk-!-margin-top-6 govuk-!-margin-right-1'>Continue</button>
                  <a href={`/applications/${id}/client-secrets`} className='govuk-button govuk-button--secondary govuk-!-margin-top-6'>Cancel</a>
                </form>
              </div>
            }

          </div>
        </main>
      </div>
    </>
  )
}

ApplicationClientSecretsConfirm.getInitialProps = async ({ req, res, query }) => {
  if (req && req.method === 'GET') {
    try {
      const application = await getApplication(query.slug)
      if (!application) return getInitialPropsErrorHandler(res, 404)

      const secret = application.passwordCredentials.find(item => item.keyId === query.keyid)
      if (!secret) return getInitialPropsErrorHandler(res, 404)

      return {
        secret,
        id: query.slug,
        applicationName: application.applicationName
      }
    } catch (error) {
      return getInitialPropsErrorHandler(res, 500, error)
    }
  }

  if (req && req.method === 'POST') {
    const { userName, userEmail, userID, applicationId, KeyId, KeyDisplayName } = req.body

    try {
      const url = `${process.env.PLATFORM_API_URL}/GenerateApplicationSecret`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
        body: JSON.stringify({ userName, userEmail, userID, applicationId, KeyId, KeyDisplayName })
      })

      if (!response.ok) throw new Error('Error generating a new key')

      const data = await response.json()

      if (response.ok) {
        const application = await getApplication(query.slug)
        const newClientKey = data[`${KeyDisplayName}Secret`]

        const keyObject = data.passwordCredentials.find(item => item.displayName === KeyDisplayName)
        const { startDateTime, endDateTime } = keyObject

        return {
          newClientKey,
          startDateTime,
          endDateTime,
          newClientKeyDisplayName: KeyDisplayName,
          id: data.applicationId,
          applicationName: application.applicationName
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    id: query.slug
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationClientSecretsConfirm.displayName = 'Application client secrets confirm'

export default connect(mapStateToProps)(ApplicationClientSecretsConfirm)
