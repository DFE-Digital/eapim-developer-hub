import React, { useState, useEffect } from 'react'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import ContentBuilder from 'components/ContentBuilder'
import clipboard from '../../../src/utils/clipboard'
import { getApplication } from '../../../lib/applicationService'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

import { getContent } from '../../../content/applicationManagement'
const content = getContent('credentials')

const ApplicationCredentials = ({ application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const [confirm, setConfirm] = useState(false)
  const [clientIdCopied, setClientIdCopied] = useState(false)
  const [primaryCopied, setPrimaryCopied] = useState(false)
  const [secondaryCopied, setSecondaryCopied] = useState(false)

  const [credentials, setCredentials] = useState({})

  useEffect(() => {
    const creds = window.localStorage.getItem('credentials')

    if (creds) {
      return setCredentials(JSON.parse(window.localStorage.getItem('credentials')))
    }

    return setCredentials({})
  }, [])

  const onConfirm = () => {
    window.localStorage.removeItem('credentials')
    window.location.href = `/applications/${application.applicationId}/details`
  }

  const copyToClipboard = (e, keyType) => {
    e.preventDefault()

    const res = clipboard(`#${keyType}`)

    switch (keyType) {
      case 'primary': if (res) setPrimaryCopied(true); break
      case 'secondary': if (res) setSecondaryCopied(true); break
      case 'clientId': if (res) setClientIdCopied(true); break
      default:
    }
  }

  const handleInputChange = (event) => {
    setConfirm(event.target.checked)
  }

  return (
    <ApplicationManagementPage title={content.title} hideSidebar backLink>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <ContentBuilder sectionNav={false} data={content.content} />

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.name}:</th>
            <td className='govuk-table__cell'>{application.applicationName}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric' />
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.clientId}:</th>
            <td id='clientId' className='govuk-table__cell'>{application.clientId}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric'>
              <a href='#' className='govuk-link' onClick={(e) => copyToClipboard(e, 'clientId')}>
                {clientIdCopied ? content.buttons.copied : content.buttons.copy} <span className='govuk-visually-hidden'>{content.tableHeadings.clientId}</span>
              </a>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.primarySecret}:</th>
            <td id='primary' className='govuk-table__cell'>{credentials.primarySecret}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric'>
              <a href='#' className='govuk-link' onClick={(e) => copyToClipboard(e, 'primary')}>
                {primaryCopied ? content.buttons.copied : content.buttons.copy} <span className='govuk-visually-hidden'>{content.tableHeadings.primarySecret}</span>
              </a>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>{content.tableHeadings.secondarySecret}:</th>
            <td id='secondary' className='govuk-table__cell'>{credentials.secondarySecret}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric'>
              <a href='#' className='govuk-link' onClick={(e) => copyToClipboard(e, 'secondary')}>
                {secondaryCopied ? content.buttons.copied : content.buttons.copy} <span className='govuk-visually-hidden'>{content.tableHeadings.secondarySecret}</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='govuk-form-group'>
        <fieldset className='govuk-fieldset'>
          <div className='govuk-checkboxes'>
            <div className='govuk-checkboxes__item'>
              <input
                className='govuk-checkboxes__input'
                id='confirm-copy'
                name='confirm-copy'
                type='checkbox'
                checked={confirm}
                onChange={handleInputChange}
              />
              <label className='govuk-label govuk-checkboxes__label' htmlFor='confirm-copy'>
                {content.inputs.label}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button type='button' disabled={!confirm} className='govuk-button' onClick={onConfirm}>
        {content.buttons.view}
      </button>
    </ApplicationManagementPage>
  )
}

export async function getServerSideProps (context) {
  const session = await checkBasicAuth(context.req, context.res)
  await checkUserOwnsApp(session, context.query.slug)

  const application = await getApplication(context.query.slug)
  if (!application) throw new Error('Forbidden')

  return {
    props: {
      application
    }
  }
}

export default ApplicationCredentials
