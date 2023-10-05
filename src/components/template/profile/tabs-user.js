import React, { Fragment } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import PropTypes from 'prop-types';
import SpanFormControl from "src/components/atoms/SpanFormControl";
import { convertDateTimeToDate } from "src/utils/utils";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CakeIcon from '@mui/icons-material/Cake';
import { COLOR_BLUE } from "src/utils/constants";
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TabsUser({
  employeedDetail = {}
}) {
  const [value, setValue] = useState('1');

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ maxWidth: { xs: 640, sm: 960 }, bgcolor: 'background.paper' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <hr />
            <TabList onChange={handleChange} aria-label="lab API tabs example" allowScrollButtonsMobile scrollButtons variant="scrollable">
              <Tab label="Datos Personales" value="1" />
              <Tab label="Historial Clinico" value="2" />
              <Tab label="Actividades" value="3" />
              <Tab label="Sesiones Programadas" value="4" />
              <Tab label="Pagos" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ComponentDatosPersonales
              employeedDetail={employeedDetail}
            />
          </TabPanel>
          <TabPanel value="2">Historial Clínico</TabPanel>
          <TabPanel value="3">Actividades</TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
TabsUser.propTypes = {
  employeedDetail: PropTypes.object,
};

const ComponentDatosPersonales = ({
  employeedDetail = {}
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 col-xs-9">
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <div className="row">
                <div className="col-md-1 col-xs-3">
                  <CakeIcon style={{ color: COLOR_BLUE }} />
                </div>
                <div className="col-md-11 col-xs-12">
                  <SpanFormControl title={`Nació el ${convertDateTimeToDate(employeedDetail?.person?.birthDate)} y tiene ${employeedDetail?.person?.age} años.`} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-1 col-xs-3">
                  <AttachEmailIcon style={{ color: COLOR_BLUE }} />
                </div>
                <div className="col-md-11 col-xs-12">
                  <SpanFormControl title={`Email: ${employeedDetail?.person?.personEmail?.emailDescription}`} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-1 col-xs-3">
                  <SettingsCellIcon style={{ color: COLOR_BLUE }} />
                </div>
                <div className="col-md-11 col-xs-12">
                  <SpanFormControl title={`Celular: ${employeedDetail?.person?.personCellphone?.cellPhoneNumber}`} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-1 col-xs-3">
                  <AccountBoxIcon style={{ color: COLOR_BLUE }} />
                </div>
                <div className="col-md-11 col-xs-12">
                  <SpanFormControl title={`Estado Civil: ${employeedDetail?.person?.civilStatus}`} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-1 col-xs-3">
                  {
                    employeedDetail.person?.gender === 'F' ?
                    <FemaleIcon style={{ color: COLOR_BLUE }}/>
                    : <MaleIcon style={{ color: COLOR_BLUE }}/>
                  }
                </div>
                <div className="col-md-11 col-xs-12">
                  <SpanFormControl title={`${employeedDetail?.person?.gender === 'F'? 'Femenino': 'Masculino'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
ComponentDatosPersonales.propTypes = {
  employeedDetail: PropTypes.object,
};