import moment from 'moment'
import fetch from 'isomorphic-unfetch'
import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Content from '../../../content.json'

import ReturnTo from 'components/common/ReturnTo'
import AccessChecker from 'components/common/AccessChecker'
import { Loading } from 'components/common/Loading'
import ContentBuilder from 'components/common/ContentBuilder'
import { PrivateRoute } from 'components/common/PrivateRoute'
import ApplicationSideBar from 'components/common/ApplicationSideBar'

import { getApplication } from '../../../lib/applicationService'

const page = 'Client secrets'

const ApplicationClientSecrets = ({ id, user, newClientKey, newClientKeyDisplayName, startDateTime, endDateTime, application, msalConfig }) => {
  const router = useRouter()

  const [copied, setCopied] = useState(false)
  const [primaryRegenerating, setPrimaryRegenerating] = useState(false)
  const [secondaryRegenerating, setSecondaryRegenerating] = useState(false)

  const copyToClipboard = (e, text) => {
    e.preventDefault()
    const textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopied(true)
  }

  const isLoggedIn = !!((user.data && user.data.isAuthed))

  if (!id) return <Loading />
  if (!application) return <Loading />

  application.passwordCredentials.sort((a, b) => {
    if (a.displayName < b.displayName) { return -1 }
    if (a.displayName > b.displayName) { return 1 }
    return 0
  })

  const primary = application.passwordCredentials[0]
  const secondary = application.passwordCredentials[1]

  return (
    <Fragment>
      <PrivateRoute redirect={'/applications'} />
      <ReturnTo parentPath={router.asPath} />
      <AccessChecker msalConfig={msalConfig} />

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
              <a className='govuk-breadcrumbs__link' href={`/applications/${id}/details`}>{application.applicationName}</a>
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
                  <h1 className='govuk-heading-xl'>{page}</h1>
                  <p className='govuk-body'>
                    The client secret is a secret known only to the application and the authorisation server. You must add the client secret to the request header whenever you make a request to an API.
                  </p>
                  <p className='govuk-body'>
                    Primary and secondary secrets are provided in case you need to switch between keys.
                  </p>
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
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th scope='col' className='govuk-table__header'>Primary Secret</th>
                        <th scope='col' className='govuk-table__header'>Created</th>
                        <th scope='col' className='govuk-table__header'>Expires</th>
                        <th scope='col' className='govuk-table__header govuk-table__header--numeric'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      {newClientKey && newClientKeyDisplayName === 'Primary'
                        ? (
                          <tr className='govuk-table__row'>
                            <td className='govuk-table__cell middle'>{newClientKey}</td>
                            <td className='govuk-table__cell middle'>{moment(startDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle'>{moment(endDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
                              <button type='button' className='govuk-button govuk-!-margin-0' onClick={(e) => copyToClipboard(e, newClientKey)}>
                                {copied ? `Copied` : `Copy`}
                              </button>
                            </td>
                          </tr>
                        )
                        : (
                          <tr className='govuk-table__row' key={primary.keyId}>
                            <td className='govuk-table__cell middle'>
                              {primary.hint}••••••••••••••••••••••••••••••••
                            </td>
                            <td className='govuk-table__cell middle'>{moment(primary.startDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle'>{moment(primary.endDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
                              {isLoggedIn &&
                              <form method='POST' action={`/applications/${id}/client-secrets`}>
                                <input type='hidden' name='userName' value={`${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`} />
                                <input type='hidden' name='userEmail' value={user.data.User.idToken['email']} />
                                <input type='hidden' name='userID' value={user.data.User.accountIdentifier} />
                                <input type='hidden' name='organization' value={user.data.User.idToken.extension_OrganizationName} />
                                <input type='hidden' name='applicationId' value={id} />
                                <input type='hidden' name='KeyDisplayName' value={primary.displayName} />
                                <input type='hidden' name='KeyId' value={primary.keyId} />
                                <button type='submit' onClick={() => setPrimaryRegenerating(true)} disabled={secondaryRegenerating === true} className='govuk-button govuk-!-margin-bottom-0'>
                                  {primaryRegenerating ? `Regenerating...` : `Regenerate`}
                                </button>
                              </form>
                              }
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>

                  <table className='govuk-table'>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th scope='col' className='govuk-table__header'>Secondary Secret</th>
                        <th scope='col' className='govuk-table__header'>Created</th>
                        <th scope='col' className='govuk-table__header'>Expires</th>
                        <th scope='col' className='govuk-table__header govuk-table__header--numeric'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      {newClientKey && newClientKeyDisplayName === 'Secondary'
                        ? (
                          <tr className='govuk-table__row'>
                            <td className='govuk-table__cell middle'>{newClientKey}</td>
                            <td className='govuk-table__cell middle'>{moment(startDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle'>{moment(endDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
                              <button type='button' className='govuk-button govuk-!-margin-0' onClick={(e) => copyToClipboard(e, newClientKey)}>
                                {copied ? `Copied` : `Copy`}
                              </button>
                            </td>
                          </tr>
                        )
                        : (
                          <tr className='govuk-table__row'>
                            <td className='govuk-table__cell middle'>
                              {secondary.hint}••••••••••••••••••••••••••••••••
                            </td>
                            <td className='govuk-table__cell middle'>{moment(secondary.startDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle'>{moment(secondary.endDateTime).format('DD MMM YYYY')}</td>
                            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
                              {isLoggedIn &&
                              <form method='POST' action={`/applications/${id}/client-secrets`}>
                                <input type='hidden' name='userName' value={`${user.data.User.idToken.given_name} ${user.data.User.idToken.family_name}`} />
                                <input type='hidden' name='userEmail' value={user.data.User.idToken['email']} />
                                <input type='hidden' name='userID' value={user.data.User.accountIdentifier} />
                                <input type='hidden' name='organization' value={user.data.User.idToken.extension_OrganizationName} />
                                <input type='hidden' name='applicationId' value={id} />
                                <input type='hidden' name='KeyDisplayName' value={secondary.displayName} />
                                <input type='hidden' name='KeyId' value={secondary.keyId} />
                                <button type='submit' onClick={() => setSecondaryRegenerating(true)} disabled={primaryRegenerating === true} className='govuk-button govuk-!-margin-bottom-0'>
                                  {secondaryRegenerating ? `Regenerating...` : `Regenerate`}
                                </button>
                              </form>
                              }
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>

                  <ContentBuilder sectionNav={false} data={Content.ApplicationManagement[page].Content} />

                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationClientSecrets.getInitialProps = async ({ req, query }) => {
  if (req && req.method === 'GET') {
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

  if (req && req.method === 'POST') {
    const { userName, userEmail, userID, applicationId, KeyId, KeyDisplayName } = req.body

    try {
      const url = `${process.env.PLATFORM_API_URL}/GenerateApplicationSecret`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY },
        body: JSON.stringify({ userName, userEmail, userID, applicationId, KeyId, KeyDisplayName })
      })

      if (!response.ok) throw new Error('Error generating a new key')

      const data = await response.json()

      if (response.ok) {
        const application = await getApplication(query.slug)
        const newClientKey = data[`${KeyDisplayName}Secret`]

        const keyObject = data.passwordCredentials.find(item => item.displayName === KeyDisplayName)
        const { startDateTime, endDateTime } = keyObject

        return {
          newClientKey,
          application,
          startDateTime,
          endDateTime,
          newClientKeyDisplayName: KeyDisplayName,
          id: data.applicationId
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    id: query.slug
  }
}

ApplicationClientSecrets.displayName = 'ApplicationClientSecrets'

export { ApplicationClientSecrets }
export default connect(mapStateToProps, null)(ApplicationClientSecrets)
