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
// import { template } from '../emails/support'
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
  const [apiIssue, setApiIssue] = useState('')
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
    if (e.target.name === 'apiIssue') {
      setApiIssue(e.target.value)
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

    if (validation.isEmpty(fields.apiIssue)) {
      formErrors.apiIssue = content.errors.apiIssue
    }

    if (fields.api !== undefined && fields.apiIssue === 'true' && validation.isEmpty(fields.api)) {
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
      apiIssue,
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
    <Page title={content.title} layout='three-quarters' errors={errors} breadcrumbs={[{ title: content.title }]}>
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
          id='apiIssue'
          name='apiIssue'
          legend={content.form.apiIssue.label}
          onChange={handleInputChange}
          value={apiIssue}
          error={errors.apiIssue}
          items={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' }
          ]}
        />
        {apiIssue && apiIssue === 'true' &&
          <Select
            id='api'
            name='api'
            label={content.form.apiIssue.apiSelect}
            hint={content.form.apiIssue.apiSelectHint}
            error={errors.api}
            items={[{ label: 'Select an API', value: '' }, ...apis]}
            required={apiIssue}
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
      const body = req._req ? req._req.body : req.body

      if (body.api === undefined) {
        body.api = 'N/A'
      }

      await send({
        'email-from': body.email,
        'email-to': process.env.SUPPORT_EMAIL,
        subject: 'Support request from the Find and Use an API service',
        'content-type': 'text/html',
        'email-content': body.description,
        fullname: body.fullname,
        api: body.api,
        apiIssue: body.apiIssue
      }, 'support', req, res)

      const response = res._res ? res._res : res

      response.writeHead(301, { Location: '/support-submitted' })
      response.end()
    } catch (error) {
      return errorHandler(res, error, 500)
    }
  }

  try {
    const apis = await getApis(req, res)
    const data = apis.map(api => {
      return { label: api.properties.displayName, value: api.properties.displayName }
    })
    return { apis: data }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default Support
