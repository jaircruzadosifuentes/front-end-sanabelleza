import React from "react";
import { InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function Filter({
  handleSearchForSurNames,
  label = "Buscar por apellidos"
}) {
  return (
    <div className="row">
       <InputFormControl
        type="text"
        className="col-md-12 mt-1 mb-1"
        label={label}
        isFilter
        isLabel
        autoFocus
        onChange={handleSearchForSurNames}
      />
    </div> 
  )
}
Filter.propTypes = {
  handleSearchForSurNames: PropTypes.func,
  label: PropTypes.string,
};