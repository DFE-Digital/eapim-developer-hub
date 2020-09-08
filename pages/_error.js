import React from 'react'
import ErrorPage from 'components/ErrorPage'

const Error = ({ statusCode, router, msalConfig }) => <ErrorPage statusCode={statusCode} router={router} msalConfig={msalConfig} />

Error.getInitialProps = async props => {
  return {
    statusCode: props.query.statusCode
  }
}

export default Error
