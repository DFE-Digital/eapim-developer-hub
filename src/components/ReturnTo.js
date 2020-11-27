import { Component } from 'react'
import { connect } from 'react-redux'
import { setReturnUrl } from 'actions/returnUrl'

class ReturnTo extends Component {
  componentDidMount () {
    let { setReturnUrl, parentPath } = this.props
    if (parentPath === '/logged-out') parentPath = '/'
    setReturnUrl(parentPath)
  }

  render () {
    return null
  }
};

export default connect(null, { setReturnUrl })(ReturnTo)
