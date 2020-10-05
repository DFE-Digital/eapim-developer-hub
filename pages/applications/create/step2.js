import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import InputWithValidation from 'components/common/forms/input-with-validation'
import ValidationMessages from 'components/common/forms/validation-messages'
import { saveAppData, cancelApplication } from '../../../src/actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'

class ApplicationCreateStep2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fields: {},
      errors: []
    }

    this.appDescription = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    if (!this.appDescription.current.validateInput(e)) {
      this.appDescription.current.validateInput(e)
      return false
    }
    this.props.saveAppData(this.state.fields)
    Router.push('/applications/create/step3')
    return true
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value.trim()
    const name = target.name
    const fields = { ...this.state.fields }
    fields[name] = value
    this.setState({ fields })
  }

  showError = () => {
    const validationErrors = []
    setTimeout(() => {
      Array.from(document.querySelectorAll(`[id^="error-msg-for__"]`)).forEach(element => {
        if (element.textContent.length) {
          validationErrors.push({
            id: element.id,
            message: element.textContent.split('Error: ').pop()
          })
        }
      })
      this.setState({ errors: validationErrors })
    }, 0)
  }

  render () {
    const {
      application: { details }
    } = this.props

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <div className='govuk-width-container'>
          <a href='#' className='govuk-back-link' onClick={() => Router.back()}>Back</a>
          <main className='govuk-main-wrapper ' id='main-content' role='main'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                <ValidationMessages errors={this.state.errors} />
              </div>
            </div>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <form noValidate onSubmit={this.handleSubmit}>
                  <div className='govuk-form-group'>
                    <fieldset className='govuk-fieldset'>
                      <legend className='govuk-fieldset__legend govuk-fieldset__legend--xl'>
                        <h1 className='govuk-fieldset__heading govuk-!-margin-bottom-6'>
                                        What is your application for?
                        </h1>
                      </legend>
                      <InputWithValidation
                        ref={this.appDescription}
                        friendlyName={'application description'}
                        name={'app-description'}
                        inputId={'app-description'}
                        inputErrorId={'error-msg-for__app-description'}
                        label={`Application description`}
                        hint={`Please describe in as much detail what your application is for and how it will be used.`}
                        customErrorMessage='Describe your application'
                        isRequired
                        textArea
                        onChange={this.handleInputChange}
                        onFocus={() => this.showError()}
                        inputValue={details ? details['app-description'] : this.state.fields['app-description']}
                        setErrors={() => this.showError()}
                      />
                    </fieldset>
                  </div>

                  <button type='submit' className='govuk-button govuk-!-margin-right-1'>Continue</button>
                  <button
                    type='button'
                    className='govuk-button govuk-button--secondary'
                    onClick={() => {
                      this.props.cancelApplication()
                      Router.push('/applications')
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    application: state.application
  }
}

export { ApplicationCreateStep2 }
export default connect(mapStateToProps, { saveAppData, cancelApplication })(ApplicationCreateStep2)
