import React from "react";
import { ButtonFormControl, InputFormControl } from "../molecules";
import SpanFormControl from "../atoms/SpanFormControl";
import { COLOR_BUTTON_MAB, COLOR_GREEN } from "src/config/config";
import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function SearchReniecPerson({
  onKeyUpDniSunat,
  handleChangeDniSunat,
  objReniecSearch = {},
  handleChangeReniecManual,
  reniecManual = false,
  objPersonManual = {},
  handleCloseModalSearch
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Presione enter para realizar la búsqueda del cliente
          </Alert>
        </div>
      </div>
      <div className="row">
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-6"
          label={`DNI`}
          isLabel
          onKeyUp={onKeyUpDniSunat}
          onChange={handleChangeDniSunat}
          isBold
        />
        <div className="col-md-6 mt-3">
          <span style={{ color: reniecManual ? COLOR_GREEN : COLOR_BUTTON_MAB }}>
            {
              !reniecManual ?
                <span>
                  Consultar cliente a RENIEC
                </span> :
                <span>
                  Consultar cliente a RENIEC
                </span>
            }
          </span>
          <Switch
            {...label}
            onChange={handleChangeReniecManual}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 mt-2">
          <span>Nombres:</span>
        </div>
        <div className="col-md-10 mt-2">
          {
            objReniecSearch?.data?.nombre_completo === undefined ?
              <SpanFormControl title={objPersonManual?.names === null ? 'Buscando...' : objPersonManual?.names === undefined ? '' : objPersonManual?.names + ' ' + objPersonManual?.surnames} /> :
              <SpanFormControl title={objReniecSearch?.data?.nombre_completo} />
          }
        </div>
        <div className="col-md-12 mt-2 text-center">
          {
            !objReniecSearch.success ?
              <span style={{ color: COLOR_BUTTON_MAB }}>{objReniecSearch.message}</span>
              :
              <span style={{ color: COLOR_GREEN }}>¡Datos encontrados!</span>
          }
        </div>
      </div>
      <div className="row mt-2 mb-2">
        <ButtonFormControl
          title="Aceptar"
          color='btn btn-primary'
          type={7}
          onClick={handleCloseModalSearch}
        />
      </div>
    </div>
  )
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };

SearchReniecPerson.propTypes = {
  handleCloseModalSearch: PropTypes.func,
  onKeyUpDniSunat: PropTypes.func,
  handleChangeReniecManual: PropTypes.func,
  handleChangeDniSunat: PropTypes.func,
  objReniecSearch: PropTypes.object,
  objPersonManual: PropTypes.object,
  reniecManual: PropTypes.bool,
};
