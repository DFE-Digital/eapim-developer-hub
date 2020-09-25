import React from 'react'

class TextArea extends React.Component {
  constructor (props) {
    super(props)
    this.inputChildRef = React.createRef()
  }

  render () {
    const { error, inputValue, inputType, inputId, placeholder, readOnly, maxLength } = this.props
    return (
      <>
        <textarea
          maxLength={maxLength}
          className={'govuk-textarea govuk-!-margin-bottom-0' + (error ? ' govuk-textarea--error' : '') + (readOnly ? ' input-readonly' : '')}
          aria-describedby={this.props.ariaDescribedBy}
          aria-invalid={this.props.ariaInvalid}
          aria-required={this.props.ariaRequired || false}
          ref={this.inputChildRef}
          id={inputId}
          rows='5'
          readOnly={readOnly}
          type={inputType}
          value={inputValue}
          placeholder={placeholder}
          name={this.props.name}
          onFocus={this.props.onFocus}
          onChange={(e) => {
            if (this.props.handleInputChange) this.props.handleInputChange(e)
          }}
          autoComplete={this.props.autoComplete}
        />
        {maxLength && <span className='govuk-hint'>You have {parseInt(maxLength, 10) - inputValue.length} characters remaining</span>}
      </>
    )
  }
}

export default TextArea
