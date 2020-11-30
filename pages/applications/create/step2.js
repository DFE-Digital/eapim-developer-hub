import React, { useState, useRef } from 'react'
import { getContent } from '../../../content/application'
import ApplicationPage from 'components/pages/ApplicationPage'
import Textarea from 'components/form/textarea'
import * as validation from 'utils/validation'
import { useApplication } from '../../../providers/ApplicationProvider'

const content = getContent('create-step-2')

const ApplicationCreateStep2 = ({ router }) => {
  const context = useApplication()

  const [errors, setErrors] = useState({})

  const appDescriptionRef = useRef()

  const cancel = () => {
    context.clear()
    router.push('/applications')
  }

  const validateForm = (fields) => {
    const formErrors = {}

    if (validation.isEmpty(fields.appDescription)) {
      formErrors.appDescription = content.errors.empty
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})

    const formErrors = validateForm({
      appDescription: appDescriptionRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      return false
    }

    context.update({ description: appDescriptionRef.current.value })

    window.location.href = '/applications/create/step3'
    return true
  }

  return (
    <ApplicationPage title={content.title} errors={errors} layout='two-thirds' breadcrumbs={[{ text: 'to application name ', href: '/applications/create/step1', back: true }]} hideSidebar>
      <form noValidate onSubmit={handleSubmit}>
        <div className='govuk-form-group'>
          <fieldset className='govuk-fieldset'>
            <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
              <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                {content.title}
              </h1>
            </legend>
            <Textarea
              inline
              ref={appDescriptionRef}
              id='appDescription'
              name='appDescription'
              label={content.inputs.label}
              value={context.application.description}
              error={errors.appDescription}
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

ApplicationCreateStep2.displayName = 'Application create description'

export default ApplicationCreateStep2
