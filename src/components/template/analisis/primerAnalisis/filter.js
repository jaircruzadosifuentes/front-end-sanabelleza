import React from "react";
import { InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function Filter({
  handleSearchForSurNames
}) {
  return (
    <div className="row mt-2 mb-2">
      <InputFormControl
        type="text"
        className="col-md-4"
        label="Buscar por apellidos"
        isLabel
        autoFocus
        onChange={handleSearchForSurNames}
      />
      <div className="col-md-4">
      </div>
    </div> 
  )
}
Filter.propTypes = {
  handleSearchForSurNames: PropTypes.func,
};