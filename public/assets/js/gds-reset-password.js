const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

const wrapPageError = (toWrap) => {
  const content = toWrap.querySelector('.govuk-body')
  const heading = document.createElement('h2')
  heading.innerText = 'There is a problem'
  heading.classList.add('govuk-error-summary__title')
  toWrap.insertBefore(heading, content)
  return toWrap
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
    const inputGroups = container.querySelectorAll('.entry-item')
    const attrEntry = container.querySelectorAll('.attrEntry')
    const labels = container.querySelectorAll('label')
    const inputs = container.querySelectorAll('input')
    const buttons = container.querySelectorAll('button')
    const anchors = container.querySelectorAll('a')
    const intros = container.querySelectorAll('.intro')
    const dividers = container.querySelectorAll('.divider')
    const p = container.querySelectorAll('p')
    const verificationInfoText = container.querySelectorAll('.verificationInfoText')
    const verificationErrorText = container.querySelectorAll('.verificationErrorText')
    const verificationSuccessText = container.querySelectorAll('.verificationSuccessText')
    const continueBtn = container.querySelector('#continue')
    const cancelBtn = container.querySelector('#cancel')
    const pageErrors = container.querySelectorAll('.error.pageLevel')
    const itemErrors = container.querySelectorAll('.error.itemLevel')

    continueBtn.classList.add('govuk-!-margin-right-1')
    cancelBtn.classList.add('govuk-button--secondary')

    inputGroups.forEach(group => group.classList.add('govuk-form-group'))
    attrEntry.forEach(group => group.classList.add('govuk-form-group'))
    labels.forEach(label => label.classList.add('govuk-label'))
    inputs.forEach(input => input.classList.add('govuk-input'))
    buttons.forEach(button => button.classList.add('govuk-button'))

    anchors.forEach(anchor => anchor.classList.add('govuk-link'))
    intros.forEach(intro => {
      intro.style.display = 'none'
    })
    dividers.forEach(divider => {
      divider.style.display = 'none'
    })
    p.forEach(ptag => {
      ptag.classList.add('govuk-body')
    })
    verificationInfoText.forEach(text => text.classList.add('govuk-inset-text'))

    verificationErrorText.forEach(error => {
      const copy = error.innerText
      error.innerText = null
      const newCopy = document.createElement('p')
      newCopy.innerText = copy
      newCopy.classList.add('govuk-body')
      newCopy.classList.add('govuk-!-margin-bottom-0')
      error.appendChild(newCopy)
      error.classList.add('govuk-error-summary')
    })

    verificationSuccessText.forEach(success => {
      const copy = success.innerText
      success.innerText = null
      const newCopy = document.createElement('p')
      newCopy.innerText = copy
      newCopy.classList.add('govuk-body')
      newCopy.classList.add('govuk-!-margin-bottom-0')
      success.appendChild(newCopy)
      success.classList.add('notification')
      success.classList.add('notification-success')
    })

    pageErrors.forEach(error => {
      const copy = error.innerText
      error.innerText = null
      const newCopy = document.createElement('p')
      newCopy.innerText = copy
      newCopy.classList.add('govuk-body')
      newCopy.classList.add('govuk-!-margin-bottom-0')
      error.appendChild(newCopy)
      error.classList.add('govuk-error-summary')
    })

    itemErrors.forEach(error => {
      const copy = error.innerText
      error.innerText = null
      const newCopy = document.createElement('p')
      newCopy.innerText = copy
      newCopy.classList.add('govuk-body')
      newCopy.classList.add('govuk-!-margin-bottom-0')
      error.appendChild(newCopy)
    })
  }

  setTimeout(() => {
    const errorSummary = document.querySelectorAll('.govuk-error-summary')
    errorSummary.forEach(summary => {
      wrapPageError(summary)
    })
  }, 300)
})
