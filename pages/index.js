import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Helmet } from 'react-helmet'
import Link from 'next/link'
import ContentBuilder from 'components/ContentBuilder'
import Header from 'components/Header'
import CookieBanner from 'components/CookieBanner'
import PhaseBanner from 'components/PhaseBanner'
import AuthNavigation from 'components/AuthNavigation'
import Footer from 'components/Footer'
import { useAuth } from '../providers/AuthProvider'
import { ReactSVG } from 'react-svg'
import { useInsights, useCookie } from 'hooks'

import { getContent } from '../content/home'

const content = getContent('home')

const Home = ({ loggedin }) => {
  const router = useRouter()
  const { user, pageLoaded } = useAuth()
  const [pageView] = useInsights()
  const [bannerCookie, updateCookie] = useState(null)
  const { hasCookie, setCookie } = useCookie()

  useEffect(() => {
    if (router.query.loggedin) router.push('/', '/', { shallow: true })
  }, [])

  useEffect(() => {
    const item = hasCookie('set_banner_message')

    if (!item) {
      setCookie('set_banner_message', 'true')
    } else {
      updateCookie(true)
    }
  }, [])

  useEffect(() => {
    pageView({ name: 'Homepage', url: window.location.href })
  }, [])

  return (
    <>
      {pageLoaded && !bannerCookie && <CookieBanner />}
      <Header />
      <PhaseBanner />
      <div className='govuk-width-container'>
        <div className='service-banner'>
          {loggedin && <span className='govuk-visually-hidden' role='alert' aria-live='assertive'>you are now signed in</span>}
          <AuthNavigation />
        </div>
      </div>
      <main id='main-content'>
        <div className='govuk-panel govuk-panel--confirmation govuk-panel--welcome'>
          <div className='govuk-width-container'>
            <h1 className='govuk-panel__title'>{content.title}</h1>
            <div className='govuk-panel__body'>{content.intro}</div>
            {!user.getToken() && (
              <div className='registerLinks govuk-!-margin-top-9'>
                <a href='/auth/register' className='btn white'>{content.buttons.register}</a>
                <p className='govuk-body'>or <a href='/auth/login' className='govuk-link govuk-!-margin-left-1'><strong>{content.buttons.signin}</strong></a> to the {content.title}.</p>
              </div>
            )}
          </div>
        </div>

        <div className='govuk-width-container homepage-services-container'>
          <div className='homepage-services-section'>
            <div className='homepage-services-text'>
              <h2 className='govuk-heading-m'>{content.sections[0].title}</h2>
              <ContentBuilder sectionNav={false} data={content.sections[0].body} />
            </div>
            <div className='homepage-services-image'>
              <ReactSVG
                role='img'
                src={content.sections[0].svg}
                aria-label={content.sections[0].a11y}
                beforeInjection={(svg) => {
                  const title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
                  title.innerHTML = content.sections[0].a11y
                  svg.prepend(title)
                }}
                fallback={() => <img src={content.sections[0].img} alt={content.sections[0].imgAlt} />}
              />
            </div>
          </div>
          <div className='homepage-services-section'>
            <div className='homepage-services-text'>
              <h2 className='govuk-heading-m'>{content.sections[1].title}</h2>
              <ContentBuilder sectionNav={false} data={content.sections[1].body} />
            </div>
            <div className='homepage-services-image'>
              <ReactSVG
                role='img'
                src={content.sections[1].svg}
                aria-label={content.sections[1].a11y}
                beforeInjection={(svg) => {
                  const title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
                  title.innerHTML = content.sections[1].a11y
                  svg.prepend(title)
                }}
                fallback={() => <img src={content.sections[1].img} alt={content.sections[1].imgAlt} />}
              />
            </div>
          </div>
        </div>

        <div className='govuk-width-container'>
          <div className='govuk-grid-row flex-wrap govuk-!-padding-bottom-9 govuk-!-padding-top-9'>
            {content.columns.map((column) => {
              return (
                <div className='govuk-grid-column-one-third' key={column.heading}>
                  <h3 className='govuk-heading-m govuk-!-margin-bottom-2'>{column.heading}</h3>
                  <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-4' />
                  <ul className='govuk-list'>
                    {column.links.map((link, index) => {
                      return (
                        <li className='govuk-body-s' key={link.url + index}>
                          <Link href={link.url} passHref>
                            <a className='govuk-link'>{link.title}</a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
      <Helmet>
        <title>Home | {content.title}</title>
      </Helmet>
    </>
  )
}

Home.getInitialProps = async ({ req }) => {
  if (req && req.query.loggedin) return { loggedin: true }

  return { status: 200 }
}

export default Home
