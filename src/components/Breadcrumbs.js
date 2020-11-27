import React from 'react'

const builder = (router) => {
  const urlParts = router.asPath.split('/')
  const parent = urlParts[1]
  const childs = urlParts.slice(2)

  const items = [{ text: urlParts[1], href: `/${urlParts[1]}` }]

  if (childs.length) {
    childs.map(item => {
      items.push({ text: item.replace(/-/g, ' '), href: `/${parent}/${item}` })
    })
  }

  return items
}

const Breadcrumbs = ({ router, back }) => {
  if (!router) return null

  if (back) {
    return <a className='govuk-back-link' href={`/${router.asPath.split('/')[1]}`}>Back<span className='govuk-visually-hidden'> {back}</span></a>
  }

  const items = builder(router)
  const lastIndex = items.length - 1

  return (
    <div className='govuk-breadcrumbs'>
      <ol className='govuk-breadcrumbs__list'>
        <li className='govuk-breadcrumbs__list-item'>
          <a className='govuk-breadcrumbs__link' href='/'>Home</a>
        </li>
        {items.map((item, index) => {
          if (lastIndex === index) {
            return <li className='govuk-breadcrumbs__list-item capitalize' aria-current='page' key={item.text + index}>{item.text}</li>
          }

          return (
            <li className='govuk-breadcrumbs__list-item capitalize' key={item.text + index}>
              <a className='govuk-breadcrumbs__link' href={item.href}>{item.text}</a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Breadcrumbs
