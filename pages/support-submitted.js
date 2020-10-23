import React from 'react'
import Content from '../content.json'
import ContentBuilder from 'components/common/ContentBuilder'
import Breadcrumbs from 'components/common/Breadcrumbs'

const page = 'Support'

const SupportSubmitted = () => {
  return (
    <div className='govuk-width-container'>
      <Breadcrumbs items={[{ text: page }]} />
      <main className='govuk-main-wrapper' id='main-content' role='main'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-three-quarters'>
            <h1 className='govuk-heading-xl'>{Content[page].Content.Submitted.Title}</h1>
            <ContentBuilder sectionNav={false} data={Content[page].Content.Submitted.Body} />
          </div>
        </div>
      </main>
    </div>
  )
}

SupportSubmitted.displayName = 'Support Submitted'

export default SupportSubmitted
