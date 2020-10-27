import React from 'react'

import APISubscription from './APISubscription'

const APISubscriptions = ({ applicationId, apis, subscriptions, loadedRef, onSubscriptionChange }) => {
  return (
    <div className='govuk-accordion' data-module='govuk-accordion' id='accordion-default' ref={loadedRef}>
      {apis.map(api => {
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
              {api.tags.environments.map(tag => {
                if (!tag.apiName) return null

                const subscription = subscriptions.find(sub => sub.apiName.toLowerCase() === tag.apiName.toLowerCase() && sub.environment === tag.environment)

                return (
                  <APISubscription
                    key={tag.id}
                    tag={tag}
                    applicationId={applicationId}
                    subscription={subscription}
                    onSubscriptionChange={onSubscriptionChange}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default APISubscriptions
