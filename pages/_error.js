import React from 'react'
import ErrorPage from 'components/pages/ErrorPage'

const Error = ({ code = 404, error = 'Page not found' }) => <ErrorPage code={code} error={error} />

Error.displayName = 'Error page'

Error.getInitialProps = async ({ query }) => {
  return {
    statusCode: query.statusCode
  }
}

export default Error
