import React, { useEffect } from 'react'
import ErrorPage from 'components/pages/ErrorPage'
import { useAuth } from '../providers/AuthProvider'

const DeletedAccount = ({ accountDeleted }) => {
  if (!accountDeleted) return <ErrorPage code={404} error='Page was manually visited' />

  const { logout } = useAuth()

  useEffect(() => {
    if (accountDeleted) {
      logout(`${window.location.origin}/delete-account-success`)
    } else {
      window.location.href = window.location.origin
    }
  }, [])

  return null
}

DeletedAccount.getInitialProps = async ({ req, query }) => {
  if (req && query.account && query.account === 'deleted') return { accountDeleted: true }

  return { status: 200 }
}

export default DeletedAccount
