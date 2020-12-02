import React from 'react'
import Input from 'components/form/input'

import { getContent } from '../../content/applicationManagement'

const content = getContent('redirect-urls')

const RedirectURLAdd = React.forwardRef(({ type, value = '', error, onSave, onCancel }, ref) => {
  const onSaveHandler = (e) => {
    e.preventDefault()
    onSave(type, ref, value)
  }

  return (
    <>
      <th scope='row' className='govuk-table__header'>
        <Input
          inline
          type='text'
          id={type}
          name='add-redirect-url'
          placeholder='https://www.'
          ref={ref}
          value={value}
          error={error}
        />
      </th>
      <td className='govuk-table__cell govuk-table__cell--numeric govuk-!-padding-right-1 middle'>
        <a role='button' href='#' className='govuk-link' onClick={onSaveHandler}>
          {content.buttons.save}
        </a>
      </td>
      <td className='govuk-table__cell govuk-table__cell--numeric middle'>
        <a role='button' href='#' className='govuk-link' onClick={onCancel}>
          {content.buttons.cancel}
        </a>
      </td>
    </>
  )
})

export default RedirectURLAdd
