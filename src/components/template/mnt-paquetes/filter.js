import React, { Fragment } from "react";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function Filter({
  handleSearch,
  handleClickNewPackets,
  handleExportarExcel
}) {
  return (
    <Fragment>
      <InputFormControl
        type="text"
        className="col-md-4"
        label="Buscar por descripción"
        isLabel
        autoFocus
        onChange={handleSearch}
      />
      <div className="col-md-5">
      </div>
      <div className="col-md-3 btn-toolbar mt-3">
        <div className="btn-group">
          <ButtonFormControl
            title="Nuevo paquete"
            color='btn btn-success'
            onClick={handleClickNewPackets}
            type={7}
          />
        </div>&nbsp;
        <div className="btn-group">
          <ButtonFormControl
            title="Exportar excel"
            color='btn btn-primary'
            type={8}
            onClick={handleExportarExcel}
          />
        </div>
      </div>
    </Fragment>
  )
}
Filter.propTypes = {
  handleSearch: PropTypes.func,
  handleClickNewPackets: PropTypes.func,
  handleExportarExcel: PropTypes.func,
};