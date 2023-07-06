import React from "react";
import PropTypes from 'prop-types';

export default function Input({
  id = "",
  name = "",
  value = "",
  type = "text",
  className = "form-control",
  max,
  min,
  maxLength = 9999,
  onChange,
  autoFocus = false,
  isDisabled = false,
  readOnly = false,
  align = 'left',
  ...props
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      defaultValue={value}
      className={className}
      max={max}
      min={min}
      onChange={onChange}
      maxLength={maxLength}
      autoFocus={autoFocus}
      readOnly={readOnly}
      style={{background: isDisabled ? 'white': '', textAlign: align}}
      {...props}
    />
  );
}

Input.propTypes = {
  readOnly: PropTypes.bool,
  align: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool
};
