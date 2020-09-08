export default (res, statusCode, err) => {
  console.log(`getInitialProps Error: ${statusCode}`)

  if (err) console.log('Server error', err)

  res.statusCode = statusCode

  return {
    statusCode
  }
}
