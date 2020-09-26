import { Component } from 'react'
import { connect } from 'react-redux'
import { signOut } from 'actions/authenticate'
import moment from 'moment'

class AccessChecker extends Component {
  async checkAccess () {
    const { user: { data } } = this.props
    if (data && data.User && data.User.idToken.exp) {
      const now = new Date()
      const exp = new Date(data.User.idToken.exp * 1000)
      const expired = moment(exp).subtract(5, 'minutes')
      const hasExpired = moment(now).isSameOrAfter(expired)
      if (hasExpired) {
        window.localStorage.clear()
        await signOut(this.props.msalConfig)
      }
    }
  }

  render () {
    this.checkAccess()
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export { AccessChecker }
export default connect(mapStateToProps)(AccessChecker)
