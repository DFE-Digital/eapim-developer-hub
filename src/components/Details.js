import { useState } from 'react'
import { useIsIE11 } from 'hooks'

const Details = ({ title, content, tag }) => {
  const [isIE] = useIsIE11()
  const [open, setOpen] = useState(false)

  const props = {}
  if (isIE) props.open = open

  return (
    <details className='govuk-details' data-module='govuk-details' {...props}>
      <summary className='govuk-details__summary' onClick={() => setOpen(!open)}>
        <div className='details-title'>
          <span className='govuk-details__summary-text'>{title}</span>
        </div>
        {tag &&
          <div className='details-tag'>
            <strong className='govuk-tag govuk-tag-round govuk-tag--blue'>{tag}</strong>
          </div>}
      </summary>
      <div className='govuk-details__text' style={{ display: open ? 'block' : 'none' }}>{content}</div>
    </details>
  )
}

export default Details
