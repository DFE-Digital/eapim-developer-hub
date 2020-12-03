import React from 'react'
import Page from 'components/Page'

import { getContent } from '../content/profile'
const content = getContent('delete-account-success')

const DeletedAccountSuccess = () => {
  return (
    <Page title={content.title} layout='three-quarters'>
      <h1 role='alert' aria-live='assertive' className='govuk-heading-xl'>{content.title}</h1>
      <a role='button' href='/' className='govuk-button govuk-button--default'>{content.buttons.back}</a>
    </Page>
  )
}

export default DeletedAccountSuccess
