import React, { useContext } from 'react'
import { connect } from 'react-redux'
import AuthContext from '../../auth/context'

import { signInLink, registerLink, signOutLink, editProfileLink } from '../../actions/authenticate'

const AuthNavigation = ({ user }) => {
  const { msal } = useContext(AuthContext)

  const userEmail = user.data && user.data.User && user.data.User.idToken['email']
  const userName = user.data && user.data.User && `${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`

  return (
    <div className='govuk-width-container auth-navigation'>
      <ul className='govuk-list govuk-!-margin-top-2'>
        {!userEmail && (
          <>
            <li>
              <a href='/auth/register' onClick={(e) => registerLink(e, msal.regiser)} className='govuk-link'>Create an account</a>
            </li>
            <li>
              <a href='/auth/login' onClick={(e) => signInLink(e, msal.login)} className='govuk-link'>Sign in</a>
            </li>
          </>
        )}
        {userEmail && (
          <>
            <li>
              <a href='/auth/edit-profile' onClick={(e) => editProfileLink(e, msal.editProfile)} className='govuk-link'>{userName}</a>
            </li>
            <li>
              <a href='/auth/logout' onClick={(e) => signOutLink(e, msal.login)} className='govuk-link'>Sign out</a>
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
