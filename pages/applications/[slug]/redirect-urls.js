import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Content from '../../../content.json'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import { Loading } from 'components/common/Loading'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import ContentBuilder from 'components/common/ContentBuilder'
import { getApplications, updateApplication } from 'actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ApplicationSideBar from 'components/common/ApplicationSideBar'
import InputWithValidation from 'components/common/forms/input-with-validation'
import ValidationMessages from 'components/common/forms/validation-messages'
import { urlPattern } from '../../../src/utils/patterns'

const page = 'Redirect URLs'

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

    if (!this.changeAppRedirectUrl.current.validateInput(e)) {
      this.changeAppRedirectUrl.current.validateInput(e)
      return false
    }

    const { application: { selectedApplication }, getApplications, updateApplication, user: { data } } = this.props

    if (selectedApplication.web.redirectUris.indexOf(this.state.updateRedirectUrlValue) > -1) {
      this.setState({ errors: [...this.state.errors, { message: 'Duplicate redirect URL' }] })
      return false
    }

    const modifiedArr = selectedApplication.web.redirectUris.map(url => url === this.state.redirectUrlToChange ? this.state.updateRedirectUrlValue : url)
    selectedApplication.web.redirectUris = modifiedArr
    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['signInNames.emailAddress'],
      userID: data.User.accountIdentifier,
      applicationId: selectedApplication.applicationId,
      description: selectedApplication.description,
      web: {
        redirectUris: selectedApplication.web.redirectUris
      }
    }

    const updateApp = await updateApplication(body)

    if (updateApp) {
      console.log('Successfully Updated!')
      this.setState({ redirectUrlToChange: '' })
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
    const { application: { selectedApplication }, getApplications, updateApplication, user: { data } } = this.props
    selectedApplication.web.redirectUris = selectedApplication.web.redirectUris.filter(e => e !== redirectUri)
    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['signInNames.emailAddress'],
      userID: data.User.accountIdentifier,
      applicationId: selectedApplication.applicationId,
      description: selectedApplication.description,
      web: {
        redirectUris: selectedApplication.web.redirectUris
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

    if (!this.appRedirectUrl.current.validateInput(e)) {
      this.appRedirectUrl.current.validateInput(e)
      return false
    }

    const { application: { selectedApplication }, getApplications, updateApplication, user: { data } } = this.props

    if (selectedApplication.web.redirectUris.indexOf(this.state.newRedirectUrl) > -1) {
      this.setState({ errors: [...this.state.errors, { message: 'Duplicate redirect URL' }] })
      return false
    }

    selectedApplication.web.redirectUris.push(this.state.newRedirectUrl)
    this.setState({ addingNewRedirectUrl: false, newRedirectUrl: '' })
    const body = {
      userName: `${data.User.idToken.given_name} ${data.User.idToken.family_name}`,
      userEmail: data.User.idToken['signInNames.emailAddress'],
      userID: data.User.accountIdentifier,
      applicationId: selectedApplication.applicationId,
      description: selectedApplication.description,
      web: {
        redirectUris: selectedApplication.web.redirectUris
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
    const {
      application: { selectedApplication },
      user: { data }
    } = this.props

    let isLoggedIn = false
    if (data && data.isAuthed) isLoggedIn = true
    if (!selectedApplication) return <Loading />

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <Header msalConfig={this.props.msalConfig} isLoggedIn={isLoggedIn} />
        <PhaseBanner />
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
                <a className='govuk-breadcrumbs__link' href={`/applications/${selectedApplication.applicationId}/details`}>{selectedApplication.applicationName}</a>
              </li>
              <li className='govuk-breadcrumbs__list-item' aria-current='page'>{page}</li>
            </ol>
          </div>
          <section className='mainWrapper govuk-!-margin-top-7'>
            <aside className='sideBar'>
              <div className='sideBar_content'>
                <ApplicationSideBar nav={Content.ApplicationManagement} app={selectedApplication} currentPage={page} />
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

                    <dl className='govuk-summary-list'>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Application:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          {(selectedApplication ? selectedApplication.applicationName : '')}
                        </dd>
                      </div>
                      <div className='govuk-summary-list__row'>
                        <dt className='govuk-summary-list__key'>
                          Environment:
                        </dt>
                        <dd className='govuk-summary-list__value'>
                          Sandbox
                        </dd>
                      </div>
                    </dl>

                    <ContentBuilder sectionNav={false} data={Content.ApplicationManagement[page].Content} />

                    <table className='govuk-table'>
                      <caption className='govuk-table__caption govuk-heading-m'>{page}</caption>
                      <tbody className='govuk-table__body'>
                        {selectedApplication && selectedApplication.web && selectedApplication.web.redirectUris && selectedApplication.web.redirectUris.map((redirectUri, i) => {
                          return (
                            <tr className='govuk-table__row' key={i}>
                              {this.state.redirectUrlToChange !== redirectUri && <th scope='row' className='govuk-table__header'>{redirectUri}</th>}
                              {this.state.redirectUrlToChange === redirectUri && (
                                <th scope='row' className='govuk-table__header'>
                                  <InputWithValidation
                                    ref={this.changeAppRedirectUrl}
                                    friendlyName={'redirect url'}
                                    name={'change-app-redirect-url'}
                                    inputId={'change-app-redirect-url'}
                                    inputErrorId={'error-msg-for__change-app-redirect-url'}
                                    placeholder={`https://www.`}
                                    isRequired
                                    pattern={urlPattern}
                                    onChange={(e) => this.updateRedirectUrl(e)}
                                    onFocus={() => this.showError()}
                                    inputValue={this.state.updateRedirectUrlValue}
                                    setErrors={() => this.showError()}
                                    inline
                                  />
                                </th>
                              )}

                              {this.state.redirectUrlToChange !== redirectUri && (
                                <td className='govuk-table__cell govuk-table__cell--numeric' style={{ minWidth: '145px' }}>
                                  <a href='#' className='govuk-link govuk-!-margin-right-2' onClick={(e) => this.changeRedirectUrl(e, redirectUri)}>Change</a>
                                  {selectedApplication.web.redirectUris.length > 1 && <a href='#' className='govuk-link' onClick={(e) => this.removeRedirectUrl(e, redirectUri)}>Remove</a>}
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
                              <InputWithValidation
                                ref={this.appRedirectUrl}
                                friendlyName={'redirect url'}
                                name={'app-redirect-url'}
                                inputId={'app-redirect-url'}
                                inputErrorId={'error-msg-for__app-redirect-url'}
                                placeholder={`https://www.`}
                                isRequired
                                pattern={urlPattern}
                                onChange={(e) => this.changeNewRedirectUrl(e)}
                                onFocus={() => this.showError()}
                                inputValue={this.state.newRedirectUrl}
                                setErrors={() => this.showError()}
                                inline
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

                    {selectedApplication.web.redirectUris.length === 5 && (
                      <div className='govuk-inset-text'>
                        This is the maximum number of redirect URIs. To add another, delete one first.
                      </div>
                    )}

                    {selectedApplication.web.redirectUris.length < 5 && (
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    application: state.application
  }
}

export { ApplicationRedirectUrls }
export default connect(mapStateToProps, { getApplications, updateApplication })(ApplicationRedirectUrls)
