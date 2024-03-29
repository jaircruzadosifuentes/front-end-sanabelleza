
import React from 'react'
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Label } from '../atoms';

export default function SelectedFormControl({
  options = [],
  className,
  handleChange,
  defaultValue = '',
  placeHolder = '',
  titleLabel = '',
  autoFocus = false
}) {

  return (
    <div className={className}>
      {
        titleLabel ?
        <Label title={titleLabel} />: ''
      }
      <Select
        options={options}
        onChange={handleChange}
        defaultValue={defaultValue}
        blurInputOnSelect={true}
        isClearable
        placeholder={placeHolder}
        isSearchable
        autoFocus={autoFocus}
      />
    </div>
  )
}
SelectedFormControl.propTypes = {
  titleLabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  matchName: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  autoFocus: PropTypes.bool,
  options: PropTypes.array,
  classNameDiv: PropTypes.string,
  handleChange: PropTypes.func,
  placeHolder: PropTypes.string
};