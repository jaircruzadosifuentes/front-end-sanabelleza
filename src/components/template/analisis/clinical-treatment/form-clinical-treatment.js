import React from "react";
import { TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';
import { Label } from "src/components/atoms";
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
          className="col-md-6"
          label="Observaciones: (Escriba detalladamente)"
          isLabel
          onChange={handleChangeDiagnostico}
          rows={3}
        />
        <div className="col-md-4 mt-4">
          <Label title={`Exploración física (1: SIN DOLOR, 2: DOLOR MEDIO, 3: DOLOR INTENSO)`}/>
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
        <TextAreaFormControl
          type="text"
          className="col-md-6"
          label="Recomendación: (Escriba detalladamente)"
          isLabel
          rows={4}
          onChange={handleChangeRecomendacion}
        />
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