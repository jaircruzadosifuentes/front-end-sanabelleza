import React, { useState } from "react";
import { Label, SmallAtoms } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, Modal, TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { COLOR_GREEN } from "src/config/config";
import { Slider, Tooltip } from "@mui/material";
import { IMCColor, IMCDescription, formatDecimales } from "src/utils/utils";
import SpanFormControl from "src/components/atoms/SpanFormControl";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];
export default function Diagnosis({
  handleChangeRangoUmbral,
  colorUmbral = '',
  handleChangeDescDiag,
  handleChangeDescMedic,
  //STEP 2
  handleOnChangeWeight,
  handleOnChangeStature,
  handleCalculateImc,
  objPhysicalExplo = {},
  handleOnChangeReasonConsult,
  handleOnChangePrevTreatments,
  handleOnChangeDiabetes,
  handleOnChangeAlergia,
  handleOnChangeHta,
  handleOnChangeCancer,
  handleOnChangeTransfusiones,
  handleOnChangeEnfReu,
  handleOnChangeEncames,
  handleOnChangeAccidente,
  handleOnChangeCardio,
  handleOnChangeCirugia,
  handleOnChangeFract,
  handleOnChangeContractMusc,
  handleChangeSigVital,
  handleOnChangeTabaq,
  handleOnChangeAlcoho,
  handleOnChangeDrog,
  handleOnChangeActFisic,
  handleOnChangeAutomedic,
  handleOnChangePasatiempo,
  handleChangeReflejos,
  handleChangeSensibilidad,
  handleChangeLengOrient,
  handleChangeOtros
}) {
  const [value, setValue] = React.useState(0);
  const [openModalViewImcTable, setOpenModalViewImcTable] = useState(false);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const handleClickViewImcTable = (e) => {
    setOpenModalViewImcTable(true);
  }
  const handleCloseViewImcTable = (e) => {
    setOpenModalViewImcTable(false);
  }
  return (
    <div className="mt-2">
      <div className="card-body">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Exploración física" {...a11yProps(0)} />
              <Tab label="Antedecentes patológicos" {...a11yProps(1)} />
              <Tab label="Hábitos de salud" {...a11yProps(1)} />
              <Tab label="Diágnóstico médico de rehabilitación" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Label title={'Exploración física'} isBold isTextAlign textAlign="left" />
            <div className="col-md-12 mb-2">
              <div className="row">
                <InputFormControl
                  type="number"
                  className="col-md-2"
                  isLabel
                  label={`Peso (Colocar en Kg)`}
                  onChange={handleOnChangeWeight}
                  defaultValue={objPhysicalExplo.weightStep2}
                />
                <InputFormControl
                  type="number"
                  className="col-md-2"
                  isLabel
                  label={`Talla (Colocar en cm)`}
                  onChange={handleOnChangeStature}
                  defaultValue={objPhysicalExplo.statureStep2}
                />
                <div className="col-md-2 mt-4">
                  <ButtonFormControl
                    title="Calcular IMC"
                    color='btn btn-success'
                    type={14}
                    onClick={handleCalculateImc}
                  />
                </div>
                {
                  objPhysicalExplo.imcStep2 > 0 ?
                    <div className="col-md-2">
                      <div className="row">
                        <div className="col-md-2">
                          <Label title={'IMC'} />
                        </div>
                        <div className="col-md-10 mt-1" onClick={handleClickViewImcTable}>
                          <Tooltip title='Ver tabla de indice de masa corporal'>
                            <ViewKanbanIcon
                              style={{ cursor: 'pointer' }}
                            />
                          </Tooltip>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-7">
                              <SpanFormControl
                                title={`Cuantitativo:`}
                              />
                            </div>
                            <div className="col-md-5">
                              <SpanFormControl
                                title={`${formatDecimales(objPhysicalExplo.imcStep2)}`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-7">
                              <SpanFormControl
                                title={`Cualitativo:`}
                              />
                            </div>
                            <div className="col-md-5">
                              <SpanFormControl
                                title={`${IMCDescription(objPhysicalExplo.imcStep2)}`}
                                color={`${IMCColor(objPhysicalExplo.imcStep2)}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> : ''
                }
              </div>
            </div>
            <Label title={'Motivo de consulta'} isBold isTextAlign textAlign="left" />
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <TextAreaFormControl
                    type="text"
                    className="col-md-12"
                    label="Motivo de consulta"
                    isLabel
                    rows={3}
                    onChange={handleOnChangeReasonConsult}
                    defaultValue={objPhysicalExplo.reasonConsultStep2}
                  />
                </div>
                <div className="col-md-6">
                  <TextAreaFormControl
                    type="text"
                    className="col-md-12"
                    label="Tratamientos previos"
                    isLabel
                    rows={3}
                    onChange={handleOnChangePrevTreatments}
                    defaultValue={objPhysicalExplo.prevTreatmentStep2}
                  />
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Label title={'Antecedentes Patológicos y Heredofamiliares'} isBold isTextAlign textAlign="left" />
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Diabetes: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeDiabetes}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveDiabe === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveDiabe === 'NO'}/>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Alergia: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeAlergia}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveAlergia === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveAlergia === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">HTA: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeHta}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveHta === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveHta === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Cáncer: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeCancer}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveCancer === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveCancer === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Transfusiones: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeTransfusiones}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveTransusion === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveTransusion === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div> */}
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Enf. Reumáticas: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeEnfReu}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveEnfReu === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveEnfReu === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Encames: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeEncames}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveEncames === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveEncames === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Accidentes: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeAccidente}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveAccidente === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveAccidente === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Cardiopatías: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeCardio}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveCardio === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveCardio === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Cirugías: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeCirugia}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveCirugia === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveCirugia === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Fracturas: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeFract}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveFract === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveFract === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-3">
                      <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: COLOR_GREEN }}>Signos vitales: </FormLabel>
                    </div>
                    <InputFormControl
                      type="text"
                      className="col-md-8"
                      marginTop="-1em"
                      onChange={handleChangeSigVital}
                      defaultValue={objPhysicalExplo.signVitalStep2}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Contractura Muscular: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeContractMusc}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.haveContractMusc === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.haveContractMusc === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Label title={'Hábitos de salud'} isBold isTextAlign textAlign="left" />
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Tabaquismo: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeTabaq}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.tabaquismoStep2 === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.tabaquismoStep2 === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Alcoholismo: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeAlcoho}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.alcohoStep2 === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.alcohoStep2 === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Drogas: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeDrog}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.drogasStep2 === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.drogasStep2 === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Actividad Física: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeActFisic}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.actFisicStep2 === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.actFisicStep2 === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Se automedica: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangeAutomedic}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.automedicStep2 === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.automedicStep2 === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mt-2">
                      <FormLabel id="demo-row-radio-buttons-group-label">Pasatiempo: </FormLabel>
                    </div>
                    <div className="col-md-8" >
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleOnChangePasatiempo}
                      >
                        <FormControlLabel value="SI" control={<Radio />} label="SI" checked={objPhysicalExplo.pasatiempoStep2 === 'SI'} />
                        <FormControlLabel value="NO" control={<Radio />} label="NO" checked={objPhysicalExplo.pasatiempoStep2 === 'NO'} />
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Label title={'Diagnóstico Médico de Rehabilitación'} isBold isTextAlign textAlign="left" />
            <div className="col-md-12 mb-3">
              <div className="row">
                <TextAreaFormControl
                  className="col-md-3"
                  label="Reflejos"
                  isLabel
                  rows={2}
                  onChange={handleChangeReflejos}
                  defaultValue={objPhysicalExplo.reflejosStep2}
                />
                <TextAreaFormControl
                  className="col-md-3"
                  label="Sensibilidad"
                  isLabel
                  rows={2}
                  onChange={handleChangeSensibilidad}
                  defaultValue={objPhysicalExplo.sensibiStep2}
                />
                <TextAreaFormControl
                  className="col-md-3"
                  label="Inflamación"
                  isLabel
                  rows={2}
                  onChange={handleChangeLengOrient}
                  defaultValue={objPhysicalExplo.lengOrienStep2}
                />
                <TextAreaFormControl
                  className="col-md-3"
                  label="Otros"
                  isLabel
                  rows={2}
                  onChange={handleChangeOtros}
                  defaultValue={objPhysicalExplo.otrosStep2}
                />
              </div>
            </div>
            <Label title={'Escala del dolor'} isBold isTextAlign textAlign="left" />
            <div className="col-md-12">
              <div className="row">
                <Box sx={{ width: '100%' }}>
                  <Slider
                    aria-label="Always visible"
                    step={1}
                    marks={marks}
                    onChange={handleChangeRangoUmbral}
                    style={{ color: objPhysicalExplo.colorUmbral }}
                    valueLabelDisplay="auto"
                    max={100 / 10}
                    defaultValue={objPhysicalExplo.numeroUmbralDolor}
                  />
                </Box>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
      {
        openModalViewImcTable && (
          <Modal
            size={"modal-lg"}
            close
            openModal={openModalViewImcTable}
            onClose={handleCloseViewImcTable}
          >
            <div className="text-center">
              <img
                src="https://www.clinicaciplex.com/wp-content/uploads/2020/07/blog_IMC.jpg"
                className="img-responsive"
              />
            </div>
          </Modal>
        )
      }
    </div>
  )
}
Diagnosis.propTypes = {
  handleChangeDescMedic: PropTypes.func,
  handleChangeDescDiag: PropTypes.func,
  handleChangeExploracionFisica: PropTypes.func,
  handleChangeTieneAlergiaMedic: PropTypes.func,
  handleChangeRangoUmbral: PropTypes.func,
  handleCalculateImc: PropTypes.func,
  handleOnChangeWeight: PropTypes.func,
  handleOnChangeStature: PropTypes.func,
  openSwitchTieneAlergiaMedic: PropTypes.bool,
  colorUmbral: PropTypes.string,
  //STEP 2
  objPhysicalExplo: PropTypes.object,
  handleOnChangeReasonConsult: PropTypes.func,
  handleOnChangePrevTreatments: PropTypes.func,
  handleOnChangeDiabetes: PropTypes.func,
  handleOnChangeAlergia: PropTypes.func,
  handleOnChangeHta: PropTypes.func,
  handleOnChangeCancer: PropTypes.func,
  handleOnChangeTransfusiones: PropTypes.func,
  handleOnChangeEnfReu: PropTypes.func,
  handleOnChangeEncames: PropTypes.func,
  handleOnChangeAccidente: PropTypes.func,
  handleOnChangeCardio: PropTypes.func,
  handleOnChangeCirugia: PropTypes.func,
  handleOnChangeFract: PropTypes.func,
  handleOnChangeContractMusc: PropTypes.func,
  handleChangeSigVital: PropTypes.func,
  handleOnChangeTabaq: PropTypes.func,
  handleOnChangeAlcoho: PropTypes.func,
  handleOnChangeDrog: PropTypes.func,
  handleOnChangeActFisic: PropTypes.func,
  handleOnChangeAutomedic: PropTypes.func,
  handleOnChangePasatiempo: PropTypes.func,
  handleChangeReflejos: PropTypes.func,
  handleChangeSensibilidad: PropTypes.func,
  handleChangeLengOrient: PropTypes.func,
  handleChangeOtros: PropTypes.func,
};