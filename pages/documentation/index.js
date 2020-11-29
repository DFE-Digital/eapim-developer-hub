import React from 'react'
import DocumentationPage from 'components/pages/DocumentationPage'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage router={router} contentKey='documentation' />
  )
}

Documentation.displayName = 'Using the Developer Hub (doc)'

export default Documentation
