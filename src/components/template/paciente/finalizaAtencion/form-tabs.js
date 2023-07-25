import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormDetailPatient from './form-detail-patient';
import FormDetailPacket from './form-detail-packet';
import FormPay from './form-pay';

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

export default function FormTabs({
  objPatient = {},
  packetsOrUnitSession = [],
  idSelectPacket = 0,
  idFrecuencia = 0,
  total = 0.00,
  igv = 0.00,
  subTotal = 0.00,
  handleChangeCuotas,
  handleCloseModalEndClinicPatient,
  numberDues = 0,
  payMethods = [],
  handleChangePayMethod,
  showControlRefPay = false,
  descriptionLabelSelectPayMethod = '',
  handleCloseModalEndCare,
  handleProcesarCronograma,
  stateButtonProcessSchedule = false,
  handleChangeInitialDate,
  stateGenerateSchedule = false,
  handleClickViewSchedulePay,
  handleHandlePaySave,
  handleDescriptionRefPayMethod,
  handleChangeHourInitial,
  initialDate
}) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="(1) - Datos del paciente" {...a11yProps(0)} />
          <Tab label="(2) - Datos del paquete y frecuencia" {...a11yProps(1)} />
          <Tab label="(3) - Pagar y programar horarios" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FormDetailPatient 
          objPatient={objPatient}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormDetailPacket 
          packetsOrUnitSession={packetsOrUnitSession}
          idSelectPacket={idSelectPacket}
          idFrecuencia={idFrecuencia}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FormPay 
          objPatient={objPatient}
          total={total}
          igv={igv}
          subTotal={subTotal}
          handleChangeCuotas={handleChangeCuotas}
          handleCloseModalEndClinicPatient={handleCloseModalEndClinicPatient}
          numberDues={numberDues}
          payMethods={payMethods}
          handleChangePayMethod={handleChangePayMethod}
          showControlRefPay={showControlRefPay}
          descriptionLabelSelectPayMethod={descriptionLabelSelectPayMethod}
          handleCloseModalEndCare={handleCloseModalEndCare}
          handleProcesarCronograma={handleProcesarCronograma}
          stateButtonProcessSchedule={stateButtonProcessSchedule}
          handleChangeInitialDate={handleChangeInitialDate}
          stateGenerateSchedule={stateGenerateSchedule}
          handleClickViewSchedulePay={handleClickViewSchedulePay}
          handleHandlePaySave={handleHandlePaySave}
          handleDescriptionRefPayMethod={handleDescriptionRefPayMethod}
          handleChangeHourInitial={handleChangeHourInitial}
          initialDate={initialDate}
        />
      </TabPanel>
    </Box>
  );
}
FormTabs.propTypes = {
  descriptionLabelSelectPayMethod: PropTypes.string,
  showControlRefPay: PropTypes.bool,
  stateGenerateSchedule: PropTypes.bool,
  stateButtonProcessSchedule: PropTypes.bool,
  handleChangeHourInitial: PropTypes.func,
  handleChangePayMethod: PropTypes.func,
  handleDescriptionRefPayMethod: PropTypes.func,
  handleHandlePaySave: PropTypes.func,
  handleClickViewSchedulePay: PropTypes.func,
  handleChangeInitialDate: PropTypes.func,
  handleProcesarCronograma: PropTypes.func,
  handleCloseModalEndCare: PropTypes.func,
  handleCloseModalEndClinicPatient: PropTypes.func,
  handleChangeCuotas: PropTypes.func,
  subTotal: PropTypes.any,
  igv: PropTypes.any,
  objPatient: PropTypes.object,
  packetsOrUnitSession: PropTypes.array,
  payMethods: PropTypes.array,
  idFrecuencia: PropTypes.number,
  idSelectPacket: PropTypes.number,
  numberDues: PropTypes.number,
  total: PropTypes.any,
  initialDate: PropTypes.any,
};
