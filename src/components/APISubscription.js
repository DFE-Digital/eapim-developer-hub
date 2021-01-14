import React, { useState } from 'react'
import APISubscriptionKeys from './APISubscriptionKeys'

import { getSubscriptionKeys, postSubscription } from '../../lib/subscriptionService'

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

  const renderSubscriptionButton = (subscription) => {
    let text = subscribing ? 'Subscribing...' : 'Subscribe'
    let href = '#'
    let onClick = onSubscribe

    if (subscription) {
      text = 'Unsubscribe'
      href = `/applications/${applicationId}/unsubscribe/${subscription.id}-${tag.environment}`
      onClick = null
    }

    return (
      <a href={href} onClick={onClick} role='button' aria-live='polite' className={`govuk-button govuk-!-margin-0 ${subscription ? 'govuk-button--warning' : ''}`}>
        {text}
      </a>
    )
  }

  const state = subscription ? statusType[subscription.state] : statusType.default

  return (
    <>
      <table className='govuk-table govuk-!-margin-bottom-6' key={`${applicationId}-${environment}`}>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header govuk-!-width-one-half'><span className='govuk-visually-hidden'>Environment: </span>{tag.name}</th>
            <td scope='row' className='govuk-table__cell govuk-!-width-one-half govuk-table__header--numeric'>
              {renderSubscriptionButton(subscription)}
            </td>
          </tr>
        </thead>
        {subscription && (
          <tbody className='govuk-table__body'>
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Status</th>
              <td tabIndex='0' id={`status-${applicationId}-${environment}`} className='govuk-table__cell govuk-table__cell--numeric middle'>
                <strong className={`govuk-tag govuk-tag-round govuk-!-margin-right-0 govuk-tag--${state.tag}`}>{state.text || subscription.state}</strong>
              </td>
            </tr>
            {subscription.state === 'active' && (
              <>
                <tr className='govuk-table__row'>
                  <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>API URL</th>
                  <td className='govuk-table__cell middle'>{tag.url}</td>
                </tr>
                {tag.tokenEndpoint && (
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Token endpoint</th>
                    <td className='govuk-table__cell middle'>{tag.tokenEndpoint}</td>
                  </tr>
                )}
                {tag.authEndpoint && (
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Authorisation endpoint</th>
                    <td className='govuk-table__cell middle text-wrap'><code className='code--block inline'>{tag.authEndpoint}</code></td>
                  </tr>
                )}
                {tag.scopes && (
                  <tr className='govuk-table__row'>
                    <th scope='row' className='govuk-table__header govuk-!-font-weight-regular middle'>Scopes</th>
                    <td className='govuk-table__cell middle'>
                      {tag.scopes.map(scope => <p className='govuk-body govuk-!-margin-bottom-2' key={scope}>{scope}</p>)}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        )}
      </table>

      {subscription && subscription.state === 'active' && (
        <APISubscriptionKeys
          subscription={subscription}
          fetching={fetching}
          showKeys={showKeys}
          onViewKeys={onViewKeys}
          subscriptionKeys={subscriptionKeys}
        />
      )}
    </>
  )
}

export default APISubscription
