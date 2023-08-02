import React, { Fragment } from "react";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function Filter({
  handleSearch,
  handleClickNewPackets,
  handleExportarExcel,
  selectedValue
}) {
  return (
    <div className="row">
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
            title={`${selectedValue === 'a'? 'Nuevo paquete': 'Nueva frecuencia'}`}
            color='btn btn-success'
            onClick={handleClickNewPackets}
            type={7}
          />
        </div>&nbsp;
        <div className="btn-group">
          <ButtonFormControl
            title="Exportar excel"
            color='btn btn-primary'
            type={10}
            disabled
            onClick={handleExportarExcel}
          />
        </div>
      </div>
    </div>
  )
}
Filter.propTypes = {
  handleSearch: PropTypes.func,
  handleClickNewPackets: PropTypes.func,
  selectedValue: PropTypes.string,
  handleExportarExcel: PropTypes.func,
};