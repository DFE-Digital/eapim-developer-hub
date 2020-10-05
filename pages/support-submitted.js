import React from 'react'
import Content from '../content.json'
import ContentBuilder from 'components/common/ContentBuilder'

const page = 'Support'

const SupportSubmitted = () => {
  return (
    <div className='govuk-width-container'>
      <div className='govuk-breadcrumbs'>
        <ol className='govuk-breadcrumbs__list'>
          <li className='govuk-breadcrumbs__list-item'>
            <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
          </li>
          <li className='govuk-breadcrumbs__list-item' aria-current='page'>{Content[page].Page}</li>
        </ol>
      </div>
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
