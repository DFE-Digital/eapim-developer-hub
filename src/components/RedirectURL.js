import React from 'react'
import RedirectURLAdd from './RedirectURLAdd'

import { getContent } from '../../content/applicationManagement'

const content = getContent('redirect-urls')

const RedirectURL = React.forwardRef(({ url, urls, error, changing, onChange, onSave, onRemove, onCancel }, ref) => {
  const showRemove = urls.length > 1

  const onRemoveHandler = (e, url) => {
    e.preventDefault()
    onRemove(url)
  }

  return (
    <>
      {!changing && (
        <>
          <th scope='row' className='govuk-table__header'>{url}</th>
          <td className='govuk-table__cell govuk-table__cell--numeric govuk-!-padding-right-1' style={{ paddingRight: 0 }}>
            <a role='button' href='#' className='govuk-link' onClick={(e) => onChange(e, url)}>
              {content.buttons.change} <span className='govuk-visually-hidden'>{url}</span>
            </a>
          </td>
          <td className='govuk-table__cell govuk-table__cell--numeric' style={{ width: '5em' }}>
            {showRemove && (
              <a role='button' href='#' className='govuk-link' onClick={(e) => onRemoveHandler(e, url)}>
                {content.buttons.remove} <span className='govuk-visually-hidden'>{url}</span>
              </a>
            )}
          </td>
        </>
      )}
      {changing && (
        <RedirectURLAdd
          ref={ref}
          type='change'
          error={error}
          value={url}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </>
  )
})

export default RedirectURL
