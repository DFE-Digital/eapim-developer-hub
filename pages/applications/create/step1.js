import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import ApplicationPage from 'components/pages/ApplicationPage'
import { getApplications } from '../../../lib/applicationService'
import { useApplication } from '../../../providers/ApplicationProvider'
import { useAuth } from '../../../providers/AuthProvider'
import { getContent } from '../../../content/application'
import Input from 'components/form/input'
import * as validation from 'utils/validation'
import { decodeToken } from 'checkAuth'
import errorHandler from '../../lib/errorHandler'

const content = getContent('create-step-1')

const ApplicationCreateStep1 = (props) => {
  const { user } = useAuth()
  const context = useApplication()
  const router = useRouter()

  const [applications, setApplications] = useState([])
  const [errors, setErrors] = useState({})

  const appNameRef = useRef('')

  useEffect(() => {
    const fetchApplications = async () => {
      setApplications(props.apps)
    }

    if (user.getToken()) fetchApplications()
  }, [user])

  const cancel = () => {
    context.clear()
    router.push('/applications')
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

    const formErrors = validateForm({
      appName: appNameRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      return false
    }

    context.update({ name: appNameRef.current.value })

    window.location.href = '/applications/create/step2'
    return true
  }

  return (
    <ApplicationPage title={content.title} errors={errors} layout='two-thirds' hideSidebar backLink>
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
              id='appName'
              name='appName'
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
    </ApplicationPage>
  )
}

export async function getServerSideProps (context) {
  // var idtoken = context.req.cookies['msal.idtoken']
  const token = decodeToken(context.req, context.res)
  if (!token) return { props: { apps: [] } }

  const apps = await getApplications({ accountIdentifier: token.sub })
  if (!apps) return errorHandler(context.res)

  return {
    props: {
      apps
    }
  }
}

export default ApplicationCreateStep1
