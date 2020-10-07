const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

const requiredFieldMissingTitle = 'A required field is missing. Please fill out all required fields and try again.'
const fieldIncorrectTitle = 'One or more fields are filled out incorrectly. Please check your entries and try again.'
const passwordEntryMismatchTitle = 'The password entry fields do not match. Please enter the same password in both fields and try again.'

const wrapPageError = (toWrap) => {
  const content = toWrap.querySelector('.govuk-body')
  const heading = document.createElement('h2')
  heading.innerText = 'There is a problem'
  heading.classList.add('govuk-error-summary__title')
  toWrap.insertBefore(heading, content)
  return toWrap
}

const showFormGroupError = (inputId) => {
  document.querySelector(inputId).classList.add('govuk-input--error')
  document.querySelector(inputId).closest('.govuk-form-group').classList.add('govuk-form-group--error')
}

const removeFormGroupError = (inputId) => {
  document.querySelector(inputId).classList.remove('govuk-input--error')
  document.querySelector(inputId).closest('.govuk-form-group').classList.remove('govuk-form-group--error')
}

const showPageLevel = () => {
  document.querySelector('#requiredFieldMissing p').innerText = requiredFieldMissingTitle
  document.querySelector('#requiredFieldMissing').style.display = 'block'
}

const createErrorLink = (id, html) => {
  const a = document.createElement('a')
  a.classList.add('govuk-link')
  a.setAttribute('href', id)
  a.appendChild(html)
  return a
}

const createErrorMessage = (html, text) => {
  const copy = html.innerText.replace(/{ClaimType}/, text)
  html.innerText = null

  const span = document.createElement('span')
  span.innerText = copy
  span.classList.add('govuk-error-message')

  return span
}

const pageSummaryObserver = (mutations, type) => {
  mutations.forEach(mutation => {
    if (mutation.target.style.display === 'block') {
      if (type === 'claimVerificationServerError') {
        const text = mutation.target.innerText
        const p = document.createElement('p')
        p.classList.add('govuk-body')
        p.classList.add('govuk-!-margin-bottom-0')
        p.innerText = text

        mutation.target.innerHTML = ''
        mutation.target.appendChild(p)

        removeFormGroupError('#newPassword')
        removeFormGroupError('#reenterPassword')
      }

      if (type === 'fieldIncorrect') {
        const requiredFieldMissing = document.querySelector('#requiredFieldMissing')
        requiredFieldMissing.querySelector('p').innerText = fieldIncorrectTitle
        requiredFieldMissing.style.display = 'block'
        document.querySelector('#fieldIncorrect').style.display = 'none'
        showFormGroupError('#newPassword')
        showFormGroupError('#reenterPassword')
      }

      if (type === 'passwordEntryMismatch') {
        const requiredFieldMissing = document.querySelector('#requiredFieldMissing')
        requiredFieldMissing.querySelector('p').innerText = passwordEntryMismatchTitle
        requiredFieldMissing.style.display = 'block'
        document.querySelector('#passwordEntryMismatch').style.display = 'none'

        document.querySelector('#newPassword').closest('.attrEntry').querySelector('.itemLevel').innerHTML = ''
        document.querySelector('#newPassword').closest('.attrEntry').querySelector('.itemLevel').innerText = 'Passwords do not match'

        showFormGroupError('#newPassword')
        showFormGroupError('#reenterPassword')
      }
    }
  })
}

const passwordEntryMismatchCallback = (mutations) => pageSummaryObserver(mutations, 'passwordEntryMismatch')
const fieldIncorrectCallback = (mutations) => pageSummaryObserver(mutations, 'fieldIncorrect')
const claimVerificationServerErrorCallback = (mutations) => pageSummaryObserver(mutations, 'claimVerificationServerError')

const observerCallback = (mutations, type, text) => {
  mutations.forEach(mutation => {
    const entry = mutation.target

    const mutated = entry.innerText !== '' ? entry : false

    if (entry.innerText === '' && document.querySelector('.error-summary-' + type).innerHTML !== '') {
      removeFormGroupError('#' + type)
      document.querySelector('.error-summary-' + type).innerHTML = ''
    }

    if (mutated && !mutated.querySelector('span')) {
      if (!mutated.classList.contains('govuk-error-message')) {
        const span = createErrorMessage(mutated, text)
        mutated.appendChild(span)
      }

      const a = createErrorLink('#' + type, mutated.cloneNode(true))
      showFormGroupError('#' + type)
      document.querySelector('.error-summary-' + type).innerHTML = ''
      document.querySelector('.error-summary-' + type).appendChild(a)
      showPageLevel()
    }
  })
}

const givenNameCallback = (mutations) => observerCallback(mutations, 'givenName', 'first name')
const surnameCallback = (mutations) => observerCallback(mutations, 'surname', 'last name')
const emailCallback = (mutations) => observerCallback(mutations, 'email', 'email')
const passwordCallback = (mutations) => observerCallback(mutations, 'newPassword', 'new password')
const reenterPasswordCallback = (mutations) => observerCallback(mutations, 'reenterPassword', 'new password again')
// const organisationCallback = (mutations) => observerCallback(mutations, 'extension_OrganizationName', 'organisation')

ready(() => {
  const container = document.getElementById('api')
  const options = {
    attributes: true,
    characterData: true,
    childList: true,
    attributeOldValue: false,
    characterDataOldValue: false
  }

  const passwordEntryMismatchObserver = new window.MutationObserver(passwordEntryMismatchCallback)
  const fieldIncorrectObserver = new window.MutationObserver(fieldIncorrectCallback)
  const claimVerificationServerErrorObserver = new window.MutationObserver(claimVerificationServerErrorCallback)

  const givenNameObserver = new window.MutationObserver(givenNameCallback)
  const surnameObserver = new window.MutationObserver(surnameCallback)
  const emailObserver = new window.MutationObserver(emailCallback)
  const passwordObserver = new window.MutationObserver(passwordCallback)
  const reenterPasswordObserver = new window.MutationObserver(reenterPasswordCallback)
  // const organisationObserver = new window.MutationObserver(organisationCallback)

  if (container) {
    passwordEntryMismatchObserver.observe(document.querySelector('#passwordEntryMismatch'), { attributes: true })
    fieldIncorrectObserver.observe(document.querySelector('#fieldIncorrect'), { attributes: true })
    claimVerificationServerErrorObserver.observe(document.querySelector('#claimVerificationServerError'), { attributes: true })

    givenNameObserver.observe(document.querySelector('#givenName').closest('.attrEntry').querySelector('.itemLevel'), options)
    surnameObserver.observe(document.querySelector('#surname').closest('.attrEntry').querySelector('.itemLevel'), options)
    emailObserver.observe(document.querySelector('#email').closest('.attrEntry').querySelector('.itemLevel'), options)
    passwordObserver.observe(document.querySelector('#newPassword').closest('.attrEntry').querySelector('.itemLevel'), options)
    reenterPasswordObserver.observe(document.querySelector('#reenterPassword').closest('.attrEntry').querySelector('.itemLevel'), options)
    // organisationObserver.observe(document.querySelector('#extension_OrganizationName').closest('.attrEntry').querySelector('.itemLevel'), options)

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
      newCopy.classList.add('govuk-!-margin-bottom-2')
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

    const passwordInput = document.querySelector('#newPassword')
    const passwordHelperText = document.createElement('span')
    passwordHelperText.classList.add('govuk-hint')
    passwordHelperText.innerText = passwordInput.getAttribute('title')

    const passwordInputParent = passwordInput.closest('.attrEntry')
    passwordInputParent.insertBefore(passwordHelperText, passwordInput)

    const pageError = document.querySelector('#requiredFieldMissing')
    const types = [
      'error-summary-givenName',
      'error-summary-surname',
      'error-summary-email',
      'error-summary-newPassword',
      'error-summary-reenterPassword',
      'error-summary-extension_OrganizationName'
    ]

    types.forEach(type => {
      const body = document.createElement('div')
      body.classList.add(type)
      pageError.appendChild(body)
    })

    const termsEl = document.createElement('p')
    termsEl.classList.add('govuk-body')
    termsEl.innerHTML = '<p>By creating an account you agree to our ' +
      '<a href="#{ROOT_URL}#/documentation/terms-of-use">terms and conditions,</a> ' +
      '<a href="#{ROOT_URL}#/privacy-policy">privacy policy</a> and ' +
      '<a href="#{ROOT_URL}#/cookies">cookie policy</a>.' +
    '</p>'

    const form = document.querySelector('#attributeList')
    form.parentNode.insertBefore(termsEl, form.nextSibling)
  }

  setTimeout(() => {
    const errorSummary = document.querySelectorAll('.govuk-error-summary')
    errorSummary.forEach(summary => {
      wrapPageError(summary)
    })
  }, 300)
})
