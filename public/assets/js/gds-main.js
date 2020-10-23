const ready = (callback) => {
  if (document.readyState !== 'loading') callback()
  else document.addEventListener('DOMContentLoaded', callback)
}

ready(() => {
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
  }
})
