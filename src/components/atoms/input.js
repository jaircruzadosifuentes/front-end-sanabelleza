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
  onKeyUp,
  upperCase = false,
  align = 'left',
  marginTop = '',
  onInput,
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
      onKeyUp={onKeyUp}
      autoFocus={autoFocus}
      readOnly={readOnly}
      onInput={onInput}
      style={{
        background: isDisabled ? 'white': '', 
        textAlign: align, 
        textTransform: upperCase? 'uppercase': '',
        marginTop: marginTop
      }}
      {...props}
    />
  );
}

Input.propTypes = {
  readOnly: PropTypes.bool,
  align: PropTypes.string,
  marginTop: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool, 
  upperCase: PropTypes.bool, 
  onKeyUp: PropTypes.func,
  onInput: PropTypes.func
};
