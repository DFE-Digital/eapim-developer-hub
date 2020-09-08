import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import { clearApplication } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

const page = 'Delete application'

class DeleteApplication extends Component {
  render () {
    const {
      selectedApplication,
      user: { data }
    } = this.props

    let isLoggedIn = false
    if (data && data.isAuthed) isLoggedIn = true

    if (!selectedApplication) return <Loading />

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <Header msalConfig={this.props.msalConfig} isLoggedIn={isLoggedIn} />
        <PhaseBanner />
        <div className='govuk-width-container'>
          <a href='#' className='govuk-back-link' onClick={() => Router.back()}>Back</a>
          <main className='govuk-main-wrapper ' id='main-content' role='main'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <h1 className='govuk-heading-xl'>{page}</h1>

                <dl className='govuk-summary-list'>
                  <div className='govuk-summary-list__row'>
                    <dt className='govuk-summary-list__key'>Application:</dt>
                    <dd className='govuk-summary-list__value'>{(selectedApplication ? selectedApplication.applicationName : '')}</dd>
                  </div>
                  <div className='govuk-summary-list__row'>
                    <dt className='govuk-summary-list__key'>Environment:</dt>
                    <dd className='govuk-summary-list__value'>Sandbox</dd>
                  </div>
                </dl>

                <p className='govuk-body'>Before deleting this application, check with all your <Link href='/applications/[slug]/team-members' as={`/applications/${selectedApplication.applicationId}/team-members`}><a className={'govuk-link'}>team members</a></Link>.</p>

                <Link href='/applications/[slug]/delete-confirm' as={`/applications/${selectedApplication.applicationId}/delete-confirm`}>
                  <a className={'govuk-button govuk-!-margin-top-6'}>Continue</a>
                </Link>
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
    selectedApplication: state.application.selectedApplication
  }
}

export { DeleteApplication }
export default connect(mapStateToProps, { clearApplication })(DeleteApplication)
