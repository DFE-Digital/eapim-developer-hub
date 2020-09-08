import React, { PureComponent, Fragment } from 'react'
import Footer from 'components/common/Footer'

export default class Layout extends PureComponent {
  render () {
    return (
      <Fragment>
        <a href='#main-content' className='govuk-skip-link'>Skip to main content</a>
        { this.props.children }
        <Footer />
      </Fragment>
    )
  }
}
