import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AccessChecker from 'components/common/AccessChecker'
import Router from 'next/router'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import { deleteApplication, getApplications } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

class DeleteSuccess extends Component {
  render () {
    const {
      user: { data }
    } = this.props

    let isLoggedIn = false
    if (data && data.isAuthed) isLoggedIn = true

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <Header msalConfig={this.props.msalConfig} isLoggedIn={isLoggedIn} />
        <PhaseBanner />
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    application: state.application
  }
}

export { DeleteSuccess }
export default connect(mapStateToProps, { deleteApplication, getApplications })(DeleteSuccess)
