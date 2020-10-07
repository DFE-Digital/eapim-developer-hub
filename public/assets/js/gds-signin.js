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

const createErrorLink = (id, html) => {
  const a = document.createElement('a')
  a.classList.add('govuk-link')
  a.setAttribute('href', id)
  a.append(html)
  return a
}

const showFormGroupError = (inputId) => {
  document.querySelector(inputId).closest('.govuk-form-group').classList.add('govuk-form-group--error')
}

const showFieldError = (inputId, type) => {
  const itemLevel = document.querySelector(inputId).closest('.entry-item').querySelector('.itemLevel')

  const p = itemLevel.querySelector('p')
  p.classList.add('govuk-error-message')
  p.innerHTML = 'Enter your ' + type

  itemLevel.style.display = 'block'

  document.querySelector(inputId).classList.add('highlightError')
}

const showPageLevel = () => {
  document.querySelector('.pageLevel').style.display = 'block'
}

const hidePageLevel = () => {
  document.querySelector('.pageLevel').style.display = 'none'
}

const summaryErrorMessageCallback = (mutations) => {
  mutations.forEach(mutation => {
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

const emailErrorMessageCallback = (mutations) => {
  mutations.forEach(mutation => {
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

const passwordErrorMessageCallback = (mutations) => {
  mutations.forEach(mutation => {
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

ready(() => {
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

    const pageError = container.querySelector('.error.pageLevel')
    pageError.classList.add('govuk-error-summary')

    const heading = document.createElement('h2')
    heading.innerText = 'There is a problem'
    heading.classList.add('govuk-error-summary__title')

    pageError.prepend(heading)

    const types = ['error-summary-email', 'error-summary-password']

    types.forEach(type => {
      const body = document.createElement('div')
      body.classList.add(type)
      pageError.append(body)
    })
  }

  setTimeout(() => {
    // const create = container.querySelector('.create')
    const forgotPassword = document.getElementById('forgotPassword')
    const moveTo = document.querySelectorAll('.entry-item')[1]

    // create.remove()
    moveTo.appendChild(forgotPassword)
    wrapForgotPassword(forgotPassword)
  }, 100)
})
