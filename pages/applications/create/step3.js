import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import InputWithValidation from 'components/common/forms/input-with-validation'
import ValidationMessages from 'components/common/forms/validation-messages'
import { saveAppData, cancelApplication } from '../../../src/actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'
import { urlPattern } from '../../../src/utils/patterns'

import { useFocusMain } from 'hooks'

const ApplicationCreateStep3 = ({ application, saveAppData, cancelApplication, router, msalConfig }) => {
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState([])

  const appRedirectUrlRef = useRef()

  useFocusMain()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!appRedirectUrlRef.current.validateInput(e)) {
      appRedirectUrlRef.current.validateInput(e)
      return false
    }
    saveAppData(fields)
    window.location.href = '/applications/create/summary'
    return true
  }

  const handleInputChange = (e) => {
    const target = e.target
    const value = target.value.trim()
    const name = target.name
    const updatedFields = { ...fields }
    updatedFields[name] = value
    setFields(updatedFields)
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
    <>
      <AccessChecker msalConfig={msalConfig} />
      <PrivateRoute redirect={'/applications'} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <a href='#' className='govuk-back-link' onClick={() => router.back()}>Back<span className='govuk-visually-hidden'> to what is your applications description</span></a>
        <main className='govuk-main-wrapper ' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              <ValidationMessages errors={errors} />
            </div>
          </div>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <form noValidate onSubmit={handleSubmit}>
                <div className='govuk-form-group'>
                  <fieldset className='govuk-fieldset'>
                    <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
                      <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                        What is your redirect URL?
                      </h1>
                    </legend>
                    <InputWithValidation
                      ref={appRedirectUrlRef}
                      friendlyName={'redirect url'}
                      name={'app-redirect-url'}
                      inputId={'app-redirect-url'}
                      inputErrorId={'error-msg-for__app-redirect-url'}
                      label={`Redirect URL`}
                      hint={`This will be the URL that you want to redirect users back to. It must begin with https://`}
                      customErrorMessage='Enter a redirect URL, like https://www.gov.uk'
                      customValidationMessage='URL must contain https://. If you are using localhost, prefix it with http://'
                      isRequired
                      pattern={urlPattern}
                      onChange={handleInputChange}
                      onFocus={() => showError()}
                      inputValue={details ? details['app-redirect-url'] : fields['app-redirect-url']}
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
                    router.push('/applications')
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    application: state.application
  }
}

ApplicationCreateStep3.displayName = 'Application create redirect-url'

export { ApplicationCreateStep3 }
export default connect(mapStateToProps, { saveAppData, cancelApplication })(ApplicationCreateStep3)
