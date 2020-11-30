const getCookie = (key) => {
  const cookies = (document.cookie.split(';'))
  return cookies.find(item => item.indexOf(key) > -1) ? key : null
}

const hasCookie = (key) => {
  const cookies = (document.cookie.split(';'))
  return !!cookies.find(item => item.indexOf(key) > -1)
}

const setCookie = (key, value) => {
  const date = new Date()
  date.setTime(date.getTime() + (28 * 24 * 60 * 60 * 1000))
  document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/`
  return getCookie(key)
}

export default function useCookie () {
  return { getCookie, setCookie, hasCookie }
}
