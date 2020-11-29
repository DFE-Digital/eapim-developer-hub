import React from 'react'
import { signIn } from '../../lib/authService'
import B2CHandler from 'components/B2CHandler'

const Login = () => <B2CHandler func={signIn} text='Redirecting you to login...' />

Login.displayName = 'Login'

export default Login
