import React from 'react'
import { useAuth } from '../../providers/AuthProvider'

const AuthNavigation = () => {
  const { user, pageLoaded } = useAuth()

  if (!pageLoaded) return null

  return (
    <div className='auth-navigation'>
      <ul className='govuk-list govuk-!-margin-top-3'>
        {!user.getToken() && (
          <>
            <li>
              <a href='/auth/register' className='govuk-link'>Create an account</a>
            </li>
            <li>
              <a href='/auth/login' className='govuk-link'>Sign in</a>
            </li>
          </>
        )}
        {user.getToken() && (
          <>
            <li>
              <a href='/profile' className='govuk-link'>{user.name()}</a>
            </li>
            <li>
              <a href='/auth/logout'className='govuk-link'>Sign out</a>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default AuthNavigation
