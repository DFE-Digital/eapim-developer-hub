import React from 'react'
import ContentBuilder from 'components/ContentBuilder'
import { getContent } from '../../content/site'

const content = getContent('authWarning')

const AuthWarning = ({ warning }) => {
  return (
    <>
      <div className='govuk-warning-text'>
        <span className='govuk-warning-text__icon' aria-hidden='true'>!</span>
        <strong className='govuk-warning-text__text'>
          <span className='govuk-warning-text__assistive'>{content.title}</span> {warning}
        </strong>
      </div>

      <div className='flex'>
        <ContentBuilder sectionNav={false} data={content.content} />
      </div>
    </>
  )
}

export default AuthWarning
