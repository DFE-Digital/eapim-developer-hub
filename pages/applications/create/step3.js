import React, { useState, useRef } from 'react'
import ApplicationPage from 'components/pages/ApplicationPage'
import { urlPattern } from '../../../src/utils/patterns'
import Input from 'components/form/input'
import * as validation from 'utils/validation'
import { useApplication } from '../../../providers/ApplicationProvider'

import { getContent } from '../../../content/application'
const content = getContent('create-step-3')

const ApplicationCreateStep3 = ({ router }) => {
  const context = useApplication()

  const [errors, setErrors] = useState({})

  const appRedirectUrlRef = useRef()

  const cancel = () => {
    context.clear()
    router.push('/applications')
  }

  const validateForm = (fields) => {
    const formErrors = {}

    if (validation.isEmpty(fields.appRedirectUrl)) {
      formErrors.appRedirectUrl = content.errors.empty
    }

    if (!urlPattern.test(fields.appRedirectUrl)) {
      formErrors.appRedirectUrl = content.errors.invalid
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})

    const formErrors = validateForm({
      appRedirectUrl: appRedirectUrlRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      return false
    }

    context.update({ redirectUrl: appRedirectUrlRef.current.value })

    window.location.href = '/applications/create/summary'
    return true
  }

  return (
    <ApplicationPage title={content.title} layout='two-thirds' breadcrumbs={[{ text: 'to application description ', href: '/applications/create/step2', back: true }]} hideSidebar>
      <form noValidate onSubmit={handleSubmit}>
        <div className='govuk-form-group'>
          <fieldset className='govuk-fieldset'>
            <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
              <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                {content.title}
              </h1>
            </legend>
            <Input
              ref={appRedirectUrlRef}
              id='appRedirectUrl'
              name='appRedirectUrl'
              type='text'
              label={content.inputs.label}
              value={context.application.redirectUrl}
              error={errors.appRedirectUrl}
              hint={content.inputs.hint}
            />
          </fieldset>
        </div>

        <button type='submit' className='govuk-button govuk-!-margin-right-1'>{content.buttons.continue}</button>
        <button type='button' className='govuk-button govuk-button--secondary' onClick={() => cancel()}>{content.buttons.cancel}</button>
      </form>
    </ApplicationPage>
  )
}

export default ApplicationCreateStep3
