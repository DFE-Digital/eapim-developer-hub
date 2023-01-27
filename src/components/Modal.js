import { Component } from 'react'
import { signOut } from '../../lib/authService'

const timer = 60 // seconds

class Modal extends Component {
  countdown = 0

  constructor (props) {
    super(props)
    this.state = {
      seconds: timer
    }
  }

  closeModal = () => {
    clearInterval(this.countdown)
    this.setState({ seconds: timer })
    this.props.close()
  }

  componentWillUnmount () {
    clearInterval(this.countdown)
  }

  componentDidMount () {
    let seconds = this.state.seconds
    this.countdown = setInterval(async () => {
      seconds--
      this.setState({ seconds })

      if (seconds === 0) {
        clearInterval(this.countdown)
        this.setState({ seconds: timer })
        await signOut()
        this.props.close()
      }
    }, 1000)
  }

  render () {
    return (
      <div className='modal'>
        <div className='modal-box'>
          <div className='govuk-!-padding-4'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                <div className='govuk-warning-text'>
                  <span className='govuk-warning-text__icon' aria-hidden='true'>!</span>
                  <strong className='govuk-warning-text__text'>
                    <span className='govuk-warning-text__assistive'>Warning</span>
                    You're being timed out due to inactivity.
                  </strong>
                </div>
              </div>
            </div>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                <p className='govuk-body'>Please choose to stay logged in or you will be logged off in {this.state.seconds} seconds.</p>
              </div>
            </div>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                <button
                  className='govuk-button govuk-!-margin-bottom-2 govuk-!-margin-top-4'
                  onClick={() => this.closeModal()}
                > Stay logged in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
