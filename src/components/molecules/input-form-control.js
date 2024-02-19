import React, { useState, useEffect } from "react";
import { Input, Label } from "../atoms";
import PropTypes from 'prop-types';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function InputFormControl(props) {
  const {
    isLabel = false,
    className,
    label,
    matchName,
    type = "text",
    defaultValue = "",
    error,
    onChange,
    max,
    min,
    isDisabled = false,
    autoFocus = false,
    maxLength = 9999,
    align = 'left',
    readOnly = false,
    id = '',
    isFilter = false,
    isBold = false,
    upperCase = false,
    onKeyUp,
    marginTop = '',
    onInput,
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
        isFilter?
        <FilterListIcon style={{cursor: 'pointer'}} />: ''
      }{" "}
      {
        isLabel ?
        <Label title={label + ':'} htmlFor={matchName} isBold={isBold} />: ''
      }
      <Input
        type={type}
        id={id}
        name={matchName}
        defaultValue={type === "number" ? parseFloat(defaultValue).toFixed(2) : defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        autoFocus={autoFocus}
        disabled={isDisabled}
        onKeyUp={onKeyUp}
        maxLength={maxLength}
        align={align}
        readOnly={readOnly}
        upperCase={upperCase}
        marginTop={marginTop}
        onInput={onInput}
      />
      <div className="invalid-feedback">{message}</div>
    </div>
  );
}
InputFormControl.propTypes = {
  isFilter: PropTypes.bool,
  readOnly: PropTypes.bool,
  isBold: PropTypes.bool,
  align: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.string,
  marginTop: PropTypes.string,
  matchName: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  isDisabled: PropTypes.bool,
  isLabel: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  onKeyUp: PropTypes.func,
  upperCase: PropTypes.bool,
  onInput: PropTypes.func,
};