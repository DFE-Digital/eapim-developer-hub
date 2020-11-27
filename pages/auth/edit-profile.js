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
    <span className='govuk-visually-hidden'>Redirecting you to edit your profile...</span>
  )
}

EditProfile.displayName = 'Edit Profile'

export default connect(null, { editProfile })(EditProfile)
