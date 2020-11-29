import React from 'react'
import { editProfile } from '../../lib/authService'
import B2CHandler from 'components/B2CHandler'

const EditProfile = () => <B2CHandler func={editProfile} text='Redirecting you to edit your profile...' />

EditProfile.displayName = 'Edit Profile'

export default EditProfile
