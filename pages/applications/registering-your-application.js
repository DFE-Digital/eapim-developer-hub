import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AccessChecker from 'components/common/AccessChecker'
import Content from '../../content.json'
import SideBar from 'components/common/SideBar'
import ReturnTo from 'components/common/ReturnTo'
import ContentBuilder from 'components/common/ContentBuilder'
import Breadcrumbs from 'components/common/Breadcrumbs'

const parent = 'Applications'
const page = 'Registering your application'

class RegisteringApplications extends Component {
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
          <Breadcrumbs items={[
            { text: parent, href: `/${this.props.router.asPath.split('/')[1]}` },
            { text: page }
          ]} />
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
                    <p className='govuk-body'>
                      Go to <a href='/applications' className='govuk-link govuk-!-margin-top-7'>{Content.Applications[page].Content.Button}</a>.
                    </p>
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

RegisteringApplications.displayName = page

export { RegisteringApplications }
export default connect(mapStateToProps)(RegisteringApplications)
