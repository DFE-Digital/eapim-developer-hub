import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../../content.json'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import ContentBuilder from 'components/common/ContentBuilder'
import { getApplications, updateApplication } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ApplicationSideBar from 'components/common/ApplicationSideBar'
import ValidationMessages from 'components/common/forms/validation-messages'

import { getApplication } from '../../../lib/applicationService'
import Input from 'components/common/form/input'

import { isEmpty, isValidURL } from 'utils/validation'

const page = 'Redirect URLs'

const EMPTY_MESSAGE = 'Enter a redirect URL'
const INVALID_MESSAGE = 'Invalid URL. Redirect URL must contain https:// and be a valid URL. Localhost domains are allowed.'
const DUPLICATE_MESSAGE = 'Duplicate redirect URL'

class ApplicationRedirectUrls extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newRedirectUrl: '',
      addingNewRedirectUrl: false,
      redirectUrlToChange: '',
      updateRedirectUrlValue: '',
      errors: []
    }

    this.appRedirectUrl = React.createRef()
    this.changeAppRedirectUrl = React.createRef()
  }

  changeRedirectUrl = (e, redirectUri) => {
    e.preventDefault()
    this.setState({ redirectUrlToChange: redirectUri, updateRedirectUrlValue: redirectUri })
  }

  updateRedirectUrl = (e) => {
    this.setState({ updateRedirectUrlValue: e.target.value })
  }

  cancelRedirectUrl = (e) => {
    e.preventDefault()
    this.setState({ redirectUrlToChange: '', errors: [] })
  }

  async saveRedirectUrl (e) {
    e.preventDefault()

    if (isEmpty(this.changeAppRedirectUrl.current.value)) {
      this.setState({ errors: [{ id: 'change-app-redirect-url', message: EMPTY_MESSAGE }] })
      return false
    }

    if (!isValidURL(this.changeAppRedirectUrl.current.value)) {
      this.setState({ errors: [{ id: 'change-app-redirect-url', message: INVALID_MESSAGE }] })
      return false
    }

    const { application, getApplications, updateApplication, user: { data } } = this.props

    if (application.web.redirectUris.indexOf(this.state.updateRedirectUrlValue) > -1) {
      this.setState({ errors: [{ id: 'change-app-redirect-url', message: DUPLICATE_MESSAGE }] })
      return false
    }

    const modifiedArr = application.web.redirectUris.map(url => url === this.state.redirectUrlToChange ? this.state.updateRedirectUrlValue : url)

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
      this.setState({ redirectUrlToChange: '', errors: [] })
      getApplications(data.User)
    }
  }

  addNewRedirectUrl = () => {
    this.setState({ addingNewRedirectUrl: true })
  }

  changeNewRedirectUrl = (e) => {
    this.setState({ newRedirectUrl: e.target.value })
  }

  cancelNewRedirectUrl = (e) => {
    e.preventDefault()
    this.setState({ addingNewRedirectUrl: false, newRedirectUrl: '', errors: [] })
  }

  async removeRedirectUrl (e, redirectUri) {
    e.preventDefault()
    const { application, getApplications, updateApplication, user: { data } } = this.props

    application.web.redirectUris = application.web.redirectUris.filter(e => e !== redirectUri)
    this.setState({})

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

  async saveNewRedirectUrl (e) {
    e.preventDefault()

    if (isEmpty(this.appRedirectUrl.current.value)) {
      this.setState({ errors: [{ id: 'app-redirect-url', message: EMPTY_MESSAGE }] })
      return false
    }

    if (!isValidURL(this.appRedirectUrl.current.value)) {
      this.setState({ errors: [{ id: 'app-redirect-url', message: INVALID_MESSAGE }] })
      return false
    }

    const { application, getApplications, updateApplication, user: { data } } = this.props

    if (application.web.redirectUris.indexOf(this.state.newRedirectUrl) > -1) {
      this.setState({ errors: [{ id: 'app-redirect-url', message: DUPLICATE_MESSAGE }] })
      return false
    }

    application.web.redirectUris.push(this.state.newRedirectUrl)
    this.setState({ addingNewRedirectUrl: false, newRedirectUrl: '', errors: [] })

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

  showError = () => {
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
      this.setState({ errors: validationErrors })
    }, 0)
  }

  render () {
    const { application } = this.props

    if (!application) return <Loading />

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <div className='govuk-width-container'>
          <div className='govuk-breadcrumbs'>
            <ol className='govuk-breadcrumbs__list'>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href={Content['Home'].Url}>{Content['Home'].Page}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href='/applications'>Applications</a>
              </li>
              <li className='govuk-breadcrumbs__list-item'>
                <a className='govuk-breadcrumbs__link' href={`/applications/${application.applicationId}/details`}>{application.applicationName}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item' aria-current='page'>{page}</li>
            </ol>
          </div>
          <section className='mainWrapper govuk-!-margin-top-7'>
            <aside className='sideBar'>
              <div className='sideBar_content'>
                <ApplicationSideBar nav={Content.ApplicationManagement} app={application} currentPage={page} />
              </div>
            </aside>

            <main className='mainContent' id='main-content' role='main'>
              <div className='govuk-main-wrapper govuk-!-padding-top-0'>
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-full'>
                    <ValidationMessages errors={this.state.errors} />
                  </div>
                </div>
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
                              {this.state.redirectUrlToChange !== redirectUri && <th scope='row' className='govuk-table__header'>{redirectUri}</th>}
                              {this.state.redirectUrlToChange === redirectUri && (
                                <th scope='row' className='govuk-table__header'>
                                  <Input
                                    inline
                                    required
                                    ref={this.changeAppRedirectUrl}
                                    name='change-app-redirect-url'
                                    id='change-app-redirect-url'
                                    placeholder='https://www.'
                                    value={this.state.updateRedirectUrlValue}
                                    onChange={this.updateRedirectUrl}
                                    error={this.state.errors[0] ? this.state.errors[0].message : null}
                                  />
                                </th>
                              )}

                              {this.state.redirectUrlToChange !== redirectUri && (
                                <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                                  <a href='#' className='govuk-link govuk-!-margin-right-2' onClick={(e) => this.changeRedirectUrl(e, redirectUri)}>Change</a>
                                  {application.web.redirectUris.length > 1 && <a href='#' className='govuk-link' onClick={(e) => this.removeRedirectUrl(e, redirectUri)}>Remove</a>}
                                </td>
                              )}
                              {this.state.redirectUrlToChange === redirectUri && (
                                <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                                  <a href='#' className='govuk-link govuk-!-margin-right-2' onClick={(e) => this.saveRedirectUrl(e, redirectUri)}>Save</a> <a href='#' className='govuk-link' onClick={(e) => this.cancelRedirectUrl(e)}>Cancel</a>
                                </td>
                              )}
                            </tr>
                          )
                        })}
                        {this.state.addingNewRedirectUrl && (
                          <tr className='govuk-table__row'>
                            <th scope='row' className='govuk-table__header'>
                              <Input
                                inline
                                required
                                ref={this.appRedirectUrl}
                                name='app-redirect-url'
                                id='app-redirect-url'
                                placeholder='https://www.'
                                value={this.state.newRedirectUrl}
                                onChange={this.changeNewRedirectUrl}
                                error={this.state.errors[0] ? this.state.errors[0].message : null}
                              />
                            </th>
                            <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                              <a href='#' onClick={(e) => this.saveNewRedirectUrl(e)} className='govuk-link govuk-!-margin-right-2'>Save</a>
                              <a href='#' className='govuk-link' onClick={(e) => this.cancelNewRedirectUrl(e)}>Cancel</a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {application.web.redirectUris.length === 5 && (
                      <div className='govuk-inset-text'>
                        This is the maximum number of redirect URIs. To add another, delete one first.
                      </div>
                    )}

                    {application.web.redirectUris.length < 5 && (
                      <button type='button' className='govuk-button' disabled={this.state.addingNewRedirectUrl} onClick={() => this.addNewRedirectUrl()}>Add a redirect url</button>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </section>
        </div>
      </Fragment>
    )
  }
}

ApplicationRedirectUrls.getInitialProps = async ({ req, query }) => {
  try {
    const application = await getApplication(query.slug)

    return {
      id: query.slug,
      application
    }
  } catch (error) {
    console.log(`Error getting application: ${error}`)
    return {
      error,
      id: query.slug
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationRedirectUrls.displayName = 'Application Redirect Urls'

export { ApplicationRedirectUrls }
export default connect(mapStateToProps, { getApplications, updateApplication })(ApplicationRedirectUrls)
