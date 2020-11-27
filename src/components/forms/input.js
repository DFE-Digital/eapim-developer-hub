import React from 'react'

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.inputChildRef = React.createRef()
  }

  render () {
    const { error, inputValue, inputType, inputId, placeholder, readOnly } = this.props
    return (
      <input
        className={'govuk-input' + (error ? ' govuk-input--error' : '') + (readOnly ? ' input-readonly' : '')}
        aria-describedby={this.props.ariaDescribedBy}
        aria-invalid={this.props.ariaInvalid}
        aria-required={this.props.ariaRequired || false}
        ref={this.inputChildRef}
        id={inputId}
        type={inputType}
        readOnly={readOnly}
        value={inputValue}
        placeholder={placeholder}
        name={this.props.name}
        onFocus={this.props.onFocus}
        onChange={(e) => {
          if (this.props.handleInputChange) this.props.handleInputChange(e)
        }}
        autoComplete={this.props.autoComplete}
      />
    )
  }
}

export default Input
