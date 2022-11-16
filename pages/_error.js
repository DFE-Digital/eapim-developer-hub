import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'

const Error = ({ code = 500, error = 'Sorry, there is a problem with the service' }) => <ErrorPage code={code} error={error} />

Error.getInitialProps = async ({ query }) => {
  return {
    statusCode: query.statusCode
  }
}

export default Error
