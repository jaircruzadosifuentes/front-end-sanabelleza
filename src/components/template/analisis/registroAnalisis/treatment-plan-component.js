import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { InputFormControl, SelectedFormControl, TextAreaFormControl } from "src/components/molecules";
import { Label } from "src/components/atoms";
import SpanFormControl from "src/components/atoms/SpanFormControl";
const listPeriodo = [
  {
    value: 1,
    label: 'DIARIO (TODOS LOS DÍAS)'
  },
  {
    value: 2,
    label: '2 VECES POR SEMANA'
  },
  {
    value: 3,
    label: '3 VECES POR SEMANA'
  },
]
export default function TreatmentPlanComponent({
  packetsOrUnitSession = [],
  pathologiesInCombo = []
}) {
  return (
    <Fragment>
      <Label title={'PAQUETE Y FRECUENCIA DEL TRATAMIENTO'} isColor isBold />
      <div className="row mb-3">
        <SelectedFormControl
          className="col-md-3"
          placeHolder="Selecciona un paquete"
          titleLabel="Paquete"
          options={packetsOrUnitSession}
          autoFocus
        />
        <SelectedFormControl
          className="col-md-3"
          placeHolder="Selecciona la frecuencia"
          titleLabel="Frecuencia"
          options={listPeriodo}
          autoFocus
        />
      </div>
      <Label title={'PLAN DE TRATAMIENTO'} isSuccess isBold />
      <div className="row">
        <TextAreaFormControl
          type="text"
          autoFocus
          rows={4}
          className="col-md-6"
          label="Plan de tratamiento"
          isLabel
        />
        <SelectedFormControl
          className="col-md-3"
          placeHolder="Selecciona patología detectada"
          titleLabel="Patología"
          options={pathologiesInCombo}
          autoFocus
        />
        <TextAreaFormControl
          type="text"
          autoFocus
          rows={4}
          className="col-md-3"
          label="Diagnóstico Final"
          isLabel
        />
      </div>
      <div className="row mt-4">
        <div className="col-md-10 mt-4"></div>
        <div className="col-md-2 mt-4 text-center">
          <SpanFormControl title={`Madelyne Marcela Lozada Durand`} isBold />
          <hr />
          <SpanFormControl title={`Fisioterapeuta`} />
        </div>
      </div>
    </Fragment>
  )
}
TreatmentPlanComponent.propTypes = {
  packetsOrUnitSession: PropTypes.array,
  pathologiesInCombo: PropTypes.array,
};