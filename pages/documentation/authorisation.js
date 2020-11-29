import React from 'react'
import DocumentationPage from 'components/pages/DocumentationPage'

const Documentation = ({ router }) => {
  return (
    <DocumentationPage router={router} contentKey='authorisation' />
  )
}

Documentation.displayName = 'Authorisation (doc)'

export default Documentation
