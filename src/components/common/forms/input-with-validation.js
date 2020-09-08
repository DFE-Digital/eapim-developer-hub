import React from 'react'
import Input from './input'
import TextArea from './textarea'

class InputWithValidation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: props.inputValue || '',
      errorMessage: '',
      success: false,
      disabled: true
    }
    this.inputRef = React.createRef()
  }

  validateInput = e => {
    this.setState({ errorMessage: '' })
    const props = this.props
    let enteredValue = this.state.inputValue
    const originalValue = enteredValue
    let isSuccess = true

    if (props.inputType === 'number') enteredValue = Number(enteredValue.replace(/,/g, ''))

    // test for min and max if required or value entered
    if (props.isRequired || enteredValue !== '') {
      if (typeof props.min === 'number' && typeof props.max === 'number') {
        if (props.min > enteredValue || props.max < enteredValue) {
          const minValue = props.min
          const maxValue = props.max
          isSuccess = false
          this.setErrors(`Please enter an amount between ${minValue} and ${maxValue}`, isSuccess)
          return isSuccess
        }
      } else if (typeof props.min === 'number') {
        if (props.min > enteredValue) {
          const minValue = props.min
          isSuccess = false
          this.setErrors(`Please enter a value of at least ${minValue}`, isSuccess)
          return isSuccess
        }
      } else if (typeof props.max === 'number') {
        if (props.max < enteredValue) {
          const maxValue = props.max + 1
          isSuccess = false
          this.setErrors(`Please enter a value below ${maxValue}`, isSuccess)
          return isSuccess
        }
      }
    }

    if (props.isRequired) {
      // check the original value for empty, as enteredValue can be 0
      if (originalValue === '') {
        const errorMsg = this.props.customErrorMessage
          ? this.props.customErrorMessage
          : `Please fill in your ${props.friendlyName}`
        isSuccess = false
        this.setErrors(errorMsg, isSuccess)
        return isSuccess
      } else {
        isSuccess = true
        this.setState({ success: isSuccess })
      }
    } else if (originalValue !== '') {
      isSuccess = true
      this.setState({ success: isSuccess })
    } else if (originalValue === '') {
      isSuccess = false
      this.setErrors('', isSuccess)
    }

    if (props.pattern && !props.pattern.test(enteredValue)) {
      const errorMessage = props.customValidationMessage || props.customErrorMessage || `Please enter a valid ${props.friendlyName || props.name}`
      isSuccess = false
      this.setErrors(errorMessage, isSuccess)
    }

    return isSuccess
  }

  setErrors = (message, isSuccess) => {
    this.props.setErrors()
    this.setState({
      errorMessage: message,
      success: isSuccess
    })
  }

  clearOnFocus = e => {
    this.setState({ errorMessage: '' })
    if (this.props.onFocus) this.props.onFocus()
  }

  handleInputChange = event => {
    const validValue = false
    this.setState({
      inputValue: event.target.value,
      disabled: !validValue
    })
    if (this.props.onChange) this.props.onChange(event)
  }

  render () {
    const props = this.props
    return (
      <div className={'govuk-form-group' + (this.state.errorMessage !== '' ? ' govuk-form-group--error' : '') + (props.inline === true ? ' govuk-!-margin-bottom-0' : '')}>
        {props.label && <label className='govuk-label' htmlFor={props.inputId}>{props.label}</label>}
        {props.hint && <span id='more-detail-hint' className='govuk-hint'>{props.hint}</span>}
        {this.state.errorMessage !== '' && (
          <span className='govuk-error-message' id={props.inputErrorId}>
            <span className='govuk-visually-hidden'>Error:</span> {this.state.errorMessage}
          </span>
        )}
        {!props.textArea && (
          <Input
            {...props}
            ariaInvalid={this.state.errorMessage !== ''}
            ariaRequired
            ref={this.inputRef}
            placeholder={props.placeholder}
            onFocus={this.clearOnFocus}
            handleInputChange={(e) => this.handleInputChange(e)}
            inputType={props.inputType}
            inputId={props.inputId}
            error={this.state.errorMessage !== ''}
            success={this.state.success}
            inputValue={this.state.inputValue}
          />
        )}
        {props.textArea && (
          <TextArea
            {...props}
            ariaInvalid={this.state.errorMessage !== ''}
            ariaRequired
            ref={this.inputRef}
            placeholder={props.placeholder}
            onFocus={this.clearOnFocus}
            handleInputChange={(e) => this.handleInputChange(e)}
            inputType={props.inputType}
            inputId={props.inputId}
            error={this.state.errorMessage !== ''}
            success={this.state.success}
            inputValue={this.state.inputValue}
          />
        )}
      </div>
    )
  }
}

export default InputWithValidation
