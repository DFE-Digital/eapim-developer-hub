import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = ({ title, items }) => {
  const router = useRouter()

  return (
    <nav tabIndex='0'>
      {title && <h5 className='govuk-visually-hidden'>{title} navigation</h5>}
      <ul>
        {items.map((item) => {
          const isActive = router.asPath === item.url

          if (!item.href) {
            return (
              <li key={item.title}>
                <a href={item.url} className={(isActive ? 'active' : '') + (item.className ? item.className : '')}>{item.title}</a>
              </li>
            )
          }

          return (
            <li key={item.title}>
              <Link as={item.url} href={item.href} passHref>
                <a href={item.url} className={(isActive ? 'active' : '') + (item.className ? item.className : '')}>{item.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
