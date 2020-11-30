import React from 'react'
import { changePassword } from '../../lib/authService'
import B2CHandler from 'components/B2CHandler'

const ChangePassword = () => <B2CHandler func={changePassword} text='Redirecting you to change password...' />

export default ChangePassword
