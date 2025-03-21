import React from 'react'
import ReactHtmlParser from 'html-react-parser'
import { getContent } from '../../content/site'

const content = getContent('phasebanner')
const newsitemsg = getContent('newsitemsg')

const PhaseBanner = () => {
  return (
    <div className='govuk-width-container'>
      <div className='govuk-phase-banner'>
        <p className='govuk-phase-banner__content'>
          <span className='govuk-phase-banner__text'>{ReactHtmlParser(newsitemsg.body)}</span>
        </p>
      </div>
    </div>
  )
}

export default PhaseBanner
