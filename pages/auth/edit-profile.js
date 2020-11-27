import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { editProfile } from '../../lib/authService'

const EditProfile = () => {
  useEffect(() => {
    async function handler () {
      await editProfile()
    }

    handler()
  })

  return (
    <span className='govuk-visually-hidden'>Redirecting you to edit your profile...</span>
  )
}

EditProfile.displayName = 'Edit Profile'

export default connect(null, { editProfile })(EditProfile)
