import React from 'react'

import APISubscription from './APISubscription'

const APISubscriptions = ({ applicationId, apis, subscriptions, loadedRef, onSubscriptionChange }) => {
  return (
    <div className='govuk-accordion' data-module='govuk-accordion' id='accordion-default' ref={loadedRef}>
      {apis.map(api => {
        const sandboxSubscription = subscriptions.find(sub => sub.apiName === api.name && sub.environment === 'Sandbox')
        const productionSubscription = subscriptions.find(sub => sub.apiName === api.name && sub.environment === 'Production')

        const hasSandboxUrl = api.tags.sandboxUrl !== ''
        const hasProductionUrl = api.tags.productionUrl !== ''

        if (!hasSandboxUrl && !hasProductionUrl) return null

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
              {hasSandboxUrl &&
                <APISubscription
                  api={api}
                  environment='Sandbox'
                  applicationId={applicationId}
                  subscription={sandboxSubscription}
                  onSubscriptionChange={onSubscriptionChange}
                />
              }
              {hasProductionUrl &&
                <APISubscription
                  api={api}
                  environment='Production'
                  applicationId={applicationId}
                  subscription={productionSubscription}
                  onSubscriptionChange={onSubscriptionChange}
                />
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default APISubscriptions
