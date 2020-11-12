const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

const mCallback = (mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes') {
      const mutated = mutation.target
      if (mutated.classList.contains('error') && mutated.classList.contains('itemLevel')) {
        if (mutated.classList.contains('show')) {
          const pBody = mutated.querySelector('.govuk-body')
          if (pBody) {
            pBody.classList.add('govuk-error-message')
          } else {
            const copy = mutated.innerText
            mutated.innerText = null
            const newCopy = document.createElement('span')
            newCopy.innerText = copy
            newCopy.classList.add('govuk-error-message')
            mutated.appendChild(newCopy)
          }
          mutated.closest('.govuk-form-group').classList.add('govuk-form-group--error')
        } else {
          mutated.closest('.govuk-form-group').classList.remove('govuk-form-group--error')
        }
      }
      if (mutated.classList.contains('error') && mutated.classList.contains('pageLevel')) {
        if (mutated.getAttribute('style') === 'display: block;') {
          window.scroll({
            behavior: 'smooth',
            left: 0,
            top: mutated.offsetTop
          })
          const pBody = mutated.querySelector('.govuk-body')
          if (!pBody) {
            const heading = document.createElement('h2')
            heading.innerText = 'There is a problem'
            heading.classList.add('govuk-error-summary__title')
            const copy = mutated.innerText
            mutated.innerText = null
            const newCopy = document.createElement('p')
            newCopy.innerText = copy
            newCopy.classList.add('govuk-body')
            newCopy.classList.add('govuk-!-margin-bottom-0')
            mutated.appendChild(newCopy)
            mutated.insertBefore(heading, newCopy)
          }
        }
      }
    }
  }
}

ready(() => {
  const container = document.getElementById('api')

  const options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }
  const observer = new window.MutationObserver(mCallback)

  if (container) {
    observer.observe(container, options)
  }
})
