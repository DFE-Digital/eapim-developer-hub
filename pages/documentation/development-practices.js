import React from 'react'
import DocumentationPage from 'components/DocumentationPage'

const page = 'Development practices'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage page={page} router={router} />
  )
}

Documentation.displayName = `${page} (doc)`

export default Documentation
