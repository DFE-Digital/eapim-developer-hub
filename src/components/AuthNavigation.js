import React from 'react'
import { connect } from 'react-redux'

const AuthNavigation = ({ user }) => {
  const userEmail = user.data && user.data.User && user.data.User.idToken['email']
  const userName = user.data && user.data.User && `${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`

  return (
    <div className='govuk-width-container auth-navigation'>
      <ul className='govuk-list govuk-!-margin-top-3'>
        {!userEmail && (
          <>
            <li>
              <a href='/auth/register' className='govuk-link'>Create an account</a>
            </li>
            <li>
              <a href='/auth/login' className='govuk-link'>Sign in</a>
            </li>
          </>
        )}
        {userEmail && (
          <>
            <li>
              <a href='/profile' className='govuk-link'>{userName}</a>
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(AuthNavigation)
