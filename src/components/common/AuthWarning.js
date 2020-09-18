import React, { Component, Fragment } from 'react'
import Content from '../../../content.json'

class AuthWarning extends Component {
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
          <a href='/auth/register' className='govuk-button'>Create an account</a>
          <p className='govuk-body'>or <a href='/auth/login' className='govuk-link govuk-!-margin-left-1'><strong>sign in</strong></a> to the {Content.PortalName}.</p>
        </div>
      </Fragment>
    )
  }
}

export default AuthWarning
