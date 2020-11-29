export const getItem = (key, value) => {
  const item = window.localStorage.getItem(key)

  if (item) {
    const data = JSON.parse(item)
    if (value) return data[value]
    return data
  }

  return null
}

export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
