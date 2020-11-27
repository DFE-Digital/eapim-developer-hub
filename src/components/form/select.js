import React from 'react'

const Select = ({ id, name, label, value, items, onChange, error }) => {
  return (
    <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
      {error && (
        <span className='govuk-error-message' id={`error-msg-for-${id}`}>
          <span className='govuk-visually-hidden'>Error: </span> {error}
        </span>
      )}

      <div className='govuk-form-group'>
        <label className='govuk-label' htmlFor={id}>{label}</label>
        <select className='govuk-select' id={id} name={name} value={value} onChange={onChange}>
          {items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Select
