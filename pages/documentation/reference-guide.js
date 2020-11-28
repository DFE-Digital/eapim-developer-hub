import React from 'react'
import DocumentationPage from 'components/DocumentationPage'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage router={router} contentKey='reference-guide' />
  )
}

Documentation.displayName = 'Reference guide (doc)'

export default Documentation
