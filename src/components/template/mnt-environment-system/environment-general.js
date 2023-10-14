import React from "react";
import { Label } from "src/components/atoms";
import SpanFormControl from "src/components/atoms/SpanFormControl";
import { ButtonFormControl, InputFormControl, TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function EnvironmentGeneral({
  config = {},
  handleChangeTitle,
  handleChangeRuc,
  handleChangeAddress,
  handleChangeIntentPermi,
  handleChangeCitaIni,
  handleChangeCitPro,
  handleChangeUpdateEnvironment
}) {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <Label title={'VARIABLES GENERAL'} isBold />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mt-4" style={{ textAlign: 'right' }}>
              <SpanFormControl title="Nombre del Sistema:" />
            </div>
            <InputFormControl
              type="text"
              className="col-md-6"
              defaultValue={config.title}
              onChange={handleChangeTitle}
            />
          </div>
          <div className="row">
            <div className="col-md-3 mt-4" style={{ textAlign: 'right' }}>
              <SpanFormControl title="RUC:" />
            </div>
            <InputFormControl
              type="text"
              className="col-md-6"
              defaultValue={config.ruc}
              onChange={handleChangeRuc}
            />
          </div>
          <div className="row">
            <div className="col-md-3 mt-4" style={{ textAlign: 'right' }}>
              <SpanFormControl title="Dirección:" />
            </div>
            <TextAreaFormControl
              defaultValue={config.address}
              rows={3}
              className="col-md-6 mt-3"
              onChange={handleChangeAddress}
            />
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <Label title={'ACCESO AL SISTEMA'} isBold />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mt-4" style={{ textAlign: 'right' }}>
              <SpanFormControl title="Intentos permitidos:" />
            </div>
            <InputFormControl
              type="text"
              className="col-md-2"
              defaultValue={(config.intentos_permitidos)}
              onChange={handleChangeIntentPermi}
            />
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <Label title={'MÓDULO DE CITAS FISIOTERAPÉUTICAS'} isBold />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mt-4" style={{ textAlign: 'right' }}>
              <SpanFormControl title="Tiempo cita inicial:" />
            </div>
            <InputFormControl
              type="text"
              className="col-md-2"
              defaultValue={(config.tiempo_cita_inicial)}
              onChange={handleChangeCitaIni}
            />
          </div>
          <div className="row">
            <div className="col-md-3 mt-4" style={{ textAlign: 'right' }}>
              <SpanFormControl title="Tiempo cita programada:" />
            </div>
            <InputFormControl
              type="text"
              className="col-md-2"
              defaultValue={(config.tiempo_cita_programada)}
              onChange={handleChangeCitPro}
            />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <ButtonFormControl
                title={`Guardar`}
                color='btn btn-success mt-1'
                type={1}
                onClick={handleChangeUpdateEnvironment}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
EnvironmentGeneral.propTypes = {
  config: PropTypes.object,
  handleChangeTitle: PropTypes.func,
  handleChangeRuc: PropTypes.func,
  handleChangeAddress: PropTypes.func,
  handleChangeIntentPermi: PropTypes.func,
  handleChangeCitaIni: PropTypes.func,
  handleChangeCitPro: PropTypes.func,
  handleChangeUpdateEnvironment: PropTypes.func
};