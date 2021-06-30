import React from 'react'
import { getContent } from '../../content/application'
import AuthWarning from 'components/AuthWarning'
import PendingSubscriptionsPage from 'components/pages/PendingSubscriptionsPage'
import { useAuth } from '../../providers/AuthProvider'

import errorHandler from '../../lib/errorHandler'
import { getPendingSubscriptions } from '../../lib/pendingSubscriptionsService'

import { decodeToken } from 'checkAuth'

const content = getContent('subscriptions')

const Subscriptions = ({ subscriptions = [] }) => {
  const { user } = useAuth()

  return (
    <PendingSubscriptionsPage title={content.title}>
      <h1 className='govuk-heading-xl'>{content.title}</h1>

      {!user.getToken() && <AuthWarning warning={content.messages.authWarning} />}

      {subscriptions.length === 0 && user.getToken() && (
        <>
          <p>{content.messages.empty}</p>
        </>
      )}

      {subscriptions.length > 0 && user.getToken() && (
        <>

          <table className='govuk-table govuk-subscriptions__table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header'>{content.table.name}</th>
                <th scope='col' className='govuk-table__header'>{content.table.description}</th>
                <th scope='col' className='govuk-table__header'>{content.table.owner}</th>
                <th scope='col' className='govuk-table__header'>{content.table.id}</th>
                <th scope='col' className='govuk-table__header'>{content.table.date}</th>
                <th scope='col' className='govuk-table__header'>&nbsp;</th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>

              {subscriptions.length && subscriptions.map((subscription, i) => {
                return (
                  <tr className='govuk-table__row'>
                    <td className={`govuk-table__cell`}>
                      {subscription.properties.displayName}
                    </td>
                    <td className={`govuk-table__cell`}>
                      {/* {subscription.properties.description} needs to be added to API response or descoped */}
                    </td>
                    <td className={`govuk-table__cell`}>
                      {/* {subscription.properties.Owner}  needs to be added to API response or descoped */}
                    </td>
                    <td className={`govuk-table__cell`}>
                      {subscription.name}
                    </td>
                    <td className={`govuk-table__cell`}>
                      {subscription.properties.createdDate}
                    </td>
                    <td className={`govuk-table__cell`}>
                      <div><button className='govuk-button govuk-subscriptions__button'>{content.buttons.approve}</button></div>
                      <div><button className='govuk-button govuk-subscriptions__button govuk-button--warning'>{content.buttons.reject}</button></div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}

    </PendingSubscriptionsPage>
  )
}

Subscriptions.getInitialProps = async ({ req, res }) => {
  try {
    const token = decodeToken(req, res)
    if (!token) return { subscriptions: [] }

    const subscriptions = await getPendingSubscriptions({ accountIdentifier: token.sub }, res)
    if (!subscriptions) return errorHandler(res)

    return {
      subscriptions
    }
  } catch (error) {
    return errorHandler(res, error, 500)
  }
}

export default Subscriptions
