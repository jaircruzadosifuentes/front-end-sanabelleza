import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListEmployeedDisponibility from "./list-employeed-disponibility";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import Alert from "@mui/material/Alert/Alert";
import { getDateNow } from "src/utils/utils";
import AutoCompleteTextField from "src/components/organism/autocomplete-text-field";
import AgendaView from "src/components/organism/agenda-view";
import { Chip, Stack } from "@mui/material";
import { COLOR_BLUE_MAB } from "src/config/config";
require('moment/locale/es.js'); // this is important for traduction purpose

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
  handleCloseModalEmployeedDisponibility,
  handleItemEditSchedule
}) {
  const [value, setValue] = useState(0);
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
    return s;
  });
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <div className="row">
          <AutoCompleteTextField
            rows={employeeds}
            className="col-md-6 mt-3 mb-3"
            handleOnChange={handleChangeEmployeed}
          />
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
              color='btn btn-primary btn-block'
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
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="row">
          <div className="col-md-12">
            <Label title={'Horarios libres'} isBold/>
          </div>
          {
            employeedsDisponibiltyResult.length > 0 ? employeedsDisponibiltyResult.map((d, index) => {
              return (
                <div className="col-md-3 mt-1 mb-1" key={index}>
                  <Stack direction="col" spacing={1} >
                    <Chip
                      label={`${d.hourInitial} - ${d.hourFinished}`}
                      component="a"
                      onClick={(e) => handleItemEditSchedule(e, d)}
                      variant="outlined"
                      style={{ background: (`${hourInitial} - ${hourFinished}`) === (`${d.hourInitial} - ${d.hourFinished}`) ? COLOR_BLUE_MAB : '', color: (`${hourInitial} - ${hourFinished}`) === (`${d.hourInitial} - ${d.hourFinished}`) ? 'white' : '' }}
                      clickable
                    />
                  </Stack>
                </div>
              )
            }) :
              <span>
                No existen datos para mostrar
              </span>
          }
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
                        return (
                          <li key={index}>{`Ya existe una cita programada para ${e.patientWithSchedule} a horas de: ${e.hourInitial} - ${e.hourFinished}. Por favor, escoja otro horario.`}</li>
                        )
                      })
                    }

                  </Alert>
                </> :
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
  handleItemEditSchedule: PropTypes.func,
  handleChangeHourFinishedRegisterSchedule: PropTypes.func,
  dateOfRegister: PropTypes.string,
  hourInitial: PropTypes.string,
  hourFinished: PropTypes.string
};