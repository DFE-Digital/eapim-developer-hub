import React from 'react'
import APISubscriptionKey from './APISubscriptionKey'

const APISubscriptionKeys = ({ subscription, subscriptionKeys, showKeys, fetching, onViewKeys }) => {
  const subscriptionHasKeys = Object.keys(subscriptionKeys).length !== 0

  return (
    <table className='govuk-table govuk-!-margin-bottom-6'>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <th scope='row' className='govuk-table__header middle'>Subscription keys</th>
          <th className='govuk-table__header' />
          <th className='govuk-table__cell govuk-table__cell--numeric middle'>
            {!subscription.keys &&
              <a className='govuk-link' href='#' onClick={(e) => onViewKeys(e, subscription.id)}>
                {!subscriptionHasKeys && fetching ? 'Loading...' : (showKeys ? 'Hide keys' : 'View keys')}
              </a>}
          </th>
        </tr>
        {subscriptionHasKeys && showKeys && (
          <>
            <APISubscriptionKey name='Primary' subscriptionKey={subscriptionKeys.primaryKey} />
            <APISubscriptionKey name='Secondary' subscriptionKey={subscriptionKeys.secondaryKey} />
          </>
        )}
      </tbody>
    </table>
  )
}

export default APISubscriptionKeys
