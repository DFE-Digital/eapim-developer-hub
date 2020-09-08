import React, { Component } from 'react'

class SubscribeButton extends Component {
  subscribe = (api) => {
    console.log('API to subscribe to: ', api)
  }

  render () {
    const props = this.props
    return (
      <div className='govuk-form-group govuk-!-margin-bottom-0'>
        <label className='govuk-label slide-toggle govuk-!-margin-bottom-0' htmlFor={`${props.api.name}-sub-checkbox`}>
          <p className='govuk-body-s govuk-!-margin-bottom-0'>
            {this.props.showLabel && <span>Subscribe</span>}
          </p>
          <div className='switch'>
            <input id={`${props.api.name}-sub-checkbox`} type='checkbox' onClick={(e) => this.props.onClick(e.target.checked)} />
            <span className='slider round' />
          </div>
        </label>
      </div>
    )
  }
}

export { SubscribeButton }
export default (SubscribeButton)
