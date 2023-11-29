import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import { convertDateTimeToDate } from "src/utils/utils";
import { Label } from "src/components/atoms";
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GREEN } from "src/config/config";
import { Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function FormModalReschedule({
  objRescheAppo = {},
  employeeds = [],
  handleViewDisponibilty,
  handleChangeNewDate,
  handleChangeEmployeed,
  employeedsDisponibiltyResult = [],
  handleChangeItemHorario,
  horario = '',
  handleSaveReschedule,
  handleCloseModalRescheduleApp
}) {
  return (
    <Fragment>
      <div className="row">
        <Label title={'DETALL DE LA CITA A REPROGRAMAR'} isBold />
        <InputFormControl
          type="text"
          className="col-md-3"
          isLabel
          label="Fecha programada"
          readOnly
          defaultValue={convertDateTimeToDate(objRescheAppo.dateOfAttention)}
        />
        <InputFormControl
          type="text"
          className="col-md-3"
          isLabel
          label="Hora programada"
          readOnly
          defaultValue={`${objRescheAppo.hourOffAttention}`}
        />
        <InputFormControl
          type="text"
          className="col-md-2"
          isLabel
          align="center"
          readOnly
          label="Nro Sesión"
          defaultValue={(objRescheAppo.sessionNumber)}
        />
        <div className="col-md-2">
          <div className="row">
            <div className="col-md-12 text-center">
              <Label title={'¿Asistió?'} />
            </div>
            <div className="col-md-12 mt-1 mb-1 text-center">
              <span>{objRescheAppo.isQueueRemoval ? 'SI' : 'NO'}</span>&nbsp;&nbsp;&nbsp;
              <Tooltip title={objRescheAppo.isQueueRemoval ? 'SI ASISTIÓ' : 'NO ASISTIÓ'} placement="top">
                {objRescheAppo.isQueueRemoval ? < CheckCircleIcon style={{ color: COLOR_GREEN, cursor: 'pointer' }} /> : <CancelIcon style={{ color: COLOR_BUTTON_MAB, cursor: 'pointer' }} />}
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="row">
            <div className="col-md-12 text-center">
              <Label title={'¿Fue Atendido?'} />
            </div>
            <div className="col-md-12 mt-1 mb-1 text-center">
              <span>{objRescheAppo.isAttention ? 'SI' : 'NO'}</span>&nbsp;&nbsp;&nbsp;
              <Tooltip title={!objRescheAppo.isAttention ? 'NO' : 'SI'} placement="top">
                {objRescheAppo.isAttention ? < CheckCircleIcon style={{ color: COLOR_GREEN, cursor: 'pointer' }} /> : <CancelIcon style={{ color: COLOR_BUTTON_MAB, cursor: 'pointer' }} />}
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2 mb-1">
        <div className="col-md-4">
          <Label
            title={`Será atendido(a) por la(el):`}
          />
        </div>
        <div className="col-md-8">
          <Label
            title={`${objRescheAppo?.employeed?.role?.name}. ${objRescheAppo.employeed?.person?.names} ${objRescheAppo.employeed?.person?.surnames}`}
            isColor
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <Label title={'NUEVAS FECHAS DE LA CITA'} isBold />
        <div className="col-md-7 mt-3 mb-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employeeds}
            onChange={handleChangeEmployeed}
            autoHighlight
            getOptionLabel={(option) => option.label}
            defaultValue={employeeds.filter(e => e.employeedId === objRescheAppo?.employeed?.employeedId)[0]}
            sx={{ width: '100%' }}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="45"
                  src={`${option.person.profilePicture}`}
                  srcSet={`${option.person.profilePicture} 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Trabajador"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )} />
        </div>
        <InputFormControl
          type="text"
          className="col-md-3"
          isLabel
          readOnly
          label="Nueva Fecha"
          onChange={handleChangeNewDate}
          defaultValue={convertDateTimeToDate(objRescheAppo.dateOfAttention)}
        />
        <div className="col-md-2 mt-4">
          <ButtonFormControl
            title="Buscar"
            color='btn btn-primary'
            type={9}
            onClick={(e) =>handleViewDisponibilty(e, (objRescheAppo.dateOfAttention))}
          />
        </div>
        <hr />
        <Label title={'HORARIOS DISPONIBLES'} isBold />
        {
          employeedsDisponibiltyResult.length > 0? employeedsDisponibiltyResult.map((d, index) => {
            return (
              <div className="col-md-3 mt-1 mb-1" key={index}>
                <Stack direction="col" spacing={1} >
                  <Chip
                    label={`${d.hourInitial} - ${d.hourFinished}`}
                    component="a"
                    onClick={(e) => handleChangeItemHorario(e, d)}
                    variant="outlined"
                    style={{background: horario === (`${d.hourInitial} - ${d.hourFinished}`) ? COLOR_BLUE_MAB: '', color: horario === (`${d.hourInitial} - ${d.hourFinished}`)? 'white': ''}}
                    clickable
                  />
                </Stack>
              </div>
            )
          }): 
          <span>
            No existen datos para mostrar
          </span>
        }
        <Label title={''} isBold />
        <hr />
        <div className="row">
          <div className="col-md-12">
            <div className="btn-toolbar" style={{ float: 'right' }}>
              <div className="btn-group">
                <ButtonFormControl
                  title="Cancelar"
                  color='btn btn-danger'
                  type={2}
                  onClick={handleCloseModalRescheduleApp}
                />
              </div>&nbsp;
              <div className="btn-group">
                <ButtonFormControl
                  title="Guardar"
                  color='btn btn-success'
                  type={1}
                  onClick={handleSaveReschedule}
                />
              </div>&nbsp;
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
FormModalReschedule.propTypes = {
  objRescheAppo: PropTypes.object,
  employeeds: PropTypes.array,
  employeedsDisponibiltyResult: PropTypes.array,
  handleViewDisponibilty: PropTypes.func,
  handleChangeNewDate: PropTypes.func,
  handleChangeEmployeed: PropTypes.func,
  handleChangeItemHorario: PropTypes.func,
  handleSaveReschedule: PropTypes.func,
  handleCloseModalRescheduleApp: PropTypes.func,
  horario: PropTypes.string,
};