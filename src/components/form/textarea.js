import React from 'react'

const Textarea = React.forwardRef(({ error, inline, id, name, value, label, hint, placeholder, maxLength, ariaDescribedBy, ariaInvalid, ariaRequired = false, readOnly = false, required = false, onFocus, onChange }, ref) => {
  return (
    <div className={`govuk-form-group ${error ? `govuk-form-group--error` : ''} ${inline === true ? `govuk-!-margin-bottom-0` : ''}`}>
      {label && <label className='govuk-label' htmlFor={id}>{label}</label>}

      {hint && <span className='govuk-hint'>{hint}</span>}

      {error && (
        <span className='govuk-error-message' id={`error-msg-for-${id}`}>
          <span className='govuk-visually-hidden'>Error:</span> {error}
        </span>
      )}

      <textarea
        className={`govuk-textarea ${error ? `govuk-textarea--error` : ''} ${readOnly ? `input-readonly` : ''} ${inline ? `govuk-!-margin-bottom-2` : ''}`}
        rows='5'
        ref={ref}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        maxLength={maxLength}
      />
      {maxLength && <span className='govuk-hint'>You have {parseInt(maxLength, 10) - value.length} characters remaining</span>}
    </div>
  )
})

export default Textarea
