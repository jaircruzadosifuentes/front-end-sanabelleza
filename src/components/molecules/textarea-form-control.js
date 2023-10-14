import React, { useState, useEffect } from "react";
import { Label } from "../atoms";
import PropTypes from 'prop-types';

export default function TextAreaFormControl(props) {
  const {
    className,
    label,
    matchName,
    type = "text",
    defaultValue = "",
    error,
    onChange,
    max,
    min,
    disabled = false,
    autoFocus = false,
    maxLength = 9999,
    readOnly = false,
    rows = 3,
    isLabel = false,
    ...rest
  } = props;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (rest.required && !defaultValue) {
      setMessage("*Requerido");
      return;
    }
    if (rest.minLength && defaultValue.length <= rest.minLength) {
      setMessage(`*Mínimo ${rest.minLength} caracteres`);
      return;
    }
    if (rest.maxLength && defaultValue.length >= rest.maxLength) {
      setMessage(`*Máximo ${rest.maxLength} caracteres`);
      return;
    }
    if (rest.min && defaultValue < rest.min) {
      setMessage(`*Valor mínimo ${rest.min}`);
      return;
    }
    setMessage("");
  }, [rest.required, rest.minLength, rest.maxLength, defaultValue, rest.min]);

  return (
    <div className={className}>
      {
        isLabel?
        <Label title={label + ':'} htmlFor={matchName} />: ''
      }
      <textarea
        type={type}
        id={matchName}
        name={matchName}
        defaultValue={type === "number" ? parseFloat(defaultValue).toFixed(2) : defaultValue}
        onChange={onChange}
        min={min} 
        max={max}
        autoFocus={autoFocus}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        readOnly={readOnly}
        className='form-control'
        // {...rest}
      />
      <div className="invalid-feedback">{message}</div>
    </div>
  );
}
TextAreaFormControl.propTypes = {
  className: PropTypes.string,
  matchName: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  isLabel: PropTypes.bool,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
};