import fetch from 'isomorphic-unfetch'
import { getOAuthToken } from '../../../../../lib/authService'
import React, { useState } from 'react'
import moment from 'moment'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import ContentBuilder from 'components/ContentBuilder'

import errorHandler from '../../../../../lib/errorHandler'

import { getApplication } from '../../../../../lib/applicationService'
import clipboard from '../../../../../src/utils/clipboard'
import { useAuth } from '../../../../../providers/AuthProvider'
import { getContent } from '../../../../../content/applicationManagement'

import { checkAuth } from 'checkAuth'

const content = getContent('client-secrets-confirm')

const ApplicationClientSecretsConfirm = ({ id, secret, application, newClientKey, newClientKeyDisplayName, startDateTime, endDateTime, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const { user } = useAuth()

  const [copied, setCopied] = useState(false)
  const copyToClipboard = (e, element) => {
    e.preventDefault()

    const res = clipboard(element)
    if (res) setCopied(true)
  }

  let title = content.titles.default

  if (newClientKey) title = `Your ${newClientKeyDisplayName} key has been regenerated successfully`
  if (!newClientKey && user.getToken()) title = content.titles.confirm

  const { applicationName } = application

  return (
    <ApplicationManagementPage title={title} application={application} hideSidebar backLink>
      {newClientKey &&
        <div className='govuk-grid-column'>
          <h1 className='govuk-heading-xl'>{title}</h1>

          <ContentBuilder sectionNav={false} data={content.intro} />

          <table className='govuk-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header'>{newClientKeyDisplayName} secret</th>
                <th scope='col' className='govuk-table__header'>{content.tableHeadings.created}</th>
                <th scope='col' className='govuk-table__header'>Expire{content.tableHeadings.expires}s</th>
                <th scope='col' className='govuk-table__header govuk-table__header--numeric'>{content.tableHeadings.action}</th>
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

          <a href={`/applications/${id}/client-secrets`} className='govuk-button govuk-button--default' role='button'>{content.buttons.back}</a>
        </div>
      }

      {!newClientKey && user.getToken() &&
        <div className='govuk-grid-column-two-thirds'>
          <h1 className='govuk-heading-xl'>{title}</h1>

          <dl className='govuk-summary-list'>
            <div className='govuk-summary-list__row'>
              <dt className='govuk-summary-list__key'>{content.summaryListHeadings.application}:</dt>
              <dd className='govuk-summary-list__value'>{applicationName}</dd>
            </div>
            <div className='govuk-summary-list__row'>
              <dt className='govuk-summary-list__key'>{content.summaryListHeadings.secretName}:</dt>
              <dd className='govuk-summary-list__value'>{secret.displayName}</dd>
            </div>
            <div className='govuk-summary-list__row'>
              <dt className='govuk-summary-list__key'>{content.summaryListHeadings.secretHint}:</dt>
              <dd className='govuk-summary-list__value'>{secret.hint}••••••••••••••••••••••••••••••••</dd>
            </div>
          </dl>

          <form method='POST' action={`/applications/${id}/client-secrets/${secret.keyId}`} noValidate>
            <input type='hidden' name='userName' value={user.name()} />
            <input type='hidden' name='userEmail' value={user.email()} />
            <input type='hidden' name='userID' value={user.id()} />
            <input type='hidden' name='applicationId' value={id} />
            <input type='hidden' name='KeyDisplayName' value={secret.displayName} />
            <input type='hidden' name='KeyId' value={secret.keyId} />
            <button type='submit' className='govuk-button govuk-button--default govuk-!-margin-top-6 govuk-!-margin-right-1'>{content.buttons.continue}</button>
            <a href={`/applications/${id}/client-secrets`} className='govuk-button govuk-button--secondary govuk-!-margin-top-6'>{content.buttons.cancel}</a>
          </form>
        </div>
      }
    </ApplicationManagementPage>
  )
}

ApplicationClientSecretsConfirm.getInitialProps = async ({ req, res, query }) => {
  await checkAuth(req, res, query.slug)

  const token = getOAuthToken(req, res)

  if (req && req.method === 'POST') {
    var body = req._req ? req._req.body : req.body

    const { userName, userEmail, userID, applicationId, KeyId, KeyDisplayName } = body

    try {
      const url = `${process.env.PLATFORM_API_URL}/GenerateApplicationSecret`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userName, userEmail, userID, applicationId, KeyId, KeyDisplayName })
      })

      if (!response.ok) throw new Error('Error generating a new key')

      const data = await response.json()

      if (response.ok) {
        const application = await getApplication(query.slug, req, res)
        const newClientKey = data[`${KeyDisplayName}Secret`]

        const keyObject = data.passwordCredentials.find(item => item.displayName === KeyDisplayName)
        const { startDateTime, endDateTime } = keyObject

        return {
          application,
          newClientKey,
          startDateTime,
          endDateTime,
          newClientKeyDisplayName: KeyDisplayName,
          id: data.applicationId
        }
      }
    } catch (error) {
      return errorHandler(res, error, 500)
    }
  }

  try {
    const application = await getApplication(query.slug, req, res)
    if (!application) return errorHandler(res)

    const secret = application.passwordCredentials.find(item => item.keyId === query.keyid)
    if (!secret) return errorHandler(res)

    return {
      secret,
      application,
      id: query.slug
    }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default ApplicationClientSecretsConfirm
