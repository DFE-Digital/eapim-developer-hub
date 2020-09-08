import { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'components/common/Modal'

const inActiveTime = 1000 * 60 * 15 // 15 minutes

class IdleTimer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idleTime: inActiveTime,
      modalOpen: false
    }
  }

    startChecking = () => {
      this.events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']
      for (var i in this.events) window.addEventListener(this.events[i], this.resetTimeout)
      this.setTimeout()
    }

    clearTimeoutFunc = () => {
      if (this.warnTimeout) clearTimeout(this.warnTimeout)
      if (this.logoutTimeout) clearTimeout(this.logoutTimeout)
    }

    setTimeout = () => {
      this.warnTimeout = setTimeout(this.warn, this.state.idleTime)
    }

    resetTimeout = () => {
      this.clearTimeoutFunc()
      this.setTimeout()
    }

    warn = () => {
      this.setState({ modalOpen: true })
    }

    closeModal = () => {
      this.setState({ modalOpen: false })
    }

    render () {
      const { user: { data } } = this.props
      if (data && data.isAuthed) this.startChecking()
      if (this.state.modalOpen) return <Modal alert={this.state} close={this.closeModal} msalConfig={this.props.msalConfig} />
      return null
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export { IdleTimer }
export default connect(mapStateToProps, {})(IdleTimer)
