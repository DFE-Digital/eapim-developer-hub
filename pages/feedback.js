import React, { useState, useEffect, useRef } from 'react'
import { getContent } from '../content/site'
import ContentBuilder from 'components/ContentBuilder'
import Page from 'components/Page'
import ErrorPage from 'components/pages/ErrorPage'
import Radio from 'components/form/radio'
import Input from 'components/form/input'
import Textarea from 'components/form/textarea'
import { send } from '../lib/emailService'
import * as validation from 'utils/validation'
import errorHandler from '../lib/errorHandler'

const content = getContent('feedback')

const Feedback = ({ serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  const formRef = useRef()
  const [relationship, setRelationship] = useState('')
  const relationshipOtherRef = useRef()
  const [relationshipOther, setRelationshipOther] = useState('')
  const [role, setRole] = useState('')
  const roleOtherRef = useRef()
  const [roleOther, setRoleOther] = useState('')
  const [experience, setExperience] = useState('')
  const experienceAboutRef = useRef()
  const [experienceAbout, setExperienceAbout] = useState('')
  const otherFeedbackRef = useRef()
  const [otherFeedback, setOtherFeedback] = useState('')
  const [futureResearch, setFutureResearch] = useState('')
  const futureResearchEmailRef = useRef()
  const [futureResearchEmail, setFutureResearchEmail] = useState('')

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
    if (e.target.name === 'relationship') {
      setRelationship(e.target.value)
    }

    if (e.target.name === 'relationshipOther') {
      setRelationshipOther(e.target.value)
    }

    if (e.target.name === 'role') {
      setRole(e.target.value)
    }

    if (e.target.name === 'roleOther') {
      setRoleOther(e.target.value)
    }

    if (e.target.name === 'experience') {
      setExperience(e.target.value)
    }

    if (e.target.name === 'experienceAbout') {
      setExperienceAbout(e.target.value)
    }

    if (e.target.name === 'otherFeedback') {
      setOtherFeedback(e.target.value)
    }

    if (e.target.name === 'futureResearch') {
      setFutureResearch(e.target.value)
    }

    if (e.target.name === 'futureResearchEmail') {
      setFutureResearchEmail(e.target.value)
    }
  }

  const validateForm = (fields) => {
    const formErrors = {}

    console.log('in feedback validate')

    if (validation.isEmpty(fields.relationship)) {
      formErrors.relationship = content.errors.relationship
    }

    if (fields.relationshipOther !== undefined && fields.relationship.toLowerCase() === 'other' && validation.isEmpty(fields.relationshipOther)) {
      formErrors.relationshipOther = content.errors.relationshipOther
    }

    if (validation.isEmpty(fields.role)) {
      formErrors.role = content.errors.role
    }

    if (fields.roleOther !== undefined && fields.role.toLowerCase() === 'other' && validation.isEmpty(fields.roleOther)) {
      formErrors.roleOther = content.errors.roleOther
    }

    if (validation.isEmpty(fields.experience)) {
      formErrors.experience = content.errors.experience
    }

    if (validation.isEmpty(fields.experienceAbout)) {
      formErrors.experienceAbout = content.errors.experienceAbout
    }

    if (validation.isEmpty(fields.otherFeedback)) {
      formErrors.otherFeedback = content.errors.otherFeedback
    }

    if (validation.isEmpty(fields.futureResearch)) {
      formErrors.futureResearch = content.errors.futureResearch
    }

    if (fields.futureResearchEmail !== undefined && fields.futureResearch.toLowerCase() === 'yes' && validation.isEmpty(fields.futureResearchEmail)) {
      formErrors.futureResearchEmail = content.errors.futureResearchEmail
    }

    return formErrors
  }

  const handleSubmit = (e) => {
    setErrors({})

    const formErrors = validateForm({
      relationship,
      relationshipOther,
      role,
      roleOther,
      experience,
      experienceAbout: experienceAboutRef.current.value,
      otherFeedback: otherFeedbackRef.current.value,
      futureResearch,
      futureResearchEmail
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
        <Radio
          id='relationship'
          name='relationship'
          legend={content.form.relationship.label}
          onChange={handleInputChange}
          value={relationship}
          error={errors.relationship}
          items={[
            { label: 'I work as an employee at the Department for Education (DfE)', value: 'DfE_Employee' },
            { label: 'I work as a contractor at the Department for Education (DfE)', value: 'DfE_Contractor' },
            { label: 'I work for another Government Department', value: 'Other_Department' },
            { label: 'I work outside of Government', value: 'Outside_Government' },
            { label: 'Other (please specify)', value: 'Other' }
          ]}
        />
        {relationship && relationship === 'Other' &&
        <Textarea
          inline
          ref={relationshipOtherRef}
          id='relationshipOther'
          name='relationshipOther'
          // label={content.form.relationship.label}
          // hint={content.form.relationship.hint}
          maxLength='3000'
          value={relationshipOther}
          error={errors.relationshipOther}
          required={relationship}
          onChange={handleInputChange}
        />
        }
        <Radio
          id='role'
          name='role'
          legend={content.form.role.label}
          onChange={handleInputChange}
          value={role}
          error={errors.role}
          items={[
            { label: 'Developer', value: 'Developer' },
            { label: 'Architect', value: 'Architect' },
            { label: 'Data Analyst / Scientist', value: 'Data_Analyst-Scientist' },
            { label: 'Product Owner', value: 'Product_Owner' },
            { label: 'Business Analyst', value: 'Business_Analyst' },
            { label: 'Service Designer', value: 'Service_Designer' },
            { label: 'Other (please specify)', value: 'Other' }
          ]}
        />
        {role && role === 'Other' &&
        <Textarea
          inline
          ref={roleOtherRef}
          id='roleOther'
          name='roleOther'
          // label={content.form.role.label}
          // hint={content.form.role.hint}
          maxLength='3000'
          value={roleOther}
          error={errors.roleOther}
          required={role}
          onChange={handleInputChange}
        />
        }
        <Radio
          id='experience'
          name='experience'
          legend={content.form.experience.label}
          onChange={handleInputChange}
          value={experience}
          error={errors.experience}
          items={[
            { label: '1 – Not satisfied at all​', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5 – Neither satisfied nor unsatisfied​', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10 – Completely satisfied​', value: '10' }
          ]}
        />
        <Textarea
          inline
          ref={experienceAboutRef}
          id='experienceAbout'
          name='experienceAbout'
          label={content.form.experienceAbout.label}
          hint={content.form.experienceAbout.hint}
          maxLength='3000'
          value={experienceAbout}
          error={errors.experienceAbout}
          onChange={handleInputChange}
        />
        <Textarea
          inline
          ref={otherFeedbackRef}
          id='otherFeedback'
          name='otherFeedback'
          label={content.form.otherFeedback.label}
          hint={content.form.otherFeedback.hint}
          maxLength='3000'
          value={otherFeedback}
          error={errors.otherFeedback}
          onChange={handleInputChange}
        />
        <Radio
          id='futureResearch'
          name='futureResearch'
          legend={content.form.futureResearch.label}
          hint={content.form.futureResearch.hint}
          onChange={handleInputChange}
          value={futureResearch}
          error={errors.futureResearch}
          items={[
            { label: 'Yes, I consent to be contacted about future user research sessions​', value: 'Yes' },
            { label: 'No, I do not consent to be contacted about future user research sessions​', value: 'No' }
          ]}
        />
        {futureResearch && futureResearch === 'Yes' &&
        <Input
          ref={futureResearchEmailRef}
          id='futureResearchEmail'
          name='futureResearchEmail'
          type='email'
          label={content.form.futureResearchEmail.label}
          hint={content.form.futureResearchEmail.hint}
          value={futureResearchEmail}
          error={errors.futureResearchEmail}
          required={futureResearch}
          onChange={handleInputChange}
        />
        }
        <button type='submit' className='govuk-button govuk-!-margin-right-1'>
          {content.buttons.submit}
        </button>
      </form>
    </Page>
  )
}

Feedback.getInitialProps = async ({ req, res }) => {
  if (req && req.method === 'POST') {
    try {
      const body = req._req ? req._req.body : req.body

      if (body.relationshipOther === undefined) {
        body.relationshipOther = 'N/A'
      }

      if (body.roleOther === undefined) {
        body.roleOther = 'N/A'
      }

      if (body.futureResearchEmail === undefined) {
        body.futureResearchEmail = 'N/A'
      }

      await send({
        'email-to': process.env.SUPPORT_EMAIL,
        subject: 'Feedback from the Find and Use an API service',
        'content-type': 'text/html',
        relationship: body.relationship,
        relationshipOther: body.relationshipOther,
        role: body.role,
        roleOther: body.roleOther,
        experience: body.experience,
        experienceAbout: body.experienceAbout,
        otherFeedback: body.otherFeedback,
        futureResearch: body.futureResearch,
        futureResearchEmail: body.futureResearchEmail
      }, 'feedback', req, res)

      const response = res._res ? res._res : res

      response.writeHead(301, { Location: '/feedback-submitted' })
      response.end()
    } catch (error) {
      return errorHandler(res, error, 500)
    }
  }
  return { status: 200 }
}

export default Feedback
