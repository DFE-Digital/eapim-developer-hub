const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

const wrapForgotPassword = (toWrap) => {
  const wrapper = document.createElement('p')
  wrapper.classList.add('govuk-body')
  wrapper.classList.add('govuk-!-margin-top-2')
  toWrap.parentNode.appendChild(wrapper)
  return wrapper.appendChild(toWrap)
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
        if (mutated.getAttribute('style') === 'display: block;' || mutated.classList.contains('show')) {
          const pBody = mutated.querySelector('.govuk-body')
          if (pBody) pBody.classList.add('govuk-error-message')
          mutated.closest('.govuk-form-group').classList.add('govuk-form-group--error')
        } else {
          mutated.closest('.govuk-form-group').classList.remove('govuk-form-group--error')
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
    const create = container.querySelector('.create')
    const verificationInfoText = container.querySelectorAll('.verificationInfoText')
    const verificationErrorText = container.querySelectorAll('.verificationErrorText')
    const continueBtn = container.querySelector('#continue')
    const cancelBtn = container.querySelector('#cancel')
    const pageErrors = container.querySelectorAll('.error.pageLevel')
    const itemErrors = container.querySelectorAll('.error.itemLevel')

    if (create) create.parentNode.removeChild(create)
    if (continueBtn) continueBtn.classList.add('govuk-!-margin-right-1')
    if (cancelBtn) cancelBtn.classList.add('govuk-button--secondary')

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
    verificationErrorText.forEach(text => text.classList.add('govuk-inset-text'))
    pageErrors.forEach(error => {
      const eBody = error.querySelector('.govuk-body')
      if (eBody) eBody.classList.add('govuk-!-margin-bottom-0')
      error.classList.add('govuk-error-summary')
    })
    itemErrors.forEach(error => {
      const eBody = error.querySelector('.govuk-body')
      if (!eBody) {
        const copy = error.innerText
        error.innerText = null
        const newCopy = document.createElement('p')
        newCopy.innerText = copy
        newCopy.classList.add('govuk-body')
        error.appendChild(newCopy)
      }
    })
  }

  setTimeout(() => {
    const errorSummary = document.querySelectorAll('.govuk-error-summary')
    errorSummary.forEach(summary => {
      wrapPageError(summary)
    })
  }, 300)

  setTimeout(() => {
    const forgotPassword = document.getElementById('forgotPassword')
    const moveTo = document.querySelectorAll('.entry-item')[1]

    if (forgotPassword) {
      moveTo.appendChild(forgotPassword)
      wrapForgotPassword(forgotPassword)
    }
  }, 100)
})
