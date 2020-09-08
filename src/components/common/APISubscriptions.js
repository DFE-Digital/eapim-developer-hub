import React from 'react'

import APISubscription from './APISubscription'

const APISubscriptions = ({ applicationId, apis, loadedRef, onSubscribe, onCancel, onFetchKeys, subscribing, cancelling, fetching }) => {
  const handleSubscribe = (e, apiName, environment) => {
    e.preventDefault()
    onSubscribe(applicationId, apiName, environment)
  }

  const handleCancel = (e, subId, environment, apiName) => {
    e.preventDefault()
    onCancel(subId, environment, apiName)
  }

  const handleFetching = (e, apiName, environment, subId) => {
    e.preventDefault()
    onFetchKeys(apiName, environment, subId)
  }

  const renderSubscribeButton = (apiName, environment) => (
    <button
      type='button'
      className='govuk-button govuk-!-margin-0'
      onClick={(e) => handleSubscribe(e, apiName, environment)}
      disabled={subscribing[apiName] && subscribing[apiName][environment]}
    >
      {subscribing[apiName] && subscribing[apiName][environment] ? `Subscribing...` : 'Subscribe'}
    </button>
  )

  const renderCancelButton = (subId, environment, apiName) => {
    return (
      <button
        type='button'
        className='govuk-button govuk-button--secondary govuk-!-margin-0'
        onClick={(e) => handleCancel(e, subId, environment, apiName)}
        disabled={cancelling[apiName] && cancelling[apiName][environment]}
      >
        {cancelling[apiName] && cancelling[apiName][environment] ? `Cancelling...` : 'Cancel'}
      </button>
    )
  }

  return (
    <div className='govuk-accordion' data-module='govuk-accordion' id='accordion-default' ref={loadedRef}>
      {apis.map(api => {
        const apiName = api.name

        const productionSubscription = api.subscriptions[0]
        const sandboxSubscription = api.subscriptions[1]

        return (
          <div className='govuk-accordion__section' key={api.id}>
            <div className='govuk-accordion__section-header'>
              <h2 className='govuk-accordion__section-heading'>
                <span className='govuk-accordion__section-button' id='accordion-subscriptions-heading'>
                  {api.properties.displayName}
                </span>
              </h2>
            </div>

            <div id='accordion-subscriptions' className='govuk-accordion__section-content' aria-labelledby='accordion-subscriptions-heading'>
              {!api.subscriptions.find(api => api.environment === 'Production') && (
                <table className='govuk-table'>
                  <thead className='govuk-table__head'>
                    <tr className='govuk-table__row'>
                      <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Production</th>
                      <td scope='row' className='govuk-table__cell govuk-!-width-one-half govuk-table__header--numeric'>
                        {renderSubscribeButton(apiName, 'Production')}
                      </td>
                    </tr>
                  </thead>
                </table>
              )}
              {productionSubscription && (
                <APISubscription
                  api={api}
                  subscription={productionSubscription}
                  renderSubscribeButton={renderSubscribeButton}
                  renderCancelButton={renderCancelButton}
                  handleFetching={handleFetching}
                  fetching={fetching}
                />
              )}

              {!api.subscriptions.find(api => api.environment === 'Sandbox') && (
                <table className='govuk-table'>
                  <thead className='govuk-table__head'>
                    <tr className='govuk-table__row'>
                      <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Sandbox</th>
                      <td scope='row' className='govuk-table__cell govuk-!-width-one-half govuk-table__header--numeric'>
                        {renderSubscribeButton(apiName, 'Sandbox')}
                      </td>
                    </tr>
                  </thead>
                </table>
              )}
              {sandboxSubscription && (
                <APISubscription
                  api={api}
                  subscription={sandboxSubscription}
                  renderSubscribeButton={renderSubscribeButton}
                  renderCancelButton={renderCancelButton}
                  handleFetching={handleFetching}
                  fetching={fetching}
                />
              )}

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default APISubscriptions
