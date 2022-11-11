function errorHandlerClient (response) {
  console.log(response)
  if (response.status === 401 || response.status === 403) {
    window.location.href = '/auth/login'
  }
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export default errorHandlerClient
