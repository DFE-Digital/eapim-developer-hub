import React from 'react'
import { useIsIE11 } from '../../hooks'

const IE11BrowserMessage = () => {
  if (!useIsIE11()) return null

  return (
    <div className='govuk-warning-text govuk-width-container'>
      <span className='govuk-warning-text__icon' aria-hidden='true'>!</span>
      <strong className='govuk-warning-text__text'>
        <span className='govuk-warning-text__assistive'>This website is not currently available in Internet Explorer 11.</span>
        This website is not currently available in Internet Explorer 11.
        <p className='govuk-body'>To access this website, please try another browser such as:</p>
        <ul className='govuk-list govuk-list--bullet'>
          <li><a href='https://www.microsoft.com/en-us/edge' target='_blank' referrerPolicy='no-referrer'>Microsoft Edge</a></li>
          <li><a href='https://www.google.com/intl/en_uk/chrome' target='_blank' referrerPolicy='no-referrer'>Google Chrome</a></li>
          <li><a href='https://www.mozilla.org/en-GB/firefox/new' target='_blank' referrerPolicy='no-referrer'>Mozilla Firefox</a></li>
          <li><a href='https://support.apple.com/en_GB/downloads/safari' target='_blank' referrerPolicy='no-referrer'>Apple Safari</a></li>
        </ul>
      </strong>
    </div>
  )
}

export default IE11BrowserMessage
