import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListEmployeedDisponibility from "./list-employeed-disponibility";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import Alert from "@mui/material/Alert/Alert";
import { ReactAgenda } from 'react-agenda';
import { COLOR_BUTTON_MAB, COLOR_YELLOW } from "src/config/config";
import { COLOR_GREEN } from "src/utils/constants";
import { getDateNow } from "src/utils/utils";
require('moment/locale/es.js'); // this is important for traduction purpose

const COLOR_SCHEDULE = {
  'color-1': COLOR_GREEN,
  "color-2": COLOR_BUTTON_MAB,
  "color-3": COLOR_YELLOW,
  "color-4": COLOR_GREEN,
  "color-5": COLOR_BUTTON_MAB
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FormDisponibilty({
  employeedsDisponibiltyResult = [],
  employeeds = [],
  handleViewDisponibiltyForIdEmployeed,
  handleChangeSearchForDate,
  handleChangeEmployeed,
  handleAsignarSchedule,
  handleChangeDateRegisterSchedule,
  handleChangeHourInitialRegisterSchedule,
  handleChangeHourFinishedRegisterSchedule,
  employeedsWithScheduleResult = [],
  dateOfRegister,
  hourInitial,
  hourFinished,
  handleCloseModalEmployeedDisponibility
}) {
  const [value, setValue] = React.useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(5);
  console.log(setStartDate, setNumberOfDays);
  let now = new Date();
  employeedsDisponibiltyResult.map(s => {
    s.startDateTime = new Date(s.startDateTime) 
    s.endDateTime = new Date(s.endDateTime)
    switch (parseInt(s.state)) {
      case 1:
        s.classes = 'color-1'
        break;
      case 2:
        s.classes = 'color-2'
        break;
      case 3:
        s.classes = 'color-3'
        break;
      case 4:
        s.classes = 'color-4'
        break;
      case 5:
        s.classes = 'color-5'
        break;
      default:
        break;
    };
    return null;
  });
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <div className="row">
          <div className="col-md-6 mt-3 mb-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={employeeds}
              autoHighlight
              getOptionLabel={(option) => option.label}
              onChange={handleChangeEmployeed}
              sx={{ width: '100%' }}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="45"
                    src={`images/avatars/${option.person.profilePicture}`}
                    srcSet={`images/avatars/${option.person.profilePicture} 2x`}
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
            type="date"
            autoFocus
            className="col-md-4"
            label="Fecha"
            isLabel
            defaultValue={getDateNow()}
            onChange={handleChangeSearchForDate}
          />
          <div className="col-md-2 mt-4 mb-2 col-xs-2 col-lg-2">
            <ButtonFormControl
              title="Buscar"
              color='btn btn-primary btn-lg'
              type={9}
              onClick={handleViewDisponibiltyForIdEmployeed}
            />
          </div>
        </div>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ver Modo Horario" {...a11yProps(0)} />
          <Tab label="Ver Modo Listado" {...a11yProps(1)} />
          <Tab label="Registro de Disponibilidad" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="col-md-12">
          <ReactAgenda
            minDate={new Date(now.getFullYear(), now.getMonth() - 2)}
            maxDate={new Date(now.getFullYear(), now.getMonth() + 2)}
            startDate={startDate}
            items={employeedsDisponibiltyResult}
            numberOfDays={numberOfDays}
            rowsPerHour={6}
            itemColors={COLOR_SCHEDULE}
            locale={'es'}
            autoScale
            fixedHeader={false}
            startAtTime={9}
            endAtTime={20.90}
            cellHeight={15}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListEmployeedDisponibility
          rows={employeedsDisponibiltyResult}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="row">
          <Label title={'REGISTRO DE HORARIO'} />
          <InputFormControl
            type="date"
            autoFocus
            className="col-md-4"
            label="Fecha"
            isLabel
            onChange={handleChangeDateRegisterSchedule}
            defaultValue={dateOfRegister}
          />
          <InputFormControl
            type="time"
            autoFocus
            className="col-md-4"
            label="Hora Inicio"
            isLabel
            onChange={handleChangeHourInitialRegisterSchedule}
            defaultValue={hourInitial}
            />
          <InputFormControl
            type="time"
            autoFocus
            className="col-md-4"
            label="Hora Fin"
            isLabel
            onChange={handleChangeHourFinishedRegisterSchedule}
            defaultValue={hourFinished}
          />
          <br />
          <div className="col-md-12 mt-3 mb-4">
            {
              employeedsWithScheduleResult.length > 0 ?
              <>
                <Alert severity="error">
                  {
                    employeedsWithScheduleResult.map((e, index) => {
                      return(
                        <li key={index}>{`Ya existe una cita programada para ${e.patientWithSchedule} a horas de: ${e.hourInitial} - ${e.hourFinished}. Por favor, escoja otro horario.`}</li>
                      )
                    })
                  }

                </Alert>
              </>:
              <Alert severity="success">No existe interferencia entre las horas ingresadas. Proceda a asignar la disponibilidad al paciente.</Alert>

            }
          </div>
          <br />
          <div className="btn-toolbar mt-3" >
            <div className="btn-group">
              <ButtonFormControl
                title="Asignar"
                color='btn btn-success'
                onClick={handleAsignarSchedule}
                type={1}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Cancelar"
                color='btn btn-danger'
                type={2}
                onClick={handleCloseModalEmployeedDisponibility}
              />
            </div>
          </div>
        </div>
      </TabPanel>
    </Box >
  )
}
FormDisponibilty.propTypes = {
  employeeds: PropTypes.array,
  employeedsWithScheduleResult: PropTypes.array,
  employeedsDisponibiltyResult: PropTypes.array,
  handleViewDisponibiltyForIdEmployeed: PropTypes.func,
  handleCloseModalEmployeedDisponibility: PropTypes.func,
  handleChangeSearchForDate: PropTypes.func,
  handleChangeEmployeed: PropTypes.func,
  handleAsignarSchedule: PropTypes.func,
  handleChangeDateRegisterSchedule: PropTypes.func,
  handleChangeHourInitialRegisterSchedule: PropTypes.func,
  handleChangeHourFinishedRegisterSchedule: PropTypes.func,
  dateOfRegister: PropTypes.string,
  hourInitial: PropTypes.string,
  hourFinished: PropTypes.string
};