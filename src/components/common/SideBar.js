import React from 'react'
import SidebarLink from './SidebarLink'

const SideBar = ({ nav, loggedIn }) => {
  return (
    <nav>
      <ul>
        {Object.keys(nav).map((item, i) => {
          if (!nav[item].Secure || (nav[item].Secure && loggedIn)) {
            return (
              <li key={i}>
                <SidebarLink href={nav[item].Url}>
                  <a>
                    <span>{nav[item].Page}</span>
                  </a>
                </SidebarLink>
              </li>
            )
          }
        })}
      </ul>
    </nav>
  )
}

export default SideBar
