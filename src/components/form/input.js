import React from 'react'

const Input = React.forwardRef(({ error, inline, id, name, type, value, label, hint, placeholder, ariaDescribedBy, ariaInvalid, ariaRequired = false, readOnly = false, onFocus, onChange }, ref) => {
  return (
    <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''} ${inline === true ? 'govuk-!-margin-bottom-0' : ''}`}>
      {label && <label className='govuk-label' htmlFor={id}>{label}</label>}

      {hint && <span className='govuk-hint'>{hint}</span>}

      {error && (
        <span className='govuk-error-message' id={`error-msg-for-${id}`}>
          <span className='govuk-visually-hidden'>Error:</span> {error}
        </span>
      )}

      <input
        className={`govuk-input ${error ? 'govuk-input--error' : ''} ${readOnly ? 'input-readonly' : ''}`}
        ref={ref}
        id={id}
        type={type}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
        readOnly={readOnly}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
      />
    </div>
  )
})

export default Input
