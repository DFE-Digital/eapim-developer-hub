import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import Content from '../../../content.json'
import ContentBuilder from 'components/common/ContentBuilder'
import { getApplications, updateApplication } from 'actions/application'
import ApplicationSideBar from 'components/common/ApplicationSideBar'
import ValidationMessages from 'components/common/forms/validation-messages'
import Input from 'components/common/form/input'
import ErrorPage from 'components/ErrorPage'
import Page from 'components/Page'

import { getApplication } from '../../../lib/applicationService'
import getInitialPropsErrorHandler from '../../../lib/getInitialPropsErrorHandler'

import { isEmpty, isValidURL } from 'utils/validation'

const page = 'Redirect URLs'

const EMPTY_MESSAGE = 'Enter a redirect URL'
const INVALID_MESSAGE = 'Invalid URL. Redirect URL must contain https:// and be a valid URL. Localhost domains are allowed.'
const DUPLICATE_MESSAGE = 'Duplicate redirect URL'

const ApplicationRedirectUrls = ({ user, application, getApplications, updateApplication, router, errorCode }) => {
  const [newRedirectUrl, setNewRedirectUrl] = useState('')
  const [addingNewRedirectUrl, setAddingNewRedirectUrl] = useState(false)
  const [redirectUrlToChange, setRedirectUrlToChange] = useState('')
  const [updateRedirectUrlValue, setUpdateRedirectUrlValue] = useState('')
  const [errors, setErrors] = useState([])

  const appRedirectUrl = useRef()
  const changeAppRedirectUrl = useRef()

  const { data } = user

  const changeRedirectUrl = (e, redirectUri) => {
    e.preventDefault()
    setRedirectUrlToChange(redirectUri)
    setUpdateRedirectUrlValue(redirectUri)
  }

  const updateRedirectUrl = (e) => {
    setUpdateRedirectUrlValue(e.target.value)
  }

  const cancelRedirectUrl = (e) => {
    e.preventDefault()
    setRedirectUrlToChange('')
    setErrors([])
  }

  const saveRedirectUrl = async (e) => {
    e.preventDefault()

    if (isEmpty(changeAppRedirectUrl.current.value)) {
      setErrors([{ id: 'change-app-redirect-url', message: EMPTY_MESSAGE }])
      return false
    }

    if (!isValidURL(changeAppRedirectUrl.current.value)) {
      setErrors([{ id: 'change-app-redirect-url', message: INVALID_MESSAGE }])
      return false
    }

    if (application.web.redirectUris.indexOf(updateRedirectUrlValue) > -1) {
      setErrors([{ id: 'change-app-redirect-url', message: DUPLICATE_MESSAGE }])
      return false
    }

    const modifiedArr = application.web.redirectUris.map(url => url === redirectUrlToChange ? updateRedirectUrlValue : url)
    application.web.redirectUris = modifiedArr

    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['email'],
      userID: data.User.accountIdentifier,
      applicationId: application.applicationId,
      description: application.description,
      web: {
        redirectUris: application.web.redirectUris
      }
    }

    const updateApp = await updateApplication(body)

    if (updateApp) {
      console.log('Successfully Updated!')
      setRedirectUrlToChange('')
      setErrors([])
      getApplications(data.User)
    }
  }

  const addNewRedirectUrl = () => {
    setAddingNewRedirectUrl(true)
  }

  const changeNewRedirectUrl = (e) => {
    setNewRedirectUrl(e.target.value)
  }

  const cancelNewRedirectUrl = (e) => {
    e.preventDefault()
    setAddingNewRedirectUrl(false)
    setNewRedirectUrl('')
    setErrors([])
  }

  const removeRedirectUrl = async (e, redirectUri) => {
    e.preventDefault()
    application.web.redirectUris = application.web.redirectUris.filter(e => e !== redirectUri)

    setErrors([])
    setAddingNewRedirectUrl('')
    setNewRedirectUrl('')
    setRedirectUrlToChange('')
    setUpdateRedirectUrlValue('')

    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['email'],
      userID: data.User.accountIdentifier,
      applicationId: application.applicationId,
      description: application.description,
      web: {
        redirectUris: application.web.redirectUris
      }
    }

    const updateApp = await updateApplication(body)

    if (updateApp) {
      console.log('Successfully Removed!')
      getApplications(data.User)
    }
  }

  const saveNewRedirectUrl = async (e) => {
    e.preventDefault()

    if (isEmpty(appRedirectUrl.current.value)) {
      setErrors([{ id: 'app-redirect-url', message: EMPTY_MESSAGE }])
      return false
    }

    if (!isValidURL(appRedirectUrl.current.value)) {
      setErrors([{ id: 'app-redirect-url', message: INVALID_MESSAGE }])
      return false
    }

    if (application.web.redirectUris.indexOf(newRedirectUrl) > -1) {
      setErrors([{ id: 'app-redirect-url', message: DUPLICATE_MESSAGE }])
      return false
    }

    application.web.redirectUris.push(newRedirectUrl)

    setAddingNewRedirectUrl(false)
    setNewRedirectUrl('')
    setErrors([])

    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['email'],
      userID: data.User.accountIdentifier,
      applicationId: application.applicationId,
      description: application.description,
      web: {
        redirectUris: application.web.redirectUris
      }
    }

    const updateApp = await updateApplication(body)

    if (updateApp) {
      console.log('Successfully Added!')
      getApplications(data.User)
    }
  }

  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  return (
    <Page router={router} sidebarComponent={<ApplicationSideBar nav={Content.ApplicationManagement} app={application} currentPage={page} />}>
      <ValidationMessages errors={errors} />
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-full'>
          <h1 className='govuk-heading-xl'>{page}</h1>

          <ContentBuilder sectionNav={false} data={Content.ApplicationManagement[page].Content} />

          <dl className='govuk-summary-list'>
            <div className='govuk-summary-list__row'>
              <dt className='govuk-summary-list__key'>
                Application:
              </dt>
              <dd className='govuk-summary-list__value'>
                {(application ? application.applicationName : '')}
              </dd>
            </div>
          </dl>

          <table className='govuk-table'>
            <caption className='govuk-table__caption govuk-heading-m'>{page}</caption>
            <tbody className='govuk-table__body'>
              {application && application.web && application.web.redirectUris && application.web.redirectUris.map((redirectUri, i) => {
                return (
                  <tr className='govuk-table__row' key={i}>
                    {redirectUrlToChange !== redirectUri && <th scope='row' className='govuk-table__header'>{redirectUri}</th>}
                    {redirectUrlToChange === redirectUri && (
                      <th scope='row' className='govuk-table__header'>
                        <Input
                          inline
                          required
                          ref={changeAppRedirectUrl}
                          name='change-app-redirect-url'
                          id='change-app-redirect-url'
                          placeholder='https://www.'
                          value={updateRedirectUrlValue}
                          onChange={updateRedirectUrl}
                          error={errors[0] ? errors[0].message : null}
                        />
                      </th>
                    )}
                    {redirectUrlToChange !== redirectUri && (
                      <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                        <a role='button' href='#' className='govuk-link govuk-!-margin-right-2' onClick={(e) => changeRedirectUrl(e, redirectUri)}>Change</a>
                        {application.web.redirectUris.length > 1 && <a role='button' href='#' className='govuk-link' onClick={(e) => removeRedirectUrl(e, redirectUri)}>Remove</a>}
                      </td>
                    )}
                    {redirectUrlToChange === redirectUri && (
                      <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                        <a role='button' href='#' className='govuk-link govuk-!-margin-right-2' onClick={(e) => saveRedirectUrl(e, redirectUri)}>Save</a>
                        <a role='button' href='#' className='govuk-link' onClick={(e) => cancelRedirectUrl(e)}>Cancel</a>
                      </td>
                    )}
                  </tr>
                )
              })}
              {addingNewRedirectUrl && (
                <tr className='govuk-table__row'>
                  <th scope='row' className='govuk-table__header'>
                    <Input
                      inline
                      required
                      ref={appRedirectUrl}
                      name='app-redirect-url'
                      id='app-redirect-url'
                      placeholder='https://www.'
                      value={newRedirectUrl}
                      onChange={changeNewRedirectUrl}
                      error={errors[0] ? errors[0].message : null}
                    />
                  </th>
                  <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                    <a role='button' href='#' onClick={(e) => saveNewRedirectUrl(e)} className='govuk-link govuk-!-margin-right-2'>Save</a>
                    <a role='button' href='#' className='govuk-link' onClick={(e) => cancelNewRedirectUrl(e)}>Cancel</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {application.web.redirectUris.length === 5 && (
            <div className='govuk-inset-text'>
              This is the maximum number of redirect URLs. To add another, delete one first.
            </div>
          )}

          {application.web.redirectUris.length < 5 && (
            <button type='button' className='govuk-button' disabled={addingNewRedirectUrl} onClick={() => addNewRedirectUrl()}>Add a redirect url</button>
          )}
        </div>
      </div>
    </Page>
  )
}

ApplicationRedirectUrls.getInitialProps = async ({ res, query }) => {
  try {
    const application = await getApplication(query.slug)
    if (!application) return getInitialPropsErrorHandler(res, 404)

    return {
      id: query.slug,
      application
    }
  } catch (error) {
    return getInitialPropsErrorHandler(res, 500, error)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationRedirectUrls.displayName = 'Application Redirect Urls'

export default connect(mapStateToProps, { getApplications, updateApplication })(ApplicationRedirectUrls)
