import React, { Fragment } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import TabPanel from '@mui/lab/TabPanel';
import { Badge, Title } from "src/components/atoms";
import ImgProfile from "src/components/organism/img-profile";

export default function DetailUser({
  employeedDetail = {}
}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let profileObject = {
    profilePicture: 'jair.jpg'
  };
  return (
    <Fragment>
      <div className="col-md-12 mb-4">
        <div className="row">
          <div className="col-md-2">
            <ImgProfile profile={employeedDetail.person} />
          </div>
          <div className="col-md-10 mt-3">
            <div className="row">
              <div className="col-md-12">
                <Title value={`${employeedDetail?.person?.names} ${employeedDetail?.person?.surnames}`} type={'h1'} />
              </div>
              <div className="col-md-12">
                <strong>Edad:</strong> {`${employeedDetail.person?.age}`} años
              </div>
              <div className="col-md-12">
                <strong>Correo: </strong>{`${employeedDetail.person?.personEmail?.emailDescription}`}
              </div>
              <div className="col-md-12">
                <strong>Última Conexión: </strong>Hace 3 horas.
              </div>
              <div className="col-md-12">
                <strong>Estado </strong>: <Badge value={1} text={`${employeedDetail.state}`} />
              </div>
              <div className="col-md-12">
                <strong>¿Tiene Deudas? </strong>: <Badge value={3} text="SI" />
              </div>
              <div className="col-md-12">
                <span>@{`${employeedDetail?.userName}`} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Datos Personales" value="1" />
              <Tab label="Historial Clinico" value="2" />
              <Tab label="Actividades" value="3" />
              <Tab label="Sesiones Programadas" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">Datos Personales</TabPanel>
          <TabPanel value="2">Historial Clínico</TabPanel>
          <TabPanel value="3">Actividades</TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  )
}
DetailUser.propTypes = {
  employeedDetail: PropTypes.object,
};