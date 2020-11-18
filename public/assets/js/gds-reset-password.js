const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

function getErrorSibling (entry) {
  const parent = entry.parentNode
  return parent.querySelector('.govuk-error-message')
}

const pageLevels = Array.from(document.querySelectorAll('.pageLevel'))
const requiredPageLevel = document.querySelector('#requiredFieldMissing')

const formGroupError = (entry, action) => {
  const parent = entry.parentNode
  const input = entry.nextElementSibling

  if (action === 'add') {
    parent.classList.add('govuk-form-group--error')
    input.classList.add('govuk-input--error')
    // entry.classList.add('govuk-error-message')
  }

  if (action === 'remove') {
    parent.classList.remove('govuk-form-group--error')
    input.classList.remove('govuk-input--error')
    // entry.classList.remove('govuk-error-message')
  }
}

const createErrorLink = (id, html) => {
  const a = document.createElement('a')
  a.classList.add('govuk-link')
  a.setAttribute('href', '#' + id)
  a.setAttribute('id', 'link-' + id)

  const p = document.createElement('p')
  p.classList.add('govuk-error-message')
  p.innerText = html.innerText

  a.appendChild(p)
  return a
}

const observerCallback = (mutations, id, label) => {
  mutations.forEach(mutation => {
    const entry = mutation.target

    /**
     * Remove form group error
     */
    // if (entry.innerText === '') {
    // formGroupError(entry, 'remove')
    // removeElement('link-' + id)
    // return false
    // }

    const errorMessage = getErrorSibling(entry)

    /**
     * Get the summary that is visible
     */
    let visiblePageLevel = pageLevels.find(node => node.style.display === 'block')

    /**
     * If there had been an error with the values submitted to B2C, and the user makes a field error,
     * hide the B2C claims error summary and show the required field summary
     */
    if (visiblePageLevel && visiblePageLevel.getAttribute('id') === 'claimVerificationServerError') {
      visiblePageLevel.style.display = 'none'

      visiblePageLevel = requiredPageLevel
      visiblePageLevel.style.display = 'block'
    }

    /**
     * Changing the text of the entry will cause the mutation to loop.
     * We only want to chane text once
     */
    if (entry.innerText.indexOf('{ClaimType}') >= 0) {
      entry.innerText = entry.innerText.replace(/{ClaimType}/g, label)
    }

    if (entry.innerText !== '') errorMessage.innerText = entry.innerText

    /**
     * Only append error link if doesn't exist
     */
    if (visiblePageLevel && !visiblePageLevel.querySelector('#link-' + id)) {
      const a = createErrorLink(id, entry.cloneNode(true))
      visiblePageLevel.appendChild(a)
    }

    /**
     * Show form group error
     */
    formGroupError(entry, 'add')

    console.log(mutation.type)
    console.log(entry)
    console.log('\n')
  })
}

const verificationCallback = (mutations) => {
  mutations.forEach(mutation => {
    // const entry = mutation.target

    const verificationSummary = document.querySelector('.verificationErrorTest')
    const copy = verificationSummary.querySelector('#emailVerificationControl_error_message').innerText
    verificationSummary.querySelector('#emailVerificationControl_error_message').innerText = ''

    let p = verificationSummary.querySelector('p')

    if (!p) {
      p = document.createElement('p')
      p.classList.add('govuk-body')
      p.classList.add('govuk-!-margin-bottom-2')
      p.innerText = copy
      verificationSummary.appendChild(p)
    }

    verificationSummary.style.display = 'block'

    document.querySelector('li.email .itemLevel').innerText = 'Enter a valid email address'
  })
}

const emailObserverCallback = (mutations) => observerCallback(mutations, 'email', 'email address')
const verificationObserverCallback = (mutations) => verificationCallback(mutations)

ready(() => {
  const container = document.getElementById('api')

  const verificationSummary = document.querySelector('.verificationErrorTest')
  verificationSummary.classList.add('govuk-error-summary')

  const h2 = document.createElement('h2')
  h2.classList.add('govuk-error-summary__title')
  h2.innerText = 'There is a problem'
  verificationSummary.appendChild(h2)

  const emailObserver = new window.MutationObserver(emailObserverCallback)
  const verificationObserver = new window.MutationObserver(verificationObserverCallback)

  document.querySelectorAll('.itemLevel').forEach(function (item) {
    const parent = item.parentNode
    const error = document.createElement('div')
    error.classList.add('govuk-error-message')
    parent.prepend(error)
  })

  if (container) {
    emailObserver.observe(document.querySelector('li.email .itemLevel'), { childList: true })
    verificationObserver.observe(document.querySelector('#emailVerificationControl_error_message'), { childList: true })
  }
})
