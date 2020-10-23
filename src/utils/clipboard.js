const clipboard = (element) => {
  const el = document.querySelector(element)
  const range = document.createRange()

  range.selectNode(el)
  window.getSelection().addRange(range)

  try {
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    return true
  } catch (err) {
    console.log('Error unable to copy: ', err)
  }

  window.getSelection().removeAllRanges()
  return false
}

export default clipboard
