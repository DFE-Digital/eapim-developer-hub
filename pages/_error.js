import React from 'react'
import ErrorPage from 'components/ErrorPage'

const Error = ({ statusCode = 404, router, msalConfig }) => <ErrorPage statusCode={statusCode} router={router} msalConfig={msalConfig} />

Error.displayName = 'Error page'

Error.getInitialProps = async props => {
  return {
    statusCode: props.query.statusCode
  }
}

export default Error
