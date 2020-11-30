import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { getContent } from '../../content/site'

const content = getContent('phasebanner')

const PhaseBanner = () => {
  return (
    <div className='govuk-width-container'>
      <div className='govuk-phase-banner'>
        <p className='govuk-phase-banner__content'>
          <strong className='govuk-tag govuk-phase-banner__content__tag'>{content.phase}</strong>
          <span className='govuk-phase-banner__text'>{ReactHtmlParser(content.body)}</span>
        </p>
      </div>
    </div>
  )
}

export default PhaseBanner
