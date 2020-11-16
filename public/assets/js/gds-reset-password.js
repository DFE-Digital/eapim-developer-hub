const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

function removeElement (id) {
  const elem = document.getElementById(id)
  return elem.parentNode.removeChild(elem)
}

const pageLevels = Array.from(document.querySelectorAll('.pageLevel'))
const requiredPageLevel = document.querySelector('#requiredFieldMissing')

const formGroupError = (entry, action) => {
  const parent = entry.parentNode
  const input = entry.nextElementSibling

  if (action === 'add') {
    parent.classList.add('govuk-form-group--error')
    input.classList.add('govuk-input--error')
    entry.classList.add('govuk-error-message')
  }

  if (action === 'remove') {
    parent.classList.remove('govuk-form-group--error')
    input.classList.remove('govuk-input--error')
    entry.classList.remove('govuk-error-message')
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

const passwordEntryMismatchObserverCallback = (mutations) => {
  mutations.forEach(mutation => {
    document.querySelectorAll('.Password')[0].querySelector('.itemLevel').innerText = 'Enter your old password'
    document.querySelectorAll('.Password')[1].querySelector('.itemLevel').innerText = 'Enter your new password'
    document.querySelectorAll('.Password')[2].querySelector('.itemLevel').innerText = 'Enter your new password again'
  })
}

const observerCallback = (mutations, id, label) => {
  mutations.forEach(mutation => {
    const entry = mutation.target

    /**
     * Remove form group error
     */
    if (entry.innerText === '') {
      formGroupError(entry, 'remove')
      removeElement('link-' + id)
      return false
    }

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

const oldPasswordObserverCallback = (mutations) => observerCallback(mutations, 'oldPassword', 'old password')
const newPasswordObserverCallback = (mutations) => observerCallback(mutations, 'newPassword', 'new password')
const reenterPasswordObserverCallback = (mutations) => observerCallback(mutations, 'reenterPassword', 'new password again')

ready(() => {
  const container = document.getElementById('api')

  const passwordEntryMismatchObserver = new window.MutationObserver(passwordEntryMismatchObserverCallback)
  const oldPasswordObserver = new window.MutationObserver(oldPasswordObserverCallback)
  const newPasswordObserver = new window.MutationObserver(newPasswordObserverCallback)
  const reenterPasswordObserver = new window.MutationObserver(reenterPasswordObserverCallback)

  if (container) {
    passwordEntryMismatchObserver.observe(document.querySelector('#passwordEntryMismatch'), { attributes: true })
    oldPasswordObserver.observe(document.querySelectorAll('.Password')[0].querySelector('.itemLevel'), { childList: true })
    newPasswordObserver.observe(document.querySelectorAll('.Password')[1].querySelector('.itemLevel'), { childList: true })
    reenterPasswordObserver.observe(document.querySelectorAll('.Password')[2].querySelector('.itemLevel'), { childList: true })
  }
})
