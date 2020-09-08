import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Content from '../../../content.json'

const PhaseBanner = props => {
  return (
    <div className='govuk-width-container'>
      <div className='govuk-phase-banner'>
        <p className='govuk-phase-banner__content'>
          <strong className='govuk-tag govuk-phase-banner__content__tag'>{Content['PhaseBanner'].Phase}</strong>
          <span className='govuk-phase-banner__text'>{ ReactHtmlParser(Content['PhaseBanner'].Content) }</span>
        </p>
      </div>
    </div>
  )
}

export default PhaseBanner
