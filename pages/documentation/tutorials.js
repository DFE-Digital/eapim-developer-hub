import React from 'react'
import DocumentationPage from 'components/pages/DocumentationPage'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage router={router} contentKey='tutorials' />
  )
}

Documentation.displayName = 'Tutorials (doc)'

export default Documentation
