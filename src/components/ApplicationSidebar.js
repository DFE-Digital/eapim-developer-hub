import React from 'react'
import { useRouter } from 'next/router'

const ApplicationSidebar = ({ title, items, data }) => {
  const router = useRouter()
  const navItems = Object.keys(items)

  const { application } = data

  return (
    <nav tabIndex='0'>
      {title && <h5 className='govuk-visually-hidden'>{title} navigation</h5>}
      <ul>
        {navItems.map((item, index) => {
          const href = `/applications/${application.applicationId}${items[item].Url}`
          const isDeleteApplication = index === navItems.length - 1

          const isActive = router.asPath === href

          return (
            <li key={item}>
              <a href={href} className={(isDeleteApplication ? 'warning' : '') + (isActive ? 'active' : '')}>{items[item].Page}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default ApplicationSidebar
