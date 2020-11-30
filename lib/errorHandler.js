const errorHandler = (res = null, error = new Error('Page not found'), code = 404) => {
  console.log(`Error ${code} - ${error.message}`)

  const serverError = { code, error: error.message }

  if (res) {
    res.statusCode = code
  } else {
    error.statusCode = code
  }

  return { serverError }
}

export default errorHandler

export const error404 = (res) => errorHandler(res)
export const error500 = (res, err) => errorHandler(res, err, 500)
