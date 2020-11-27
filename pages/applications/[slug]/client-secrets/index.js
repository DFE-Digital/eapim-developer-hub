import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import Content from '../../../../content.json'

import Page from 'components/Page'
import ErrorPage from 'components/ErrorPage'
import ContentBuilder from 'components/ContentBuilder'

import { getApplication } from '../../../../lib/applicationService'
import getInitialPropsErrorHandler from '../../../../lib/getInitialPropsErrorHandler'

const page = 'Client secrets'

const ApplicationClientSecrets = ({ id, application, router, msalConfig, errorCode }) => {
  if (errorCode) return <ErrorPage statusCode={errorCode} router={router} />

  application.passwordCredentials.sort((a, b) => {
    if (a.displayName < b.displayName) { return -1 }
    if (a.displayName > b.displayName) { return 1 }
    return 0
  })

  const primary = application.passwordCredentials[0]
  const secondary = application.passwordCredentials[1]

  return (
    <Page title={page} router={router} sidebarContent={Content.ApplicationManagement} sidebarData={{ type: 'application', application }}>
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
            {application.applicationName}
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
          <tr className='govuk-table__row' key={primary.keyId}>
            <td className='govuk-table__cell middle'>
              {primary.hint}••••••••••••••••••••••••••••••••
            </td>
            <td className='govuk-table__cell middle'>{moment(primary.startDateTime).format('DD MMM YYYY')}</td>
            <td className='govuk-table__cell middle'>{moment(primary.endDateTime).format('DD MMM YYYY')}</td>
            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
              <a href={`/applications/${id}/client-secrets/${primary.keyId}`} className='govuk-button govuk-!-margin-bottom-0'>
                Regenerate
              </a>
            </td>
          </tr>
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
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell middle'>
              {secondary.hint}••••••••••••••••••••••••••••••••
            </td>
            <td className='govuk-table__cell middle'>{moment(secondary.startDateTime).format('DD MMM YYYY')}</td>
            <td className='govuk-table__cell middle'>{moment(secondary.endDateTime).format('DD MMM YYYY')}</td>
            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
              <a href={`/applications/${id}/client-secrets/${secondary.keyId}`} className='govuk-button govuk-!-margin-bottom-0'>
                Regenerate
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <ContentBuilder sectionNav={false} data={Content.ApplicationManagement[page].Content} />
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

ApplicationClientSecrets.getInitialProps = async ({ req, res, query }) => {
  if (req && req.method === 'GET') {
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

  return {
    id: query.slug
  }
}

ApplicationClientSecrets.displayName = 'Application Client Secrets'

export default connect(mapStateToProps, null)(ApplicationClientSecrets)
