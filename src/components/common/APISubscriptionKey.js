import React, { useState } from 'react'
import clipboard from 'utils/clipboard'

const APISubscriptionKey = ({ name, subscriptionKey = '-' }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (e, element) => {
    e.preventDefault()

    const res = clipboard(element)
    if (res) setCopied(true)
  }

  return (
    <tr className='govuk-table__row'>
      <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>{name} key</th>
      <td className='govuk-table__cell middle' id={`${name}-subscriptionKey`}>{subscriptionKey}</td>
      <td className='govuk-table__cell middle govuk-table__cell--numeric'>
        <a href='#' role='button' className='govuk-link govuk-!-margin-0' onClick={(e) => copyToClipboard(e, `#${name}-subscriptionKey`)}>
          {copied ? `Copied` : `Copy`}
        </a>
      </td>
    </tr>
  )
}

export default APISubscriptionKey
