import React, { useState, useRef } from 'react'
import Page from 'components/Page'
import ValidationMessages from 'components/form/validation-messages'
import Textarea from 'components/form/Textarea'
import * as validation from 'utils/validation'
import { useApplication } from '../../../providers/ApplicationProvider'

const ApplicationCreateStep2 = ({ router }) => {
  const context = useApplication()

  const [errors, setErrors] = useState({})
  const [errorSummary, setErrorSummary] = useState([])

  const appDescriptionRef = useRef()

  const cancel = () => {
    context.clear()
    router.push('/applications')
  }

  const createErrorSummary = (formErrors) => {
    const keys = Object.keys(formErrors)
    return keys.map(key => ({ id: key, message: formErrors[key] }))
  }

  const validateForm = (fields) => {
    const formErrors = {}

    if (validation.isEmpty(fields.appDescription)) {
      formErrors.appDescription = 'Enter your application description'
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    setErrorSummary([])

    const formErrors = validateForm({
      appDescription: appDescriptionRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      setErrorSummary(createErrorSummary(formErrors))
      return false
    }

    context.update({ description: appDescriptionRef.current.value })

    window.location.href = '/applications/create/step3'
    return true
  }

  return (
    <Page router={router} layout='two-thirds' back='to what is your applications name'>
      <ValidationMessages errors={errorSummary} />
      <form noValidate onSubmit={handleSubmit}>
        <div className='govuk-form-group'>
          <fieldset className='govuk-fieldset'>
            <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
              <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                What is your application for?
              </h1>
            </legend>
            <Textarea
              inline
              ref={appDescriptionRef}
              id='app-description'
              name='app-description'
              label='Application description'
              value={context.application.description}
              error={errors.appDescription}
              hint='Please provide as much information as possible. Do not provide any personal information.'
            />
          </fieldset>
        </div>

        <button type='submit' className='govuk-button govuk-!-margin-right-1'>Continue</button>
        <button type='button' className='govuk-button govuk-button--secondary' onClick={() => cancel()}>
          Cancel
        </button>
      </form>
    </Page>
  )
}

ApplicationCreateStep2.displayName = 'Application create description'

export default ApplicationCreateStep2
