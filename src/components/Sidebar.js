import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Sidebar = ({ title, items }) => {
  const router = useRouter()
  const navItems = Object.keys(items)

  return (
    <nav tabIndex='0'>
      {title && <h5 className='govuk-visually-hidden'>{title} navigation</h5>}
      <ul>
        {navItems.map((item) => {
          const href = items[item].Url
          const isActive = router.asPath === href

          return (
            <li key={item}>
              <Link as={href} href={href}>
                <a href={href} className={isActive ? 'active' : ''}>{items[item].Page}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
