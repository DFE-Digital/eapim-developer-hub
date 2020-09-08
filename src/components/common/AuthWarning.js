import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { signIn } from 'actions/authenticate'
import Content from '../../../content.json'

class AuthWarning extends Component {
  async signIn (e) {
    e.preventDefault()
    await this.props.signIn(this.props.msalConfig)
  }

  render () {
    const { warning } = this.props

    return (
      <Fragment>
        <div className='govuk-warning-text'>
          <span className='govuk-warning-text__icon' aria-hidden='true'>!</span>
          <strong className='govuk-warning-text__text'>
            <span className='govuk-warning-text__assistive'>Warning</span> {warning}
          </strong>
        </div>

        <div className='flex'>
          <button type='button' onClick={e => this.signIn(e)} className='govuk-button'>Register</button>
          <p className='govuk-body'>or <a href='#' onClick={e => this.signIn(e)} className='govuk-link govuk-!-margin-left-1'><strong>sign in</strong></a> to the {Content.PortalName}.</p>
        </div>
      </Fragment>
    )
  }
}

export { AuthWarning }
export default connect(null, { signIn })(AuthWarning)
