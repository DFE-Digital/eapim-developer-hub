import React, { Fragment } from 'react'
import Content from '../content.json'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import ContentBuilder from 'components/common/ContentBuilder'
import Breadcrumbs from 'components/common/Breadcrumbs'

const page = 'Privacy'

const PrivacyPolicy = ({ msalConfig, router }) => {
  return (
    <Fragment>
      <AccessChecker msalConfig={msalConfig} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <Breadcrumbs items={[{ text: page }]} />
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
              <ContentBuilder sectionNav={false} data={Content[page].Content.Body} />
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

PrivacyPolicy.displayName = 'Privacy Policy'

export default PrivacyPolicy
