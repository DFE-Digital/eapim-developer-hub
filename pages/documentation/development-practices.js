import React from 'react'
import DocumentationPage from 'components/pages/DocumentationPage'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage router={router} contentKey='best-practices' />
  )
}

Documentation.displayName = 'Best practices (doc)'

export default Documentation
