import { Component } from 'react'
import { connect } from 'react-redux'
import { setReturnUrl } from 'actions/returnUrl'

class ReturnTo extends Component {
  componentDidMount () {
    const { setReturnUrl, parentPath } = this.props
    setReturnUrl(parentPath)
  }

  render () {
    return null
  }
};

export { ReturnTo }
export default connect(null, { setReturnUrl })(ReturnTo)
