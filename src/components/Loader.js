import React from 'react'

const Loader = ({ style, ariaText }) => {
  return (
    <div className='loader' style={style}>
      <span role='alert' aria-live='assertive' className='govuk-visually-hidden'>{ariaText}</span>
    </div>
  )
}

export default Loader
