import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import AccessChecker from 'components/common/AccessChecker'
import ReturnTo from 'components/common/ReturnTo'
import Header from 'components/common/Header'
import PhaseBanner from 'components/common/PhaseBanner'
import InputWithValidation from 'components/common/forms/input-with-validation'
import ValidationMessages from 'components/common/forms/validation-messages'
import { saveAppData, cancelApplication } from '../../../src/actions/application'
import { PrivateRoute } from 'components/common/PrivateRoute'
import { appNamePattern } from '../../../src/utils/patterns'

class CreateStep1 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fields: {},
      errors: []
    }

    this.appName = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    if (!this.appName.current.validateInput(e)) {
      this.appName.current.validateInput(e)
      return false
    }
    this.props.saveAppData(this.state.fields)
    Router.push('/applications/create/step2')
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
      user: { data },
      application: { details }
    } = this.props

    let isLoggedIn = false
    if (data && data.isAuthed) isLoggedIn = true

    return (
      <Fragment>
        <AccessChecker msalConfig={this.props.msalConfig} />
        <PrivateRoute redirect={'/applications'} />
        <ReturnTo parentPath={this.props.router.asPath} />
        <Header msalConfig={this.props.msalConfig} isLoggedIn={isLoggedIn} />
        <PhaseBanner />
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
                          What's the name of your application?
                        </h1>
                      </legend>
                      <InputWithValidation
                        ref={this.appName}
                        friendlyName={'application name'}
                        name={'app-name'}
                        inputId={'app-name'}
                        inputErrorId={'error-msg-for__app-name'}
                        label={`Application name`}
                        hint='Your application name can contain alphanumeric characters and spaces'
                        customErrorMessage='Enter the name of your application'
                        customValidationMessage='Application name must be between 2 and 50 characters'
                        isRequired
                        pattern={appNamePattern}
                        onChange={this.handleInputChange}
                        onFocus={() => this.showError()}
                        inputValue={details ? details['app-name'] : this.state.fields['app-name']}
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
    user: state.user,
    application: state.application
  }
}

export { CreateStep1 }
export default connect(mapStateToProps, { saveAppData, cancelApplication })(CreateStep1)
