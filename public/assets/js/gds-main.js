/* eslint-disable no-prototype-builtins */
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

if (window.NodeList && !window.NodeList.prototype.forEach) {
  window.NodeList.prototype.forEach = window.Array.prototype.forEach
}
if (window.HTMLCollection && !window.HTMLCollection.prototype.forEach) {
  window.HTMLCollection.prototype.forEach = window.Array.prototype.forEach
}

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return
    }
    window.Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append () {
        var argArr = window.Array.prototype.slice.call(arguments)
        var docFrag = document.createDocumentFragment()

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof window.Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(window.String(argItem)))
        })

        this.appendChild(docFrag)
      }
    })
  })
})([window.Element.prototype, window.Document.prototype, window.DocumentFragment.prototype]);

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend () {
        var argArr = Array.prototype.slice.call(arguments)
        var docFrag = document.createDocumentFragment()

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof window.Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
        })

        this.insertBefore(docFrag, this.firstChild)
      }
    })
  })
})([window.Element.prototype, window.Document.prototype, window.DocumentFragment.prototype])

const main = function (callback) {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

main(function () {
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

    inputGroups.forEach(function (group) { group.classList.add('govuk-form-group') })
    attrEntry.forEach(function (group) { group.classList.add('govuk-form-group') })
    labels.forEach(function (label) { label.classList.add('govuk-label') })
    inputs.forEach(function (input) { input.classList.add('govuk-input') })
    buttons.forEach(function (button) { button.classList.add('govuk-button') })
    p.forEach(function (ptag) { ptag.classList.add('govuk-body') })
    anchors.forEach(function (anchor) { anchor.classList.add('govuk-link') })

    intros.forEach(function (intro) {
      intro.style.display = 'none'
    })

    dividers.forEach(function (divider) {
      divider.style.display = 'none'
    })

    pageErrors.forEach(function (error) {
      const copy = error.innerText.trim()
      error.innerText = ''

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
