import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import InputWithValidation from 'components/common/forms/input-with-validation'
import ValidationMessages from 'components/common/forms/validation-messages'
import { saveAppData, cancelApplication } from '../../../src/actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

import { useFocusMain } from 'hooks'

const ApplicationCreateStep2 = ({ application, saveAppData, cancelApplication, router, msalConfig }) => {
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState([])

  const appDescriptionRef = useRef()

  useFocusMain()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!appDescriptionRef.current.validateInput(e)) {
      appDescriptionRef.current.validateInput(e)
      return false
    }

    saveAppData(fields)
    router.push('/applications/create/step3')

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
        <a href='#' className='govuk-back-link' onClick={() => router.back()}>Back<span className='govuk-visually-hidden'> to what is your applications name</span></a>
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
                        What is your application for?
                      </h1>
                    </legend>
                    <InputWithValidation
                      ref={appDescriptionRef}
                      friendlyName={'application description'}
                      name={'app-description'}
                      inputId={'app-description'}
                      inputErrorId={'error-msg-for__app-description'}
                      label={`Application description`}
                      hint={`Please describe in as much detail what your application is for and how it will be used.`}
                      customErrorMessage='Describe your application'
                      isRequired
                      textArea
                      onChange={handleInputChange}
                      onFocus={() => showError()}
                      inputValue={details ? details['app-description'] : fields['app-description']}
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

ApplicationCreateStep2.displayName = 'Application create description'

export { ApplicationCreateStep2 }
export default connect(mapStateToProps, { saveAppData, cancelApplication })(ApplicationCreateStep2)
