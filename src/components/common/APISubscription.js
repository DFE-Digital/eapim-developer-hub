import React, { useState } from 'react'

import { getSubscriptionKeys, postSubscription } from '../../../lib/subscriptionService'

const statusType = {
  default: { tag: 'green', button: 'subscribe' },
  active: { tag: 'turquoise', button: 'cancel' },
  pending: { tag: 'blue', button: 'cancel' },
  submitted: { tag: 'purple', button: 'cancel', text: 'pending approval' },
  cancelled: { tag: 'orange', button: 'subscribe' },
  rejected: { tag: 'red', button: 'cancel' },
  suspended: { tag: 'yellow', button: 'cancel' }
}

const APISubscription = ({ applicationId, tag, subscription, onSubscriptionChange }) => {
  const apiName = tag.apiName
  const environment = tag.environment

  const [subscribing, setSubscribing] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [subscriptionKeys, setSubscriptionKeys] = useState({})
  const [showKeys, setShowKeys] = useState(false)

  const onSubscribe = async (e) => {
    e.preventDefault()
    setSubscribing(true)

    try {
      const newSubscriptions = await postSubscription(applicationId, apiName, environment)
      onSubscriptionChange(newSubscriptions)
      setSubscribing(false)
    } catch (error) {
      console.log(`Error posting subscrition: ${error}`)
      setSubscribing(false)
    }
  }

  const onFetchKeys = async (e, subId) => {
    e.preventDefault()
    setFetching(true)

    try {
      const keys = await getSubscriptionKeys(subId, environment)
      setSubscriptionKeys(keys)
      setShowKeys(true)
      setFetching(false)
    } catch (error) {
      console.log(`Error fetching keys: ${error}`)
      setFetching(false)
      setShowKeys(false)
    }
  }

  const onViewKeys = (e, subId) => {
    e.preventDefault(e)

    if (showKeys) return setShowKeys(false)
    if (!subscriptionKeys && !showKeys) return setShowKeys(true)

    onFetchKeys(e, subId)
  }

  const renderSubscribeButton = () => (
    <button type='button' className='govuk-button govuk-!-margin-0' onClick={onSubscribe} disabled={subscribing}>
      {subscribing ? `Subscribing...` : 'Subscribe'}
    </button>
  )

  const renderCancelButton = (subId) => {
    return (
      <a href={`/applications/${applicationId}/unsubscribe/${subId}-${tag.environment}`} role='button' className='govuk-button govuk-button--warning govuk-!-margin-0'>
       Unsubscribe
      </a>
    )
  }

  const subscriptionHasKeys = Object.keys(subscriptionKeys).length !== 0

  if (!subscription) {
    return (
      <table className='govuk-table govuk-!-margin-bottom-6' key={`${applicationId}-${environment}`}>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header govuk-!-width-one-half'>{tag.name}</th>
            <td scope='row' className='govuk-table__cell govuk-!-width-one-half govuk-table__header--numeric'>
              {renderSubscribeButton()}
            </td>
          </tr>
        </thead>
      </table>
    )
  }

  const state = statusType[subscription.state] || statusType.default

  return (
    <table className='govuk-table govuk-!-margin-bottom-6' key={`${applicationId}-${environment}`}>
      <thead className='govuk-table__head'>
        <tr className='govuk-table__row'>
          <th scope='row' className='govuk-table__header govuk-!-width-one-half'>{tag.name}</th>
          <td scope='row' className='govuk-table__cell govuk-!-width-one-half govuk-table__header--numeric'>
            {state.button === 'cancel' ? renderCancelButton(subscription.id) : renderSubscribeButton()}
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
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>API endpoint</th>
              <td className='govuk-table__cell middle'>{tag.url}</td>
            </tr>
            {tag.tokenEndpoint !== '' && (
              <tr className='govuk-table__row'>
                <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Token endpoint</th>
                <td className='govuk-table__cell middle'>{tag.tokenEndpoint}</td>
              </tr>
            )}
            {tag.authEndpoint !== '' && (
              <tr className='govuk-table__row'>
                <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Authorisation endpoint</th>
                <td className='govuk-table__cell middle text-wrap'><code className='code--block inline'>{tag.authEndpoint}</code></td>
              </tr>
            )}
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header middle'>Subscription keys</th>
              <td className='govuk-table__cell govuk-table__cell--numeric middle'>
                {!subscription.keys &&
                  <a className='govuk-link' href='#' onClick={(e) => onViewKeys(e, subscription.id)}>
                    {!subscriptionHasKeys && fetching ? 'Loading...' : (showKeys ? 'Hide keys' : 'View keys')}
                  </a>
                }
              </td>
            </tr>
          </>
        )}
        {subscriptionHasKeys && showKeys && (
          <>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Primary key</th>
              <td className='govuk-table__cell middle'>{subscriptionKeys.primaryKey || '-'}</td>
            </tr>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Secondary key</th>
              <td className='govuk-table__cell middle'>{subscriptionKeys.secondaryKey || '-'}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  )
}

export default APISubscription
