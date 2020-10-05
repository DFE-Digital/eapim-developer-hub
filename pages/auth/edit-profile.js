import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { editProfile } from '../../src/actions/authenticate'

const EditProfile = ({ msalEditProfileConfig }) => {
  useEffect(() => {
    async function handler () {
      await editProfile(msalEditProfileConfig)
    }

    handler()
  })

  return (
    <div className='govuk-width-container'>
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h3 className='govuk-heading-m govuk-!-margin-0'>Redirecting you to edit your profile...</h3>
          </div>
        </div>
      </main>
    </div>
  )
}

EditProfile.displayName = 'Edit Profile'

export default connect(null, { editProfile })(EditProfile)
