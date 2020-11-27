import React from 'react'

import Breadcrumbs from './Breadcrumbs'
import AuthNavigation from './AuthNavigation'

const Banner = ({ router, back }) => {
  return (
    <div className='govuk-width-container service-banner'>
      <Breadcrumbs router={router} back={back} />
      <AuthNavigation />
    </div>
  )
}

export default Banner
