import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { cancelApplication } from '../../../src/actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

class ApplicationCreateSuccess extends Component {
  componentDidMount () {
    this.props.cancelApplication()
  }

  viewCredentials () {
    const { selectedApplication } = this.props
    Router.push('/applications/[slug]/credentials', `/applications/${selectedApplication.applicationId}/credentials`)
  }

  render () {
    const {
      selectedApplication
    } = this.props

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
                <h1 className='govuk-heading-xl'>Application added</h1>

                <h2 className='govuk-heading-l'>You added {selectedApplication.applicationName}</h2>
                <p className='govuk-body'>You can now use its credentials to test with APIs.</p>

                <button type='button' className='govuk-button' onClick={() => this.viewCredentials()}>View application credentials</button>
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

export { ApplicationCreateSuccess }
export default connect(mapStateToProps, { cancelApplication })(ApplicationCreateSuccess)
