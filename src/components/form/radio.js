import React from 'react'

const Radio = ({ id, name, value, legend, hint, items, onFocus, onChange, error }) => {
  return (
    <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
      <fieldset className='govuk-fieldset'>
        <legend className='govuk-fieldset__legend govuk-fieldset__legend--l'>
          <span className='govuk-label'>{legend}</span>
        </legend>
        {hint && <span className='govuk-hint'>{hint}</span>}

        {error && (
          <span className='govuk-error-message' id={`error-msg-for-${id}`}>
            <span className='govuk-visually-hidden'>Error: </span> {error}
          </span>
        )}

        <div className='govuk-radios' id={id}>
          {items.map(item => (
            <div className='govuk-radios__item' key={item.value}>
              <input
                className='govuk-radios__input'
                id={item.value}
                name={name}
                type='radio'
                value={item.value}
                onChange={onChange}
                onFocus={onFocus}
                checked={item.value === value}
              />
              <label className='govuk-label govuk-radios__label' htmlFor={item.value}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default Radio
