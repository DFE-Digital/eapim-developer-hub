import React from 'react'
import DocumentationPage from 'components/DocumentationPage'

const page = 'Terms of use'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage page={page} router={router} hasNav={false} />
  )
}

Documentation.displayName = `${page} (doc)`

export default Documentation
