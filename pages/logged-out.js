import React, { useState, useEffect, useRef, Fragment } from 'react'
import ReturnTo from 'components/common/ReturnTo'
import Breadcrumbs from 'components/common/Breadcrumbs'

import ValidationMessages from 'components/common/forms/validation-messages'
import Radio from 'components/common/form/radio'
import Textarea from 'components/common/form/textarea'

import { send } from '../lib/emailService'
import { template } from '../emails/survey'

import * as validation from 'utils/validation'

const LoggedOut = ({ router }) => {
  const formRef = useRef()
  const descriptionRef = useRef()

  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')

  const [errors, setErrors] = useState({})
  const [errorSummary, setErrorSummary] = useState([])

  useEffect(() => {
    const summary = document.querySelector('.govuk-error-summary')

    if (summary) {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: summary.offsetTop
      })
    }
  }, [errors])

  const handleInputChange = (e) => {
    if (e.target.name === 'reason') {
      setReason(e.target.value)
    }

    if (e.target.name === 'description') {
      setDescription(e.target.value)
    }
  }

  const validateForm = (fields) => {
    const formErrors = {}

    if (validation.isEmpty(fields.reason)) {
      formErrors.reason = 'Choose your satisfactory level with the Developer Hub'
    }

    if (validation.isEmpty(fields.description)) {
      formErrors.description = 'Describe how we could improve the Developer Hub'
    }

    return formErrors
  }

  const createErrorSummary = (formErrors) => {
    const keys = Object.keys(formErrors)
    return keys.map(key => ({ id: key, message: formErrors[key] }))
  }

  const handleSubmit = (e) => {
    setErrors({})
    setErrorSummary([])

    const formErrors = validateForm({
      reason: formRef.current.reason.value,
      description: descriptionRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      setErrorSummary(createErrorSummary(formErrors))
      e.preventDefault()
      return false
    }
  }

  return (
    <Fragment>
      <ReturnTo parentPath='/' />
      <div className='govuk-width-container'>
        <Breadcrumbs items={[]} />
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters'>
              <h1 className='govuk-heading-l'>You are now signed out</h1>
              <a href='/' className='govuk-button govuk-button--default' role='button'>Back to home page</a>

              <hr className='govuk-section-break govuk-section-break--l govuk-section-break--visible' />

              <h2 className='govuk-heading-l'>Feedback survey</h2>

              <ValidationMessages errors={errorSummary} />

              <form noValidate method='POST' onSubmit={handleSubmit} ref={formRef}>
                <Radio
                  id='reason'
                  name='reason'
                  legend='Overall, how satisfied were you with using the Developer Hub?'
                  onChange={handleInputChange}
                  value={reason}
                  error={errors.reason}
                  items={[
                    { label: 'Very satisfied', value: 'very-satisfied' },
                    { label: 'Somewhat satisfied', value: 'somewhat-satisfied' },
                    { label: 'Neither satisfied nor dissatisfied', value: 'neither-satisfied-nor-dissatisfied' },
                    { label: 'Somewhat dissatisfied', value: 'somewhat-dissatisfied' },
                    { label: 'Very dissatisfied', value: 'very-dissatisfied' }
                  ]}
                />
                <Textarea
                  inline
                  ref={descriptionRef}
                  id='description'
                  name='description'
                  label='How could we improve the Developer Hub to better meet your needs?'
                  hint='Please provide as much information as possible. Do not provide any personal information.'
                  maxLength='3000'
                  value={description}
                  error={errors.description}
                  onChange={handleInputChange}
                />
                <button type='submit' className='govuk-button govuk-!-margin-right-1'>Submit and go back to home page</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

LoggedOut.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {
    try {
      await send({
        'email-to': process.env.SERVICE_NOW_EMAIL,
        subject: 'Developer Hub Feedback Survey',
        'content-type': 'text/html',
        'email-content': template(req.body)
      })

      res.writeHead(301, { Location: '/' })
      res.end()
    } catch (error) {
      console.log(`Error sending support email: ${error}`)
    }
  }

  return {
    status: 200
  }
}

LoggedOut.displayName = 'Logged out'

export default LoggedOut
