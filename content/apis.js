export const getContent = (key) => {
  return data[key]
}

export const sidebar = () => {
  const pages = Object.keys(data)
  return pages.map(page => ({ title: data[page].title, url: data[page].url }))
}

const data = {
  apis: {
    title: 'APIs',
    url: '/apis',
    content: {}
  }
}
