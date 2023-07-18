import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getContent } from '../../content/site'

const content = getContent('heading')
const appContent = getContent('app')

const Header = () => {
  const router = useRouter()
  const [jsEnabled, setJsEnabled] = useState(false)
  const [navToggled, setNavToggled] = useState(false)

  useEffect(() => {
    setJsEnabled(true)
  }, [])

  const toggleNav = (e) => {
    e.preventDefault()
    setNavToggled(!navToggled)
  }

  return (
    <header class='govuk-header app-header' role='banner' data-module='govuk-header'>
      <div className='govuk-header__container govuk-width-container'>
        <div className='govuk-header__logo'>
          <a href='/' class='govuk-header__link govuk-header__link--homepage'>
            <span class='govuk-header__logotype'>
              <img src='/assets/images/crest.png' alt='Department for Education crest' class='govuk-header__logotype-crown-fallback-image' />
              <span class='govuk-header__logotype-text'>
                Department for Education |&nbsp;
              </span>
            </span>
            <span class='govuk-header__product-name'>
              {appContent.portalName}
            </span>
          </a>
        </div>
        <a href='#main-content' className='govuk-skip-link'>
          {content.skipToMain}
        </a>
        <div className='govuk-header__content'>
          <button
            type='button'
            className={'govuk-header__menu-button' + (jsEnabled ? ' govuk-js-header-toggle' : '') + (navToggled ? ' govuk-header__menu-button--open' : '')}
            aria-controls='navigation'
            onClick={toggleNav}
            aria-label={content.menuA11y}
            aria-expanded={navToggled}
          >
            {content.menu}
          </button>
          <nav>
            <ul
              id='navigation'
              className={'govuk-header__navigation' + (jsEnabled ? ' govuk-js-header__navigation' : '') + (navToggled ? ' govuk-header__navigation--open' : '')}
              aria-label={content.navigationA11y}
            >
              {content.navigation.map((nav) => {
                return (
                  <li className={`govuk-header__navigation-item ${router.pathname.includes(nav.url) ? 'govuk-header__navigation-item--active' : ''}`} key={nav.title}>
                    <Link href={nav.url} passHref>
                      <a href={nav.url} className='govuk-header__link'>{nav.title}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
