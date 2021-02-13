const getCookie = (key) => {
  const cookies = (document.cookie.split(';'))
  const item = cookies.find(item => item.indexOf(key) > -1)

  if (!item) return null

  return item.split('=')[1]
}

const hasCookie = (key) => {
  const cookies = (document.cookie.split(';'))
  return !!cookies.find(item => item.indexOf(key) > -1)
}

const deleteCookie = (key) => {
  document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const setCookie = (key, value) => {
  const date = new Date()
  date.setTime(date.getTime() + (28 * 24 * 60 * 60 * 1000))
  document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/; Secure;`
  return getCookie(key)
}

export default function useCookie () {
  return { getCookie, setCookie, hasCookie, deleteCookie }
}
