import React from 'react'

import APISummaryBuilder from 'components/APISummaryBuilder'

const APISummary = ({ api, summary }) => {
  return (
    <div className='api-information-page'>
      <APISummaryBuilder api={api} summary={summary} />
    </div>
  )
}

export default APISummary
