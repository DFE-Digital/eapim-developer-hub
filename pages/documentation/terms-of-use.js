import React from 'react'
import DocumentationPage from 'components/pages/DocumentationPage'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage router={router} hasNav={false} contentKey='terms-of-use' />
  )
}

Documentation.displayName = 'Terms of use (doc)'

export default Documentation
