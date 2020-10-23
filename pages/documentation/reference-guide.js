import React from 'react'
import { connect } from 'react-redux'
import Content from '../../content.json'
import AccessChecker from 'components/common/AccessChecker'
import SideBar from 'components/common/SideBar'
import ReturnTo from 'components/common/ReturnTo'
import ContentBuilder from 'components/common/ContentBuilder'
import Breadcrumbs from 'components/common/Breadcrumbs'

const parent = 'Documentation'
const page = 'Reference guide'

const ReferenceGuide = ({ user, router, msalConfig }) => {
  const { data } = user

  let isLoggedIn = false
  if (data && data.isAuthed) isLoggedIn = true

  return (
    <>
      <AccessChecker msalConfig={msalConfig} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <Breadcrumbs items={[
          { text: parent, href: `/${router.asPath.split('/')[1]}` },
          { text: page }
        ]} />
        <section className='mainWrapper govuk-!-margin-top-7'>
          <aside className='sideBar'>
            <div className='sideBar_content'>
              <SideBar nav={Content.Documentation} loggedIn={isLoggedIn} />
            </div>
          </aside>

          <main className='mainContent' id='main-content' role='main'>
            <div className='govuk-main-wrapper govuk-!-padding-top-0'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  <h1 className='govuk-heading-xl'>{Content.Documentation[page].Page}</h1>
                  <ContentBuilder sectionNav data={Content.Documentation[page].Content} />
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ReferenceGuide.displayName = page

export default connect(mapStateToProps)(ReferenceGuide)
