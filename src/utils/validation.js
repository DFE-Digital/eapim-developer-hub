import { isEmpty, isEmail, isURL, isLength } from 'validator'

const isValidURL = (url) => {
  const protocols = ['https']

  if (url.indexOf('localhost') > -1) protocols.push('http')

  return isURL(url, { protocols, require_tld: false, require_protocol: true, require_valid_protocol: true })
}

export { isEmpty, isEmail, isValidURL, isLength }
