import React from 'react'

const statusType = {
  default: { tag: 'green', button: 'subscribe' },
  active: { tag: 'turquoise', button: 'cancel' },
  pending: { tag: 'blue', button: 'cancel' },
  submitted: { tag: 'purple', button: 'cancel', text: 'pending' },
  cancelled: { tag: 'orange', button: 'subscribe' },
  rejected: { tag: 'red', button: 'cancel' },
  suspended: { tag: 'yellow', button: 'cancel' }
}

const APISubscription = ({ api, subscription, renderSubscribeButton, renderCancelButton, handleFetching, fetching }) => {
  const state = statusType[subscription.state] || statusType.default
  const apiName = api.name

  return (
    <table className='govuk-table govuk-!-margin-bottom-6' key={`${subscription.id}-${subscription.environment}`}>
      <thead className='govuk-table__head'>
        <tr className='govuk-table__row'>
          <th scope='row' className='govuk-table__header govuk-!-width-one-half'>{subscription.environment}</th>
          <td scope='row' className='govuk-table__cell govuk-!-width-one-half govuk-table__header--numeric'>
            {state.button === 'cancel' ? renderCancelButton(subscription.id, subscription.environment, apiName) : renderSubscribeButton(apiName, subscription.environment)}
          </td>
        </tr>
      </thead>
      <tbody className='govuk-table__body'>
        <tr className='govuk-table__row'>
          <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Status</th>
          <td className='govuk-table__cell govuk-table__cell--numeric middle'>
            <strong className={`govuk-tag govuk-tag-round govuk-!-margin-right-0 govuk-tag--${state.tag}`}>{state.text || subscription.state}</strong>
          </td>
        </tr>

        {subscription.state === 'active' && (
          <>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>{subscription.environment} URL</th>
              <td className='govuk-table__cell middle'>{api.tags[`${subscription.environment.toLowerCase()}Url`]}</td>
            </tr>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header middle'>Subscription keys</th>
              <td className='govuk-table__cell middle'>
                {!subscription.keys &&
                  <a className='govuk-link' href='#' onClick={(e) => handleFetching(e, apiName, subscription.environment, subscription.id)}>
                    {fetching[apiName] && fetching[apiName][subscription.environment] ? 'Loading...' : 'View keys' }
                  </a>
                }
              </td>
            </tr>
          </>
        )}

        {subscription.keys && (
          <>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Primary key</th>
              <td className='govuk-table__cell middle'>{subscription.keys ? subscription.keys.primaryKey : '-'}</td>
            </tr>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Secondary key</th>
              <td className='govuk-table__cell middle'>{subscription.keys ? subscription.keys.secondaryKey : '-'}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  )
}

export default APISubscription
