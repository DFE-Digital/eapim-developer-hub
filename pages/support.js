import React, { useContext, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Content from '../content.json'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'

import ValidationMessages from 'components/forms/validation-messages'
import Radio from 'components/form/radio'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import { send } from '../lib/emailService'
import { template } from '../emails/support'

import * as validation from 'utils/validation'

import { getApis } from '../lib/apiServices'
import AuthContext from '../src/auth/context'

const page = 'Support'

const Support = ({ apis, router, user }) => {
  const context = useContext(AuthContext)

  const formRef = useRef()
  const fullnameRef = useRef()
  const emailRef = useRef()
  const descriptionRef = useRef()

  const [api, setApi] = useState('')
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

    if (e.target.name === 'api') {
      setApi(e.target.value)
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
      reason,
      api,
      description: descriptionRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      setErrorSummary(createErrorSummary(formErrors))
      e.preventDefault()
      return false
    }
  }

  const userEmail = user.data && user.data.User && user.data.User.idToken['email']
  const userName = user.data && user.data.User && `${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`

  return (
    <Page router={router} layout='three-quarters'>
      <h1 className='govuk-heading-xl'>{Content[page].Page}</h1>
      <ContentBuilder sectionNav={false} data={Content[page].Content.Form.Body} />

      <button onClick={() => context.login()}>login</button>

      <hr className='govuk-section-break govuk-section-break--l govuk-section-break--visible' />

      <ValidationMessages errors={errorSummary} />

      <form noValidate method='POST' onSubmit={handleSubmit} ref={formRef}>
        <Input
          ref={fullnameRef}
          id='fullname'
          name='fullname'
          label='Full name'
          type='text'
          value={userName}
          error={errors.fullname}
        />
        <Input
          ref={emailRef}
          id='email'
          name='email'
          type='email'
          label='Email address'
          hint='We only use your email to respond to you.'
          value={userEmail}
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
            { label: 'Issue with API - Please specify what API you are having an issue with', value: 'issue-with-api' },
            { label: 'Other', value: 'other' }
          ]}
        />
        {reason && reason === 'issue-with-api' &&
          <Select
            id='api'
            name='api'
            label='Which API are you having issues with'
            error={errors.api}
            items={[{ label: 'Select an API', value: '' }, ...apis]}
            required={reason === 'issue-with-api'}
            value={api}
            onChange={handleInputChange}
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
    </Page>
  )
}

Support.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {
    try {
      await send({
        'email-to': process.env.SERVICE_NOW_EMAIL,
        'email-from': req.body.email,
        subject: 'Developer Hub Support Request',
        'content-type': 'text/html',
        'email-content': template(req.body)
      })

      res.writeHead(301, { Location: '/support-submitted' })
      res.end()
    } catch (error) {
      console.log(`Error sending support email: ${error}`)
    }
  }

  try {
    const apis = await getApis()
    const data = apis.map(api => { return { label: api.properties.displayName, value: api.properties.displayName } })
    return { apis: data }
  } catch (error) {
    console.log(`Error fetching APIs: ${error}`)
  }

  return {
    status: 200,
    apis: []
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Support.displayName = 'Support'

export default connect(mapStateToProps)(Support)
