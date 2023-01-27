import { format, parseISO } from 'date-fns'
import React from 'react'
import { getContent } from '../../../../content/applicationManagement'
import ApplicationManagementPage from 'components/pages/ApplicationManagementPage'
import ErrorPage from 'components/pages/ErrorPage'
import ContentBuilder from 'components/ContentBuilder'

import { getApplication } from '../../../../lib/applicationService'

import { checkBasicAuth, checkUserOwnsApp } from 'checkAuth'

const content = getContent('client-secrets')

const ApplicationClientSecrets = ({ id, application, serverError }) => {
  if (serverError) return <ErrorPage {...serverError} />

  application.passwordCredentials.sort((a, b) => {
    if (a.displayName < b.displayName) { return -1 }
    if (a.displayName > b.displayName) { return 1 }
    return 0
  })

  const primary = application.passwordCredentials[0]
  const secondary = application.passwordCredentials[1]

  return (
    <ApplicationManagementPage title={content.title} application={application}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      <ContentBuilder sectionNav={false} data={content.intro} />

      <dl className='govuk-summary-list'>
        <div className='govuk-summary-list__row'>
          <dt className='govuk-summary-list__key'>Application:</dt>
          <dd className='govuk-summary-list__value'>{application.applicationName}</dd>
        </div>
      </dl>

      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>{content.tableHeadings.primarySecret}</th>
            <th scope='col' className='govuk-table__header'>{content.tableHeadings.created}</th>
            <th scope='col' className='govuk-table__header'>{content.tableHeadings.expires}</th>
            <th scope='col' className='govuk-table__header govuk-table__header--numeric'>{content.tableHeadings.action}</th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row' key={primary.keyId}>
            <td className='govuk-table__cell middle'>
              {primary.hint}••••••••••••••••••••••••••••••••
            </td>
            <td className='govuk-table__cell middle'>{format(parseISO(primary.startDateTime), 'dd MMM yyyy')}</td>
            <td className='govuk-table__cell middle'>{format(parseISO(primary.endDateTime), 'dd MMM yyyy')}</td>
            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
              <a href={`/applications/${id}/client-secrets/${primary.keyId}`} className='govuk-button govuk-!-margin-bottom-0'>
                {content.buttons.regenerate}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header'>{content.tableHeadings.secondarySecret}</th>
            <th scope='col' className='govuk-table__header'>{content.tableHeadings.created}</th>
            <th scope='col' className='govuk-table__header'>{content.tableHeadings.expires}</th>
            <th scope='col' className='govuk-table__header govuk-table__header--numeric'>{content.tableHeadings.action}</th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell middle'>
              {secondary.hint}••••••••••••••••••••••••••••••••
            </td>
            <td className='govuk-table__cell middle'>{format(parseISO(secondary.startDateTime), 'dd MMM yyyy')}</td>
            <td className='govuk-table__cell middle'>{format(parseISO(secondary.endDateTime), 'dd MMM yyyy')}</td>
            <td className='govuk-table__cell middle govuk-table__cell--numeric'>
              <a href={`/applications/${id}/client-secrets/${secondary.keyId}`} className='govuk-button govuk-!-margin-bottom-0'>
                {content.buttons.regenerate}
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <ContentBuilder sectionNav={false} data={content.content} />
    </ApplicationManagementPage>
  )
}

export async function getServerSideProps (context) {
  const session = await checkBasicAuth(context.req, context.res)
  await checkUserOwnsApp(session, context.query.slug)

  const application = await getApplication(context.query.slug)
  if (!application) throw new Error('Forbidden')

  return {
    props: {
      id: context.query.slug,
      application
    }
  }
}

export default ApplicationClientSecrets
