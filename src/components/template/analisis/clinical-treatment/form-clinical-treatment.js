import React from "react";
import { TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';
import { Label } from "src/components/atoms";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from "@mui/material";
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
export default function FormClinicalTreatment({
  handleChangeDiagnostico,
  handleChangeRecomendacion,
  handleChangeRangoUmbral,
  colorUmbral = '',
}) {
  return (
    <>
      <Label title={'EVALUACIÓN AL PACIENTE'} isBold isColor />
      <div className="row">
        <TextAreaFormControl
          type="text"
          className="col-md-4"
          label="Observaciones: (Escriba detalladamente)"
          isLabel
          onChange={handleChangeDiagnostico}
          rows={3}
        />

        <TextAreaFormControl
          type="text"
          className="col-md-4"
          label="Recomendación: (Escriba detalladamente)"
          isLabel
          rows={3}
          onChange={handleChangeRecomendacion}
        />
        <div className="col-md-4 mt-4">
          <div className="row">
            <div className="col-md-11">
              <Label title={`Exploración física:`} />
            </div>
            <div className="col-md-1 mt-1" style={{ cursor: 'pointer' }}>
              <Tooltip title='(1: SIN DOLOR, 2: DOLOR MODERADO, 3: DOLOR INTENSO)'>
                <InfoIcon />
              </Tooltip>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <Slider
              aria-label="Always visible"
              step={1}
              marks={marks}
              onChange={handleChangeRangoUmbral}
              style={{ color: colorUmbral }}
              valueLabelDisplay="auto"
              max={30 / 10}
            />
          </Box>
        </div>
      </div>
    </>
  )
}
FormClinicalTreatment.propTypes = {
  handleChangeDiagnostico: PropTypes.func,
  handleChangeRecomendacion: PropTypes.func,
  handleChangeRangoUmbral: PropTypes.func,
  colorUmbral: PropTypes.string,
};