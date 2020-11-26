import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import { signInLink, registerLink, signOut } from 'actions/authenticate'
import Content from '../content.json'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import Banner from 'components/common/Banner'
import Footer from 'components/common/Footer'

import { ReactSVG } from 'react-svg'

const page = 'Home'

const Home = ({ user, accountDeleted, router, store, msalConfig, msalRegisterConfig, msalEditProfileConfig }) => {
  useEffect(() => {
    const handleSignOut = async () => {
      await store.__PERSISTOR.purge()
      await signOut(msalConfig)
    }

    if (accountDeleted) handleSignOut()
  }, [])

  const columns = Content[page].Content.Columns

  const { data } = user
  const isLoggedIn = !!(data && data.isAuthed)

  return (
    <>
      <Header />
      <Banner />
      <PhaseBanner />
      <ReturnTo parentPath={router.asPath} />
      <main id='main-content' role='main'>
        <div className='govuk-panel govuk-panel--confirmation govuk-panel--welcome'>
          <div className='govuk-width-container'>
            <h1 className='govuk-panel__title'>{Content[page].Content.Hero.Heading}</h1>
            <div className='govuk-panel__body'>{Content[page].Content.Hero.Intro}</div>
            {!isLoggedIn && (
              <div className='registerLinks govuk-!-margin-top-9'>
                <a href='/auth/register' onClick={(e) => registerLink(e, msalRegisterConfig)} className='btn white'>{Content[page].Content.Hero.Register}</a>
                <p className='govuk-body'>or <a href='/auth/login' onClick={(e) => signInLink(e, msalConfig)} className='govuk-link govuk-!-margin-left-1'><strong>{ ReactHtmlParser(Content[page].Content.Hero.Signin) }</strong></a> to the {Content.PortalName}.</p>
              </div>
            )}
          </div>
        </div>

        <div className='govuk-width-container homepage-services-container'>
          <div className='homepage-services-section'>
            <div className='homepage-services-text'>
              <h2 className='govuk-heading-m'>Browse DfE APIs</h2>
              <p className='govuk-body'>
              You can browse <a href='/apis' className='govuk-link'>public APIs</a> from different sectors including schools, finance and corporate entities.
              </p>
            </div>
            <div className='homepage-services-image'>
              <ReactSVG
                src='/assets/images/hp-apis.svg'
                role='img'
                aria-label='A user-facing page showing a list of public APIs.'
                beforeInjection={(svg) => {
                  const title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
                  title.innerHTML = 'A user-facing page showing a list of public APIs.'
                  svg.prepend(title)
                }}
                fallback={() => <img src='/assets/images/hp-apis.jpg' alt='Browse Department for Education APIs' />}
              />
            </div>
          </div>
          <div className='homepage-services-section'>
            <div className='homepage-services-text'>
              <h2 className='govuk-heading-m'>Integrate your application</h2>
              <p className='govuk-body'>
              Connect your application to an API sandbox environment to begin building your software. When you're ready to go live, ask for production access.
              </p>
              <p className='govuk-body'>
              To get started, read <a href='/documentation' className='govuk-link'>using the Developer Hub</a>.
              </p>
            </div>
            <div className='homepage-services-image'>
              <ReactSVG
                src='/assets/images/hp-int.svg'
                role='img'
                aria-label='A user-facing page showing an application that has subscribed to an API.'
                beforeInjection={(svg) => {
                  const title = document.createElementNS('http://www.w3.org/2000/svg', 'title')
                  title.innerHTML = 'A user-facing page showing an application that has subscribed to an API.'
                  svg.prepend(title)
                }}
                fallback={() => <img src='/assets/images/hp-int.jpg' alt='Integrate your application' />}
              />
            </div>
          </div>
        </div>

        <div className='govuk-width-container'>
          <div className='govuk-grid-row flex-wrap govuk-!-padding-bottom-9 govuk-!-padding-top-9'>
            {columns.map((column, i) => {
              return (
                <div className='govuk-grid-column-one-third' key={i}>
                  <h3 className='govuk-heading-m govuk-!-margin-bottom-2'>{column.Heading}</h3>
                  <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-4' />
                  <ul className='govuk-list'>
                    {column.Links.map((link, x) => {
                      if (link.Page === 'Create an account') {
                        return (
                          <li className='govuk-body-s' key={x}>
                            <Link href={link.Url} passHref>
                              <a className='govuk-link' onClick={(e) => registerLink(e, msalRegisterConfig)}>{link.Page}</a>
                            </Link>
                          </li>
                        )
                      }

                      return (
                        <li className='govuk-body-s' key={x}>
                          <Link href={link.Url} passHref>
                            <a className='govuk-link'>{link.Page}</a>
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
    </>
  )
}

Home.getInitialProps = async ({ req }) => {
  if (req && req.query.account) {
    return {
      accountDeleted: true
    }
  }

  return {
    status: 200
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Home.displayName = page

export { Home }
export default connect(mapStateToProps)(Home)
