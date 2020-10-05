import React, { Component, Fragment } from 'react'
import AccessChecker from 'components/common/AccessChecker'
import Router from 'next/router'
import ReturnTo from 'components/common/ReturnTo'
import { PrivateRoute } from 'components/common/PrivateRoute'

class ApplicationDeleteSuccess extends Component {
  render () {
    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <div className='govuk-width-container'>
          <main className='govuk-main-wrapper ' id='main-content' role='main'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <h1 className='govuk-heading-xl'>Application deleted</h1>
                <button
                  type='button'
                  className='govuk-button govuk-!-margin-top-6'
                  onClick={() => Router.push('/applications')}
                >
                    Return to applications list
                </button>
              </div>
            </div>
          </main>
        </div>
      </Fragment>
    )
  }
}

export default ApplicationDeleteSuccess
