import React, { Component } from 'react'
import Link from 'next/link'

class ApplicationSideBar extends Component {
  render () {
    const { app, nav, currentPage } = this.props

    let color = null
    const isDeleteApplication = Object.keys(nav).length - 1

    return (
      <nav>
        <ul>
          {Object.keys(nav).map((item, i) => {
            if (i === isDeleteApplication) color = 'warning'

            if (nav[item].forceRefresh) {
              return (
                <li key={i}>
                  <a className={'govuk-link' + (currentPage === nav[item].Page ? ' active' : '')} href={`/applications/${app.applicationId}${nav[item].Url}`}>{nav[item].Page}</a>
                </li>
              )
            }
            return (
              <li key={i}>
                <Link href={`/applications/[slug]${nav[item].Url}`} as={`/applications/${app.applicationId}${nav[item].Url}`}>
                  <a className={'govuk-link' + (currentPage === nav[item].Page ? ' active' : '') + ` ${color || ''}`}>{nav[item].Page}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default ApplicationSideBar
