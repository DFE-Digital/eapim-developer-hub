import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import AccessChecker from 'components/common/AccessChecker'
import { signInLink, registerLink, signOut } from 'actions/authenticate'
import Content from '../content.json'
import ReturnTo from 'components/common/ReturnTo'

const page = 'Home'

class Home extends Component {
   componentDidMount = async () => {
     if (this.props.accountDeleted) {
       await this.props.store.__PERSISTOR.purge()
       await signOut(this.props.msalConfig)
     }
   }

   render () {
     const {
       user: { data }
     } = this.props

     const columns = Content[page].Content.Columns

     let isLoggedIn = false
     if (data && data.isAuthed) isLoggedIn = true

     console.log('accountDeleted', this.props.accountDeleted)
     console.log(data)

     return (
       <Fragment>
         <AccessChecker msalConfig={this.props.msalConfig} />
         <ReturnTo parentPath={this.props.router.asPath} />
         <main id='main-content' role='main'>
          <div className='govuk-panel govuk-panel--confirmation govuk-panel--welcome'>
             <div className='govuk-width-container'>
               <h1 className='govuk-panel__title'>{Content[page].Content.Hero.Heading}</h1>
               <div className='govuk-panel__body'>{Content[page].Content.Hero.Intro}</div>
               {!isLoggedIn && (
                 <div className='registerLinks govuk-!-margin-top-9'>
                   <a href='/auth/register' onClick={(e) => registerLink(e, this.props.msalRegisterConfig)} className='btn white'>{Content[page].Content.Hero.Register}</a>
                   <p className='govuk-body'>or <a href='/auth/login' onClick={(e) => signInLink(e, this.props.msalConfig)} className='govuk-link govuk-!-margin-left-1'><strong>{ ReactHtmlParser(Content[page].Content.Hero.Signin) }</strong></a> to the {Content.PortalName}.</p>
                 </div>
               )}
             </div>
           </div>
          
          <div className='govuk-width-container homepage-services-container'>
            <div className='homepage-services-section'>
              <div className='homepage-services-text'>
                <h3 className='govuk-heading-m'>Browse Department for Education APIs</h3>
                <p className='govuk-body'>
                  Use the DfE Developer Hub to find a number of open APIs, including schools information, finance and corporate entities.  
                </p>
                <p className='govuk-body'>
                  See all the <a href='/apis' className='govuk-link'>public APIs</a> on the Developer Hub.
                </p>
              </div>
              <div className='homepage-services-image'>
                <img alt="Browse the Department for Education APIs" src="/assets/images/hp-apis.jpg" />
              </div>
            </div>
            <div className='homepage-services-section'>
              <div className='homepage-services-text'>
                <h3 className='govuk-heading-m'>Integrate your application</h3>
                <p className='govuk-body'>Connect your application to an APIs sandbox or production environment to begin building your software.</p>
                <p className='govuk-body'>
                  <a href='/applications' className='govuk-link'>Register an application</a> to start developing your software.
                </p>
              </div>
              <div className='homepage-services-image'>
                <img alt="Browse the Department for Education APIs" src="/assets/images/hp-int.jpg" />
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
                                 <a className='govuk-link' onClick={(e) => registerLink(e, this.props.msalRegisterConfig)}>{link.Page}</a>
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
       </Fragment>
     )
   }
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
