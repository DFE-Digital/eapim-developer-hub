import React from 'react'
import DocumentationPage from 'components/DocumentationPage'

const page = 'Using the Developer Hub'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage page={page} router={router} />
  )
}

Documentation.displayName = `${page} (doc)`

export default Documentation
