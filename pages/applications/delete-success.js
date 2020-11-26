import React from 'react'
import Page from 'components/Page'

const ApplicationDeleteSuccess = ({ router }) => {
  return (
    <Page router={router} layout='two-thirds'>
      <h1 className='govuk-heading-xl'>Application deleted</h1>
      <button
        type='button'
        className='govuk-button govuk-!-margin-top-6'
        onClick={() => router.push('/applications')}
      >
          Return to applications list
      </button>
    </Page>
  )
}

ApplicationDeleteSuccess.displayName = 'Application Delete Success'

export default ApplicationDeleteSuccess
