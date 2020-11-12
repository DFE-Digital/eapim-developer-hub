if (!window.Element.prototype.matches) {
  window.Element.prototype.matches =
    window.Element.prototype.msMatchesSelector ||
    window.Element.prototype.webkitMatchesSelector
}

if (!window.Element.prototype.closest) {
  window.Element.prototype.closest = function (s) {
    var el = this

    do {
      if (window.Element.prototype.matches.call(el, s)) return el
      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)
    return null
  }
}

const main = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

main(() => {
  const container = document.getElementById('api')

  if (container) {
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
    const continueBtn = container.querySelector('#continue')
    const cancelBtn = container.querySelector('#cancel')
    const pageErrors = container.querySelectorAll('.error.pageLevel')

    if (create) create.parentNode.removeChild(create)
    if (continueBtn) continueBtn.classList.add('govuk-!-margin-right-1')
    if (cancelBtn) cancelBtn.classList.add('govuk-button--secondary')

    inputGroups.forEach(group => group.classList.add('govuk-form-group'))
    attrEntry.forEach(group => group.classList.add('govuk-form-group'))
    labels.forEach(label => label.classList.add('govuk-label'))
    inputs.forEach(input => input.classList.add('govuk-input'))
    buttons.forEach(button => button.classList.add('govuk-button'))
    p.forEach(ptag => ptag.classList.add('govuk-body'))
    anchors.forEach(anchor => anchor.classList.add('govuk-link'))

    intros.forEach(intro => {
      intro.style.display = 'none'
    })

    dividers.forEach(divider => {
      divider.style.display = 'none'
    })

    pageErrors.forEach(error => {
      const copy = error.innerText.trim()
      error.innerText = null

      const h2 = document.createElement('h2')
      h2.classList.add('govuk-error-summary__title')
      h2.innerText = 'There is a problem'
      error.appendChild(h2)

      const p = document.createElement('p')
      p.classList.add('govuk-body')
      p.classList.add('govuk-!-margin-bottom-2')
      p.innerText = copy

      error.appendChild(p)

      error.classList.add('govuk-error-summary')
    })
  }
})
