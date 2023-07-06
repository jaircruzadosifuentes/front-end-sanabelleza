import React, { Fragment } from "react";
import { InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function Filter({
  handleSearchForSurNames
}) {
  return (
    <Fragment>
      <InputFormControl
        type="text"
        className="col-md-4"
        label="Buscar por nombres o apellidos"
        isLabel
        autoFocus
        onChange={handleSearchForSurNames}
      />
      <div className="col-md-4">
      </div>
    </Fragment> 
  )
}
Filter.propTypes = {
  handleSearchForSurNames: PropTypes.func,
};