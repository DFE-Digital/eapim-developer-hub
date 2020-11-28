import React, { useState, useEffect, useRef } from 'react'
import Page from 'components/Page'
import { getApplications } from '../../../lib/applicationService'
import { useApplication } from '../../../providers/ApplicationProvider'
import { useAuth } from 'context'
import { getContent } from '../../../content/application'
import ErrorSummary from 'components/ErrorSummary'
import Input from 'components/form/input'
import * as validation from 'utils/validation'

const content = getContent('create-step-1')

const ApplicationCreateStep1 = ({ router }) => {
  const { user } = useAuth()
  const context = useApplication()

  const [applications, setApplications] = useState([])
  const [errors, setErrors] = useState({})
  const [errorSummary, setErrorSummary] = useState([])

  const appNameRef = useRef('')

  useEffect(() => {
    const fetchApplications = async () => {
      const apps = await getApplications(user.getToken())
      setApplications(apps)
    }

    if (user.getToken()) fetchApplications()
  }, [user])

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

    if (validation.isEmpty(fields.appName)) {
      formErrors.appName = content.errors.empty
      return formErrors
    }

    if (!validation.isLength(fields.appName, { min: 3, max: 50 })) {
      formErrors.appName = content.errors.invalid
    }

    if (applications.find(app => app.applicationName === fields.appName)) {
      formErrors.appName = content.errors.duplicate
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    setErrorSummary([])

    const formErrors = validateForm({
      appName: appNameRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      setErrorSummary(createErrorSummary(formErrors))
      return false
    }

    context.update({ name: appNameRef.current.value })

    window.location.href = '/applications/create/step2'
    return true
  }

  return (
    <Page title={content.title} router={router} layout='two-thirds' back='to application listing page'>
      <ErrorSummary pageTitle={content.title} errors={errorSummary} />
      <form noValidate onSubmit={handleSubmit}>
        <div className='govuk-form-group'>
          <fieldset className='govuk-fieldset'>
            <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
              <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                {content.title}
              </h1>
            </legend>
            <Input
              ref={appNameRef}
              id='app-name'
              name='app-name'
              type='text'
              label={content.inputs.label}
              value={context.application.name}
              error={errors.appName}
              hint={content.inputs.hint}
            />
          </fieldset>
        </div>

        <button type='submit' className='govuk-button govuk-!-margin-right-1'>{content.buttons.continue}</button>
        <button type='button' className='govuk-button govuk-button--secondary' onClick={() => cancel()}>{content.buttons.cancel}</button>
      </form>
    </Page>
  )
}

ApplicationCreateStep1.displayName = 'Application create name'

export default ApplicationCreateStep1
