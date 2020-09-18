export default (res, statusCode, err) => {
  console.log(`getInitialProps Error: ${statusCode}`)

  if (err) console.log('Server error', err)

  if (res) res.statusCode = statusCode

  return {
    statusCode: statusCode || 500
  }
}
