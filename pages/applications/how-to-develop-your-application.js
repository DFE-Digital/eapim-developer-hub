import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import AccessChecker from 'components/common/AccessChecker'
import SideBar from 'components/common/SideBar'
import ReturnTo from 'components/common/ReturnTo'
import ContentBuilder from 'components/common/ContentBuilder'

const page = 'How to develop your application'

class ApplicationsHowTo extends Component {
  render () {
    const {
      user: { data }
    } = this.props

    let isLoggedIn = false
    if (data && data.isAuthed) isLoggedIn = true

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <div className='govuk-width-container'>
          <div className='govuk-breadcrumbs'>
            <ol className='govuk-breadcrumbs__list'>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href='/applications'>Applications</a>
              </li>
              <li className='govuk-breadcrumbs__list-item' aria-current='page'>{Content.Applications[page].Page}</li>
            </ol>
          </div>
          <section className='mainWrapper govuk-!-margin-top-7'>
            <aside className='sideBar'>
              <div className='sideBar_content'>
                <SideBar nav={Content.Applications} loggedIn={isLoggedIn} />
              </div>
            </aside>

            <main className='mainContent' id='main-content' role='main'>
              <div className='govuk-main-wrapper govuk-!-padding-top-0'>
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-full'>
                    <h1 className='govuk-heading-xl'>{Content.Applications[page].Page}</h1>
                    <ContentBuilder sectionNav={false} data={Content.Applications[page].Content.Body} />
                  </div>
                </div>
              </div>
            </main>
          </section>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationsHowTo.displayName = `Application ${page}`

export { ApplicationsHowTo }
export default connect(mapStateToProps)(ApplicationsHowTo)
