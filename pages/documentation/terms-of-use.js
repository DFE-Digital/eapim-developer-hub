import React from 'react'
import DocumentationPage from 'components/pages/DocumentationPage'

const Documentation = () => {
  return (
    <DocumentationPage hasNav={false} contentKey='terms-of-use' />
  )
}

Documentation.displayName = 'Terms of use (doc)'

export default Documentation
