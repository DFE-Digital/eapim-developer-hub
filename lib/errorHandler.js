const errorHandler = (res, err = 'Page not found', code = 404) => {
  console.log(`Error ${code} - ${err}`)

  res.statusCode = code
  return { errorCode: code }
}

export default errorHandler

export const error404 = (res) => errorHandler(res)
export const error500 = (err, res) => errorHandler(res, err, 500)
