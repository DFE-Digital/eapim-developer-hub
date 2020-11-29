import React, { useState, useRef } from 'react'
import { getContent } from '../../../content/applicationManagement'
import ContentBuilder from 'components/ContentBuilder'
import ErrorPage from 'components/pages/ErrorPage'
import ApplicationPage from 'components/pages/ApplicationPage'

import { getApplication, updateApplication } from '../../../lib/applicationService'
import errorHandler from '../../../lib/errorHandler'

import Loader from 'components/Loader'
import RedirectURL from 'components/RedirectURL'
import RedirectURLAdd from 'components/RedirectURLAdd'
import { useAuth } from '../../../providers/AuthProvider'

import * as validation from '../../../src/utils/validation'

const content = getContent('redirect-urls')

const ApplicationRedirectUrls = ({ application, router, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  const { user } = useAuth()

  const addRef = useRef()
  const changeRef = useRef()

  const [errors, setErrors] = useState({})

  const [adding, setAdding] = useState(false)
  const [changing, setChanging] = useState(null)
  const [saving, setSaving] = useState(false)

  const validateForm = (value, type) => {
    const formErrors = {}

    if (validation.isEmpty(value)) {
      formErrors[type] = content.errors.empty
    }

    if (!validation.isValidURL(value)) {
      formErrors[type] = content.errors.invalid
    }

    if (application.web.redirectUris.indexOf(value) > -1) {
      formErrors[type] = content.errors.duplicate
    }

    return formErrors
  }

  const resetState = () => {
    setErrors({})
    setAdding(false)
    setChanging(null)
    setSaving(false)
  }

  const onChange = (e, url) => {
    e.preventDefault()
    setChanging(url)
  }

  const onCancel = (e) => {
    e.preventDefault()
    resetState()
  }

  const onSave = async (type, ref, oldUrl) => {
    setErrors({})

    const formErrors = validateForm(ref.current.value, type)

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors)
      return false
    }

    setSaving(true)

    const updatedUrls = [...application.web.redirectUris]

    if (type === 'add') {
      updatedUrls.push(ref.current.value)
    } else {
      const index = updatedUrls.indexOf(oldUrl)
      if (index > -1) updatedUrls[index] = ref.current.value
    }

    const body = {
      userName: user.name(),
      userEmail: user.email(),
      userID: user.id(),
      applicationId: application.applicationId,
      description: application.description,
      web: {
        redirectUris: updatedUrls
      }
    }

    try {
      const result = await updateApplication(body)

      if (result) {
        ref.current.value = ''
        application.web.redirectUris = updatedUrls
        resetState()
      }
    } catch (error) {
      console.log(`Error updating application: ${error}`)
      resetState()
    }
  }

  const onRemove = async (url) => {
    setSaving(true)

    const urls = [...application.web.redirectUris]
    const updatedUrls = urls.filter(e => e !== url)

    const body = {
      userName: user.name(),
      userEmail: user.email(),
      userID: user.id(),
      applicationId: application.applicationId,
      description: application.description,
      web: {
        redirectUris: updatedUrls
      }
    }

    try {
      const result = await updateApplication(body)

      if (result) {
        console.log('Successfully Removed!')
        application.web.redirectUris = updatedUrls
        resetState()
      }
    } catch (error) {
      console.log(`Error removing redirect url: ${error}`)
      resetState()
    }
  }

  return (
    <ApplicationPage title={content.title} router={router} application={application} errors={errors}>
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-full'>
          <h1 className='govuk-heading-xl'>{content.title}</h1>

          <ContentBuilder sectionNav={false} data={content.content} />

          <dl className='govuk-summary-list'>
            <div className='govuk-summary-list__row'>
              <dt className='govuk-summary-list__key'>
                Application:
              </dt>
              <dd className='govuk-summary-list__value'>
                {application.applicationName}
              </dd>
            </div>
          </dl>

          <table className='govuk-table'>
            <caption className='govuk-table__caption govuk-heading-m'>
              {content.title}
              {saving && <Loader style={{ position: 'absolute', right: 0 }} ariaText={content.a11y.saving} />}
            </caption>
            <tbody className='govuk-table__body'>
              {application.web.redirectUris.map((url, index) => {
                return (
                  <tr className='govuk-table__row' key={url + index}>
                    <RedirectURL
                      ref={changeRef}
                      url={url}
                      urls={application.web.redirectUris}
                      changing={changing === url}
                      onChange={onChange}
                      onSave={onSave}
                      onRemove={onRemove}
                      onCancel={onCancel}
                      error={errors.change}
                    />
                  </tr>
                )
              })}
              {adding && (
                <tr className='govuk-table__row'>
                  <RedirectURLAdd
                    ref={addRef}
                    type='add'
                    onSave={onSave}
                    onCancel={onCancel}
                    error={errors.add}
                  />
                </tr>
              )}
            </tbody>
          </table>

          {application.web.redirectUris.length === 5 && (
            <div className='govuk-inset-text'>
              {content.messages.maximum}
            </div>
          )}

          {application.web.redirectUris.length < 5 && (
            <button type='button' className='govuk-button' disabled={adding} onClick={() => setAdding(!adding)}>
              {content.buttons.add}
            </button>
          )}
        </div>
      </div>
    </ApplicationPage>
  )
}

ApplicationRedirectUrls.getInitialProps = async ({ res, query }) => {
  try {
    const application = await getApplication(query.slug)
    if (!application) return errorHandler(res)

    return {
      id: query.slug,
      application
    }
  } catch (error) {
    return errorHandler(error, res, 500)
  }
}

ApplicationRedirectUrls.displayName = 'Application Redirect Urls'

export default ApplicationRedirectUrls
