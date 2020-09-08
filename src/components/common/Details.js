import { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

    toggleDetails = () => {
      this.setState({ open: !this.state.open })
    }

    componentWillUnmount () {
      this.setState({ open: false })
    }

    render () {
      const props = this.props
      return (
        <details className='govuk-details'>
          <summary className='govuk-details__summary' onClick={() => this.toggleDetails()}>
            <span className='govuk-details__summary-text'>{ ReactHtmlParser(props.title) }</span>
          </summary>
          {this.state.open && <div className='govuk-details__text'>{ ReactHtmlParser(props.details) }</div>}
        </details>
      )
    }
}

export { Details }
export default (Details)
