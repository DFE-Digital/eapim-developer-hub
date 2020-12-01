import React from 'react'

const sizes = {
  s: {
    width: '.9em',
    height: '.9em',
    borderWidth: '.25em'
  },
  m: {
    width: '3.2em',
    height: '3.2em',
    borderWidth: '.5em'
  },
  l: {
    width: '5em',
    height: '5em',
    borderWidth: '.7em'
  }
}

const Loader = ({ size = 's', styles, ariaText }) => {
  const loadedStyles = {
    ...sizes[size],
    ...styles
  }

  return (
    <div className='loader' style={loadedStyles}>
      <span role='alert' aria-live='assertive' className='govuk-visually-hidden'>{ariaText}</span>
    </div>
  )
}

export default Loader
