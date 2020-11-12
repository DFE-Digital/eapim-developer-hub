const ready = function (callback) {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

const wrapForgotPassword = function (toWrap) {
  const wrapper = document.createElement('p')
  wrapper.classList.add('govuk-body')
  wrapper.classList.add('govuk-!-margin-top-2')
  toWrap.parentNode.appendChild(wrapper)
  return wrapper.appendChild(toWrap)
}

const createErrorLink = function (id, html) {
  const a = document.createElement('a')
  a.classList.add('govuk-link')
  a.setAttribute('href', id)
  a.append(html)
  return a
}

const showFormGroupError = function (inputId) {
  document.querySelector(inputId).closest('.govuk-form-group').classList.add('govuk-form-group--error')
}

const showFieldError = function (inputId, type) {
  const itemLevel = document.querySelector(inputId).closest('.entry-item').querySelector('.itemLevel')

  const p = itemLevel.querySelector('p')
  p.classList.add('govuk-error-message')
  p.innerHTML = 'Enter your ' + type

  itemLevel.style.display = 'block'

  document.querySelector(inputId).classList.add('highlightError')
}

const showPageLevel = function () {
  document.querySelector('.pageLevel').style.display = 'block'
}

const hidePageLevel = function () {
  document.querySelector('.pageLevel').style.display = 'none'
}

const summaryErrorMessageCallback = function (mutations) {
  mutations.forEach(function (mutation) {
    const entry = mutation.target

    if (entry.style.display === 'block') {
      if (document.querySelector('.error-summary-email').innerHTML === '' && document.querySelector('.error-summary-password').innerHTML === '') {
        showFormGroupError('#signInName')
        showFieldError('#signInName', 'email')
        showFormGroupError('#password')
        showFieldError('#password', 'password')
      }
    }
  })
}

const emailErrorMessageCallback = function (mutations) {
  mutations.forEach(function (mutation) {
    const entry = mutation.target
    const mutated = entry.querySelector('.govuk-body') ? entry.querySelector('.govuk-body') : (entry.tagName === 'P' && entry)

    if (mutated) {
      if (!mutated.classList.contains('govuk-error-message') && mutated.innerText !== '') {
        mutated.classList.add('govuk-error-message')
      }

      if (mutated.innerText !== '') {
        const a = createErrorLink('#signInName', mutated.cloneNode(true))

        showFormGroupError('#signInName')
        document.querySelector('.error-summary-email').innerHTML = ''
        document.querySelector('.error-summary-email').append(a)
        showPageLevel()
      }
    }

    if (entry.style.display === 'none') {
      entry.closest('.govuk-form-group').classList.remove('govuk-form-group--error')
      mutated.innerText = ''
      document.querySelector('.error-summary-email').innerHTML = ''
    }

    if (document.querySelector('.error-summary-email').innerHTML === '' && document.querySelector('.error-summary-password').innerHTML === '') {
      hidePageLevel()
    }
  })
}

const passwordErrorMessageCallback = function (mutations) {
  mutations.forEach(function (mutation) {
    const entry = mutation.target
    const mutated = entry.querySelector('.govuk-body') ? entry.querySelector('.govuk-body') : (entry.tagName === 'P' && entry)

    if (mutated) {
      if (!mutated.classList.contains('govuk-error-message') && mutated.innerText !== '') {
        mutated.classList.add('govuk-error-message')
      }

      if (mutated.innerText !== '') {
        const a = createErrorLink('#password', mutated.cloneNode(true))
        showFormGroupError('#password')
        document.querySelector('.error-summary-password').innerHTML = ''
        document.querySelector('.error-summary-password').append(a)
        showPageLevel()
      }
    }

    if (entry.style.display === 'none') {
      entry.closest('.govuk-form-group').classList.remove('govuk-form-group--error')
      document.querySelector('.error-summary-password').innerHTML = ''
    }

    if (document.querySelector('.error-summary-email').innerHTML === '' && document.querySelector('.error-summary-password').innerHTML === '') {
      hidePageLevel()
    }
  })
}

ready(function () {
  const container = document.getElementById('api')
  const options = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
  }

  const summaryObserver = new window.MutationObserver(summaryErrorMessageCallback)
  const emailObserver = new window.MutationObserver(emailErrorMessageCallback)
  const passwordObserver = new window.MutationObserver(passwordErrorMessageCallback)

  if (container) {
    summaryObserver.observe(container.querySelector('.pageLevel'), { attributes: true })
    emailObserver.observe(container.querySelector('#signInName').closest('.entry-item').querySelector('.itemLevel'), options)
    passwordObserver.observe(container.querySelector('#password').closest('.entry-item').querySelector('.itemLevel'), options)

    const pageError = container.querySelector('.error.pageLevel')
    const types = ['error-summary-email', 'error-summary-password']

    types.forEach(function (type) {
      const body = document.createElement('div')
      body.classList.add(type)
      pageError.append(body)
    })
  }

  /** Move forgot password link to below input field */
  setTimeout(function () {
    const forgotPassword = document.getElementById('forgotPassword')
    const moveTo = document.querySelectorAll('.entry-item')[1]

    moveTo.appendChild(forgotPassword)
    wrapForgotPassword(forgotPassword)
  }, 100)
})
