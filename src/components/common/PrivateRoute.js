import { Component } from 'react'
import Router from 'next/router'

class PrivateRoute extends Component {
  async componentDidMount () {
    const localStorageUser = await JSON.parse(global.localStorage.getItem('persist:root'))
    if (!localStorageUser) return false
    const user = JSON.parse(localStorageUser.user)
    let isLoggedIn = false
    if (localStorageUser && user && user.data && user.data.isAuthed) isLoggedIn = true
    if (!isLoggedIn) Router.push(this.props.redirect)
  }

  render () {
    return null
  }
}

export { PrivateRoute }
export default (PrivateRoute)
