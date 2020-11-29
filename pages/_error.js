import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'

const Error = ({ statusCode = 404, router }) => <ErrorPage statusCode={statusCode} router={router} />

Error.displayName = 'Error page'

Error.getInitialProps = async props => {
  return {
    statusCode: props.query.statusCode
  }
}

export default Error
