import React from 'react'
import { forgotPassword } from '../../lib/authService'
import B2CHandler from 'components/B2CHandler'

const ForgotPassword = () => <B2CHandler func={forgotPassword} text='Redirecting you to reset password...' />

ForgotPassword.displayName = 'Forgot Password'

export default ForgotPassword
