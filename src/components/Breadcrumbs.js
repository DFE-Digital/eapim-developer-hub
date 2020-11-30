import React from 'react'

const Breadcrumbs = ({ items }) => {
  if (!items) return null

  const backLink = items.find(item => item.back ? item : false)

  if (backLink) {
    return <a className='govuk-back-link' href={backLink.href}>Back<span className='govuk-visually-hidden'> {backLink.back}</span></a>
  }

  const lastIndex = items.length - 1

  return (
    <div className='govuk-breadcrumbs'>
      <ol className='govuk-breadcrumbs__list'>
        <li className='govuk-breadcrumbs__list-item'>
          <a className='govuk-breadcrumbs__link' href='/'>Home</a>
        </li>
        {items.map((item, index) => {
          if (lastIndex === index) {
            return <li className='govuk-breadcrumbs__list-item capitalize' aria-current='page' key={item.title + index}>{item.title}</li>
          }

          return (
            <li className='govuk-breadcrumbs__list-item capitalize' key={item.title + index}>
              <a className='govuk-breadcrumbs__link' href={item.href}>{item.title}</a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Breadcrumbs
