import React from 'react'

const Breadcrumbs = ({ items }) => {
  const lastIndex = items.length - 1

  return (
    <div className='govuk-breadcrumbs'>
      <ol className='govuk-breadcrumbs__list'>
        <li className='govuk-breadcrumbs__list-item'>
          <a className='govuk-breadcrumbs__link' href='/'>Home</a>
        </li>
        {items.map((item, index) => {
          if (lastIndex === index && items.length !== 1) {
            return <li className='govuk-breadcrumbs__list-item' aria-current='page' key={item.text + index}>{item.text}</li>
          }

          return (
            <li className='govuk-breadcrumbs__list-item' key={item.text + index}>
              <a className='govuk-breadcrumbs__link' href={item.href}>{item.text}</a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Breadcrumbs
