import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from "prop-types";

export default function FormUpdatePaquete({
  objetoPaquete = {},
  handleChangeMaxCuotasEditar,
  handleClosePacketsEdit,
  handleChangeDescriptionPacketEdit,
  handleChangeAbbreviationEdit,
  handleChangeNroSesionEdit,
  handleChangeCostCuEdit,
  handleChangeGuardaPacketsEdit
}) {
  return (
    <div className="container form-group">
      <Label title={'CONFIGURACIÓN DE PAQUETES'} isBold />
      <div className="row">
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-12"
          label="Descripción del Paquete"
          isLabel
          defaultValue={objetoPaquete.description}
          onChange={handleChangeDescriptionPacketEdit}
        />
        <InputFormControl
          type="text"
          className="col-md-6"
          label="Abreviación"
          isLabel
          defaultValue={objetoPaquete.abbreviation}
          onChange={handleChangeAbbreviationEdit}
        />
        <InputFormControl
          type="number"
          className="col-md-2"
          isLabel
          label="Nro Sesiones"
          align="center"
          defaultValue={objetoPaquete?.numberSessions}
          onChange={handleChangeNroSesionEdit}
        />
        <InputFormControl
          type="number"
          className="col-md-2"
          isLabel
          label="Costo C/U"
          align="center"
          defaultValue={parseFloat(objetoPaquete?.costPerUnit)}
          onChange={handleChangeCostCuEdit}
          />
        <InputFormControl
          type="number"
          className="col-md-2"
          isLabel
          label="Máx Cuotas"
          align="center"
          defaultValue={parseInt(objetoPaquete?.maximumFeesToPay)}
          onChange={handleChangeMaxCuotasEditar}
        />
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                type={2}
                onClick={handleClosePacketsEdit}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Guardar"
                color='btn btn-success'
                type={1}
                onClick={handleChangeGuardaPacketsEdit}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
FormUpdatePaquete.propTypes = {
  objetoPaquete: PropTypes.object,
  handleChangeMaxCuotasEditar: PropTypes.func,
  handleClosePacketsEdit: PropTypes.func,
  handleChangeGuardaPacketsEdit: PropTypes.func,
  handleChangeCostCuEdit: PropTypes.func,
  handleChangeNroSesionEdit: PropTypes.func,
  handleChangeAbbreviationEdit: PropTypes.func,
  handleChangeDescriptionPacketEdit: PropTypes.func,
};