import React from "react";
import { Label } from "src/components/atoms";
import { InputFormControl } from "src/components/molecules";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

export default function Evaluation({
  handleChangeTieneEnfermedad,
  openSwitchTieneEnf = false,
  handleChangeOper,
  openSwitchTieneOper = false,
  handleChangeWeight,
  handleChangeEnfermedad,
  handleChangeOperation
}) {
  return (
    <div className="card">
      <div className="card-body">
        <Label title={'EVALUACIÓN'} isBold isTextAlign textAlign="left" />
        <div className="col-md-12 mt-2">
          <div className="row">
            <InputFormControl
              type="number"
              autoFocus
              className="col-md-2"
              label="Peso (KG) *Opcional"
              isLabel
              align="right"
              onChange={handleChangeWeight}
            />
            <div className="col-md-2 mt-4">
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked={openSwitchTieneEnf} onChange={handleChangeTieneEnfermedad} />} label="¿Tiene alguna enfermedad?" />
              </FormGroup>
            </div>
            <InputFormControl
              type="text"
              className="col-md-3"
              isLabel
              label={`Enfermedad ${openSwitchTieneEnf ? '*Obligatorio': ''}`}
              isDisabled={!openSwitchTieneEnf}
              onChange={handleChangeEnfermedad}
            />
            <div className="col-md-2 mt-4">
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked={openSwitchTieneOper} onChange={handleChangeOper} />} label="¿Tiene alguna operación?" />
              </FormGroup>
            </div>
            <InputFormControl
              type="text"
              className="col-md-3"
              isLabel
              label={`Operación ${openSwitchTieneOper ? '*Obligatorio': ''}`}
              isDisabled={!openSwitchTieneOper}
              onChange={handleChangeOperation}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
Evaluation.propTypes = {
  handleChangeOper: PropTypes.func,
  handleChangeTieneEnfermedad: PropTypes.func,
  openSwitchTieneEnf: PropTypes.bool,
  openSwitchTieneOper: PropTypes.bool,
  handleChangeWeight: PropTypes.func,
  handleChangeEnfermedad: PropTypes.func,
  handleChangeOperation: PropTypes.func,
};