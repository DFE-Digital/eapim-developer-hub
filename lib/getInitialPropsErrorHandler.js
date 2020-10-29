const getInitialPropsErrorHandler = (res, statusCode = 500, err) => {
  console.log(`getInitialProps Error: ${statusCode}`)

  if (err) console.log('Server error', err)

  res.statusCode = statusCode

  return {
    errorCode: statusCode
  }
}

export default getInitialPropsErrorHandler
