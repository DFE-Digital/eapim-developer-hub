import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Page from 'components/Page'

import { cancelApplication } from '../../../src/actions/application'

const ApplicationCreateSuccess = ({ selectedApplication, cancelApplication, router }) => {
  useEffect(() => {
    async function cancel () {
      await cancelApplication()
    }
    cancel()
  }, [])

  const viewCredentials = () => {
    router.push('/applications/[slug]/credentials', `/applications/${selectedApplication.applicationId}/credentials`)
  }

  return (
    <Page router={router}>
      <h1 className='govuk-heading-xl'>Application added</h1>
      <h2 className='govuk-heading-l'>You added {selectedApplication.applicationName}</h2>
      <p className='govuk-body'>You can now use its credentials to test with APIs.</p>
      <button type='button' className='govuk-button' onClick={() => viewCredentials()}>View application credentials</button>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedApplication: state.application.selectedApplication
  }
}

ApplicationCreateSuccess.displayName = 'Application added success'

export default connect(mapStateToProps, { cancelApplication })(ApplicationCreateSuccess)
