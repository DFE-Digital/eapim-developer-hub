import React, { useState } from 'react'
import { connect } from 'react-redux'
import Page from 'components/Page'

import clipboard from '../../../src/utils/clipboard'

const ApplicationCredentials = ({ selectedApplication, router }) => {
  const [confirm, setConfirm] = useState(false)
  const [clientIdCopied, setClientIdCopied] = useState(false)
  const [primaryCopied, setPrimaryCopied] = useState(false)
  const [secondaryCopied, setSecondaryCopied] = useState(false)

  const onConfirm = () => {
    router.push('/applications/[slug]/details', `/applications/${selectedApplication.applicationId}/details`)
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
    <Page router={router}>
      <h1 className='govuk-heading-xl'>Credentials</h1>

      <div className='govuk-inset-text'>
        We only show your client secrets once to help keep your data secure.<br />
        Copy the client secrets immediately.
      </div>
      <p className='govuk-body'>
        Read more on <a href='/documentation/authorisation#credentials' className='govuk-link' target='_blank'>credentials</a> for further details.
      </p>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Application name:</th>
            <td className='govuk-table__cell'>{selectedApplication ? selectedApplication.applicationName : null}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric' />
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Client Id:</th>
            <td id='clientId' className='govuk-table__cell'>{selectedApplication ? selectedApplication.clientId : null}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric'>
              <a href='#' className='govuk-link' onClick={(e) => copyToClipboard(e, 'clientId')}>
                {clientIdCopied ? 'Copied' : 'Copy'} <span className='govuk-visually-hidden'>client ID</span>
              </a>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Primary secret:</th>
            <td id='primary' className='govuk-table__cell'>{selectedApplication ? selectedApplication.PrimarySecret : null}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric'>
              <a href='#' className='govuk-link' onClick={(e) => copyToClipboard(e, 'primary')}>
                {primaryCopied ? 'Copied' : 'Copy'} <span className='govuk-visually-hidden'>primary secret</span>
              </a>
            </td>
          </tr>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header'>Secondary secret:</th>
            <td id='secondary' className='govuk-table__cell'>{selectedApplication ? selectedApplication.SecondarySecret : null}</td>
            <td className='govuk-table__cell govuk-table__cell--numeric'>
              <a href='#' className='govuk-link' onClick={(e) => copyToClipboard(e, 'secondary')}>
                {secondaryCopied ? 'Copied' : 'Copy'} <span className='govuk-visually-hidden'>secondary secret</span>
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
                I confirm I have copied my client secrets
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button type='button' disabled={!confirm} className='govuk-button' onClick={onConfirm}>View application details</button>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedApplication: state.application.selectedApplication
  }
}

ApplicationCredentials.displayName = 'Application Credentials'

export default connect(mapStateToProps)(ApplicationCredentials)
