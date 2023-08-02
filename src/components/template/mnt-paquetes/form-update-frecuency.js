import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from "prop-types";

export default function FormUpdateFrecuency({
  handleChangeGuardaEditarFrecuencia,
  handleChangeDescriptionFrecuencyEdit,
  handleChangeAbbreviationFrecuencyEdit,
  handleChangeValorEdit,
  objetoFrecuencia = {},
  handleCloseFrecuenciaEdit
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
          onChange={handleChangeDescriptionFrecuencyEdit}
          defaultValue={objetoFrecuencia.frecuencyDescription}
        />
        <InputFormControl
          type="text"
          className="col-md-6"
          label="Abreviación"
          isLabel
          onChange={handleChangeAbbreviationFrecuencyEdit}
          defaultValue={objetoFrecuencia.abbreviation}
        />
        <InputFormControl
          type="number"
          className="col-md-4"
          isLabel
          label="Valor (Diario: 1, Cada 2 días: 2)..."
          align="center"
          onChange={handleChangeValorEdit}
          defaultValue={objetoFrecuencia.value}
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
                onClick={handleCloseFrecuenciaEdit}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Guardar"
                color='btn btn-success'
                type={1}
                onClick={handleChangeGuardaEditarFrecuencia}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
FormUpdateFrecuency.propTypes = {
  objetoFrecuencia: PropTypes.object,
  handleCloseFrecuenciaEdit: PropTypes.func,
  handleChangeGuardaEditarFrecuencia: PropTypes.func,
  handleChangeDescriptionFrecuencyEdit: PropTypes.func,
  handleChangeAbbreviationFrecuencyEdit: PropTypes.func,
  handleChangeValorEdit: PropTypes.func,
};