import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from "prop-types";

export default function Form({
  handleChangeCostCu,
  handleClosePackets,
  handleChangeSavePackets,
  handleChangeDescriptionPacket,
  handleChangeAbbreviation,
  handleChangeNroSesion,
  handleChangeMaxCuotas
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
          onChange={handleChangeDescriptionPacket}
        />
        <InputFormControl
          type="text"
          className="col-md-6"
          label="Abreviación"
          isLabel
          onChange={handleChangeAbbreviation}
        />
        <InputFormControl
          type="number"
          className="col-md-2"
          isLabel
          label="Nro Sesiones"
          align="center"
          onChange={handleChangeNroSesion}
        />
        <InputFormControl
          type="number"
          className="col-md-2"
          isLabel
          label="Costo C/U"
          align="center"
          onChange={handleChangeCostCu}
        />
        <InputFormControl
          type="number"
          className="col-md-2"
          isLabel
          label="Máx Cuotas"
          align="center"
          onChange={handleChangeMaxCuotas}
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
                onClick={handleClosePackets}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Guardar"
                color='btn btn-success'
                type={1}
                onClick={handleChangeSavePackets}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
Form.propTypes = {
  handleChangeCostCu: PropTypes.func,
  handleClosePackets: PropTypes.func,
  handleChangeSavePackets: PropTypes.func,
  handleChangeMaxCuotas: PropTypes.func,
  handleChangeNroSesion: PropTypes.func,
  handleChangeAbbreviation: PropTypes.func,
  handleChangeDescriptionPacket: PropTypes.func,
};