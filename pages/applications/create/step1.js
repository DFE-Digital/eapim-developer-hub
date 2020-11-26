import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Page from 'components/Page'
import InputWithValidation from 'components/common/forms/input-with-validation'
import ValidationMessages from 'components/common/forms/validation-messages'
import { saveAppData, cancelApplication } from '../../../src/actions/application'
import { getApplications } from '../../../lib/applicationService'
import { appNamePattern } from '../../../src/utils/patterns'

import { useFocusMain } from 'hooks'

const ApplicationCreateStep1 = ({ user, application, saveAppData, cancelApplication, router }) => {
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState([])
  // const [fetching, setFetching] = useState(false)
  const [applications, setApplications] = useState([])

  const appName = React.createRef()

  useFocusMain()

  useEffect(() => {
    const fetchApplications = async () => {
      // setFetching(true)
      const apps = await getApplications(user.data.User)
      setApplications(apps)
      // setFetching(false)
    }

    if (user.data && user.data.User) fetchApplications()
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!appName.current.validateInput(e)) {
      appName.current.validateInput(e)
      return false
    }

    if (applications.find(app => app.applicationName === appName.current.state.inputValue)) {
      appName.current.setErrors('You have already have an application with this name', false)
      return false
    }

    saveAppData(fields)
    window.location.href = '/applications/create/step2'
    return true
  }

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value.trim()
    const name = target.name
    const _fields = { ...fields }
    _fields[name] = value
    setFields(_fields)
  }

  const showError = () => {
    const validationErrors = []
    setTimeout(() => {
      Array.from(document.querySelectorAll(`[id^="error-msg-for__"]`)).forEach(element => {
        if (element.textContent.length) {
          validationErrors.push({
            id: element.id,
            message: element.textContent.split('Error: ').pop()
          })
        }
      })
      setErrors(validationErrors)
    }, 0)
  }

  const { details } = application

  return (
    <Page router={router} layout='two-thirds' back='to application listing page'>
      <ValidationMessages errors={errors} />
      <form noValidate onSubmit={handleSubmit}>
        <div className='govuk-form-group'>
          <fieldset className='govuk-fieldset'>
            <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
              <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                What's the name of your application?
              </h1>
            </legend>
            <InputWithValidation
              ref={appName}
              friendlyName={'application name'}
              name={'app-name'}
              inputId={'app-name'}
              inputErrorId={'error-msg-for__app-name'}
              label={`Application name`}
              hint='Your application name must be between 2 and 50 characters. It can contain alphanumeric characters and spaces. Special characters are not allowed'
              customErrorMessage='Enter the name of your application'
              customValidationMessage='Application name must be between 2 and 50 characters and must not contain any special characters'
              isRequired
              pattern={appNamePattern}
              onChange={handleInputChange}
              onFocus={() => showError()}
              inputValue={details ? details['app-name'] : fields['app-name']}
              setErrors={() => showError()}
            />
          </fieldset>
        </div>

        <button type='submit' className='govuk-button govuk-!-margin-right-1'>Continue</button>
        <button
          type='button'
          className='govuk-button govuk-button--secondary'
          onClick={() => {
            cancelApplication()
            Router.push('/applications')
          }}
        >
          Cancel
        </button>
      </form>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    application: state.application
  }
}

ApplicationCreateStep1.displayName = 'Application create name'

export default connect(mapStateToProps, { saveAppData, cancelApplication })(ApplicationCreateStep1)
