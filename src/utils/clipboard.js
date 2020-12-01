const clipboard = (element) => {
  const el = document.querySelector(element)

  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(el)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(el)
    window.getSelection().removeAllRanges()
    selection.addRange(range)
  } else {
    const range = document.createRange()
    range.selectNode(el)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
  }

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
