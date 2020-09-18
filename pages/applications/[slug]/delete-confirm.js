import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import AccessChecker from 'components/common/AccessChecker'
import Router from 'next/router'
import ReturnTo from 'components/common/ReturnTo'
import { deleteApplication, getApplications } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

class DeleteConfirm extends Component {
  async deleteConfirm () {
    const {
      deleteApplication,
      getApplications,
      application: { selectedApplication, deleting },
      user: { data }
    } = this.props

    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['email'],
      userID: data.User.accountIdentifier,
      applicationId: selectedApplication.applicationId
    }

    console.log(body)

    const deleteApp = await deleteApplication(body)

    console.log(deleteApp)

    if (deleteApp && !deleting) {
      console.log('Successfully Deleted!')
      await getApplications(data.User)
      Router.push('/applications/delete-success')
    }
  }

  render () {
    const {
      application: { selectedApplication, deleting }
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
              <div className='govuk-grid-column-two-thirds'>
                {selectedApplication && (
                  <Fragment>
                    <h1 className='govuk-heading-xl'>Are you sure you want us to delete your application?</h1>

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

                    <p className='govuk-body'>This will be deleted immediately. We cannot restore applications once they have been deleted.</p>

                    <button
                      type='submit'
                      disabled={deleting}
                      className='govuk-button govuk-button--warning govuk-!-margin-top-6 govuk-!-margin-right-1'
                      onClick={() => this.deleteConfirm()}
                    >
                      {!deleting ? 'Delete application' : 'Deleting...'}
                    </button>
                    <Link href='/applications/[slug]/details' as={`/applications/${selectedApplication.applicationId}/details`}>
                      <a className={'govuk-button govuk-button--secondary govuk-!-margin-top-6'}>Cancel</a>
                    </Link>
                  </Fragment>
                )}
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

export { DeleteConfirm }
export default connect(mapStateToProps, { deleteApplication, getApplications })(DeleteConfirm)
