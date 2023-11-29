import React from "react";
import { Label } from "src/components/atoms";
import { InputFormControl, TextAreaFormControl } from "src/components/molecules";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];
export default function Diagnosis({
  handleChangeTieneAlergiaMedic,
  openSwitchTieneAlergiaMedic = false,
  handleChangeRangoUmbral,
  colorUmbral = '',
  handleChangeExploracionFisica,
  handleChangeDescDiag,
  handleChangeDescMedic
}) {
  return (
    <div className="card mt-2">
      <div className="card-body">
        <Label title={'DIAGNÓSTICO CLÍNICO'} isBold isTextAlign textAlign="left" />
        <div className="col-md-12 mt-2">
          <div className="row">
            <TextAreaFormControl
              type="text"
              className="col-md-8"
              label="Exploración física"
              isLabel
              rows={3}
              onChange={handleChangeExploracionFisica}
            />
            <div className="col-md-4 mt-2">
              <Label title={`Rango del umbral del dolor`}/>
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Always visible"
                  step={1}
                  marks={marks}
                  onChange={handleChangeRangoUmbral}
                  style={{color: colorUmbral}}
                  valueLabelDisplay="auto"
                  max={50 / 10}
                />
              </Box>  
            </div>
          </div>
          <div className="row">
            <TextAreaFormControl
              type="text"
              className="col-md-5"
              label="Diagnóstico: (Escriba detalladamente)"
              isLabel
              rows={3}
              onChange={handleChangeDescDiag}
            />
            <div className="col-md-2 mt-4">
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked={openSwitchTieneAlergiaMedic} onChange={handleChangeTieneAlergiaMedic} />} label="¿Toma algún medicamento?" />
              </FormGroup>
            </div>
            <InputFormControl
              type="text"
              className="col-md-5"
              isLabel
              label={`Medicinas ${openSwitchTieneAlergiaMedic ? '(Escriba las medicinas)' : ''}`}
              isDisabled={!openSwitchTieneAlergiaMedic}
              onChange={handleChangeDescMedic}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
Diagnosis.propTypes = {
  handleChangeDescMedic: PropTypes.func,
  handleChangeDescDiag: PropTypes.func,
  handleChangeExploracionFisica: PropTypes.func,
  handleChangeTieneAlergiaMedic: PropTypes.func,
  handleChangeRangoUmbral: PropTypes.func,
  openSwitchTieneAlergiaMedic: PropTypes.bool,
  colorUmbral: PropTypes.string,
};