import React, { useState, useRef } from 'react'
import Page from 'components/Page'
import { urlPattern } from '../../../src/utils/patterns'

import ValidationMessages from 'components/form/validation-messages'
import Input from 'components/form/input'
import * as validation from 'utils/validation'
import { useApplication } from '../../../providers/ApplicationProvider'

const ApplicationCreateStep3 = ({ router }) => {
  const context = useApplication()

  const [errors, setErrors] = useState({})
  const [errorSummary, setErrorSummary] = useState([])

  const appRedirectUrlRef = useRef()

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

    if (validation.isEmpty(fields.appRedirectUrl)) {
      formErrors.appRedirectUrl = 'Enter your application redirect URL'
    }

    if (!urlPattern.test(fields.appRedirectUrl)) {
      formErrors.appRedirectUrl = 'URL must contain https://. If you are using localhost, prefix it with http://'
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    setErrorSummary([])

    const formErrors = validateForm({
      appRedirectUrl: appRedirectUrlRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      setErrorSummary(createErrorSummary(formErrors))
      return false
    }

    context.update({ redirectUrl: appRedirectUrlRef.current.value })

    window.location.href = '/applications/create/summary'
    return true
  }

  return (
    <Page router={router} layout='two-thirds' back='to what is your applications description'>
      <ValidationMessages errors={errorSummary} />
      <form noValidate onSubmit={handleSubmit}>
        <div className='govuk-form-group'>
          <fieldset className='govuk-fieldset'>
            <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
              <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                What is your redirect URL?
              </h1>
            </legend>
            <Input
              ref={appRedirectUrlRef}
              id='app-redirect-url'
              name='app-redirect-url'
              label='Redirect URL'
              type='url'
              value={context.application.redirectUrl}
              error={errors.appRedirectUrl}
              hint='This will be the URL that you want to redirect users back to. It must begin with https://'
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

ApplicationCreateStep3.displayName = 'Application create redirect-url'

export default ApplicationCreateStep3
