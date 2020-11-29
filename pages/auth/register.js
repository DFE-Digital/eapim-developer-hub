import React from 'react'
import { register } from '../../lib/authService'
import B2CHandler from 'components/B2CHandler'

const Register = () => <B2CHandler func={register} text='Redirecting you to create account...' />

Register.displayName = 'Register'

export default Register
