import React, { useState, useEffect, useRef } from 'react'
import { getContent } from '../content/site'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'
import ErrorPage from 'components/pages/ErrorPage'
import { useAuth } from '../providers/AuthProvider'
import Radio from 'components/form/radio'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'
import { send } from '../lib/emailService'
import { template } from '../emails/support'
import * as validation from 'utils/validation'
import errorHandler from '../lib/errorHandler'
import { getApis } from '../lib/apiServices'

const content = getContent('support')

const Support = ({ apis, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const { user } = useAuth()

  const formRef = useRef()
  const fullnameRef = useRef()
  const emailRef = useRef()
  const descriptionRef = useRef()

  const [api, setApi] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')

  const [errors, setErrors] = useState({})

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
      formErrors.fullname = content.errors.name
    }

    if (!validation.isEmail(fields.email)) {
      formErrors.email = content.errors.email
    }

    if (validation.isEmpty(fields.reason)) {
      formErrors.reason = content.errors.reason
    }

    if (fields.api !== undefined && fields.reason === 'issue-with-api' && validation.isEmpty(fields.api)) {
      formErrors.api = content.errors.api
    }

    if (validation.isEmpty(fields.description)) {
      formErrors.description = content.errors.description
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    setErrors({})

    const formErrors = validateForm({
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      reason,
      api,
      description: descriptionRef.current.value
    })

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      e.preventDefault()
      return false
    }
  }

  return (
    <Page title={content.title} layout='three-quarters' errors={errors}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>
      <ContentBuilder sectionNav={false} data={content.content} />
      <hr className='govuk-section-break govuk-section-break--l govuk-section-break--visible' />

      <form noValidate method='POST' onSubmit={handleSubmit} ref={formRef}>
        <Input
          ref={fullnameRef}
          id='fullname'
          name='fullname'
          label={content.form.name.label}
          type='text'
          value={user.name()}
          error={errors.fullname}
        />
        <Input
          ref={emailRef}
          id='email'
          name='email'
          type='email'
          label={content.form.email.label}
          hint={content.form.email.hint}
          value={user.email()}
          error={errors.email}
        />
        <Radio
          id='reason'
          name='reason'
          legend={content.form.reason.label}
          onChange={handleInputChange}
          value={reason}
          error={errors.reason}
          items={[
            { label: content.form.reason.generalEnquiry, value: 'general-enquiry' },
            { label: content.form.reason.issueWebsite, value: 'issue-with-website' },
            { label: content.form.reason.issueApi, value: 'issue-with-api' },
            { label: content.form.reason.other, value: 'other' }
          ]}
        />
        {reason && reason === 'issue-with-api' &&
          <Select
            id='api'
            name='api'
            label={content.form.reason.issueWebsiteSelect}
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
          label={content.form.description.label}
          hint={content.form.description.hint}
          maxLength='3000'
          value={description}
          error={errors.description}
          onChange={handleInputChange}
        />
        <button type='submit' className='govuk-button govuk-!-margin-right-1'>
          {content.buttons.submit}
        </button>
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
      return errorHandler(res, error, 500)
    }
  }

  try {
    const apis = await getApis()
    const data = apis.map(api => {
      return { label: api.properties.displayName, value: api.properties.displayName }
    })
    return { apis: data }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

Support.displayName = 'Support'

export default Support
