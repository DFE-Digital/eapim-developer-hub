import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { PrivateRoute } from 'components/common/PrivateRoute'

import clipboard from '../../../src/utils/clipboard'

class ApplicationCredentials extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirm: false,
      clientIdCopied: false,
      primaryCopied: false,
      secondaryCopied: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  confirm () {
    const { selectedApplication } = this.props
    Router.push('/applications/[slug]/details', `/applications/${selectedApplication.applicationId}/details`)
  }

  copyToClipboard = (e, keyType) => {
    e.preventDefault()

    const res = clipboard(`#${keyType}`)

    if (res) this.setState({ [`${keyType}Copied`]: true })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.checked
    this.setState({ confirm: value })
  }

  render () {
    const {
      selectedApplication
    } = this.props

    console.log(selectedApplication)

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />

        <div className='govuk-width-container'>
          <a href='#' className='govuk-back-link' onClick={() => Router.back()}>Back</a>
          <main className='govuk-main-wrapper ' id='main-content' role='main'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
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
                        <a href='#' className='govuk-link' onClick={(e) => this.copyToClipboard(e, 'clientId')}>
                          {this.state.clientIdCopied ? 'Copied' : 'Copy'}
                        </a>
                      </td>
                    </tr>
                    <tr className='govuk-table__row'>
                      <th scope='row' className='govuk-table__header'>Primary secret:</th>
                      <td id='primary' className='govuk-table__cell'>{selectedApplication ? selectedApplication.PrimarySecret : null}</td>
                      <td className='govuk-table__cell govuk-table__cell--numeric'>
                        <a href='#' className='govuk-link' onClick={(e) => this.copyToClipboard(e, 'primary')}>
                          {this.state.primaryCopied ? 'Copied' : 'Copy'}
                        </a>
                      </td>
                    </tr>
                    <tr className='govuk-table__row'>
                      <th scope='row' className='govuk-table__header'>Secondary secret:</th>
                      <td id='secondary' className='govuk-table__cell'>{selectedApplication ? selectedApplication.SecondarySecret : null}</td>
                      <td className='govuk-table__cell govuk-table__cell--numeric'>
                        <a href='#' className='govuk-link' onClick={(e) => this.copyToClipboard(e, 'secondary')}>
                          {this.state.secondaryCopied ? 'Copied' : 'Copy'}
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
                          checked={this.state.confirm}
                          onChange={this.handleInputChange}
                        />
                        <label className='govuk-label govuk-checkboxes__label' htmlFor='confirm-copy'>
                          I confirm I have copied my client secrets
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <button type='button' disabled={!this.state.confirm} className='govuk-button' onClick={() => this.confirm()}>View application details</button>
              </div>
            </div>
          </main>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedApplication: state.application.selectedApplication
  }
}

ApplicationCredentials.displayName = 'Application Credentials'

export { ApplicationCredentials }
export default connect(mapStateToProps, null)(ApplicationCredentials)
