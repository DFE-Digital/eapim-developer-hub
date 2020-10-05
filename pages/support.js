import React, { useState, useEffect, useRef, Fragment } from 'react'
import Content from '../content.json'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import ContentBuilder from 'components/common/ContentBuilder'

import ValidationMessages from 'components/common/forms/validation-messages'
import Radio from 'components/common/form/radio'
import Input from 'components/common/form/input'
import Textarea from 'components/common/form/textarea'

import { send } from '../lib/emailService'
import { template } from '../emails/support'

import * as validation from 'utils/validation'

const page = 'Support'

const Support = ({ router, msalConfig }) => {
  const formRef = useRef()
  const fullnameRef = useRef()
  const emailRef = useRef()
  const apiRef = useRef()
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

    if (validation.isEmpty(fields.fullname)) {
      formErrors.fullname = 'Enter your full name'
    }

    if (!validation.isEmail(fields.email)) {
      formErrors.email = 'Enter a valid email address'
    }

    if (validation.isEmpty(fields.reason)) {
      formErrors.reason = 'Choose an option for your enquiry'
    }

    if (fields.api !== undefined && fields.reason === 'issue-with-api' && validation.isEmpty(fields.api)) {
      formErrors.api = 'Specify the API you are having an issue with'
    }

    if (validation.isEmpty(fields.description)) {
      formErrors.description = 'Describe the problem you are having'
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
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      reason: formRef.current.reason.value,
      api: apiRef.current && apiRef.current.value,
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
      <AccessChecker msalConfig={msalConfig} />
      <ReturnTo parentPath={router.asPath} />
      <div className='govuk-width-container'>
        <div className='govuk-breadcrumbs'>
          <ol className='govuk-breadcrumbs__list'>
            <li className='govuk-breadcrumbs__list-item'>
              <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
            </li>
            <li className='govuk-breadcrumbs__list-item' aria-current='page'>{Content[page].Page}</li>
          </ol>
        </div>
        <main className='govuk-main-wrapper' id='main-content' role='main'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters'>
              <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
              <ContentBuilder sectionNav={false} data={Content[page].Content.Form.Body} />

              <hr className='govuk-section-break govuk-section-break--l govuk-section-break--visible' />

              <ValidationMessages errors={errorSummary} />

              <form noValidate method="POST" onSubmit={handleSubmit} ref={formRef}>
                <Input
                  ref={fullnameRef}
                  id='fullname'
                  name='fullname'
                  label='Full name'
                  type='text'
                  error={errors.fullname}
                />
                <Input
                  ref={emailRef}
                  id='email'
                  name='email'
                  type='email'
                  label='Email address'
                  hint='We only use your email to respond to you.'
                  error={errors.email}
                />
                <Radio
                  id='reason'
                  name='reason'
                  legend='What specifically do you need help with?'
                  onChange={handleInputChange}
                  value={reason}
                  error={errors.reason}
                  items={[
                    { label: 'General enquiry', value: 'general-enquiry' },
                    { label: 'Issue with website', value: 'issue-with-website' },
                    { label: 'Issue with API - Please specify what API you are having issue with', value: 'issue-with-api' },
                    { label: 'Other', value: 'other' }
                  ]}
                />
                {reason && reason === 'issue-with-api' &&
                  <Input
                    ref={apiRef}
                    id='api'
                    name='api'
                    type='text'
                    label='Which API are you having issues with'
                    error={errors.api}
                    required={reason === 'issue-with-api'}
                  />
                }
                <Textarea
                  inline
                  ref={descriptionRef}
                  id='description'
                  name='description'
                  label='What do you need help with?'
                  hint='Please provide as much information as possible. Do not provide any personal information.'
                  maxLength='3000'
                  value={description}
                  error={errors.description}
                  onChange={handleInputChange}
                />
                <button type='submit' className='govuk-button govuk-!-margin-right-1'>Submit</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  )
}

Support.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {

    try {
      await send({
        "email-to": process.env.SERVICE_NOW_EMAIL,
        "email-from": req.body.email,
        "subject": "Developer Hub Support Request",
        "content-type": "text/html",
        "email-content": template(req.body)
      })

      res.writeHead(301, { Location: '/support-submitted' });
      res.end();
    } catch (error) {
      console.log(`Error sending support email: ${error}`)
    }
  }

  return {
    status: 200
  }
}

Support.displayName = 'Support'

export default Support
