import React from "react";
import { Label } from "src/components/atoms";
import { InputFormControl, TextAreaFormControl } from "src/components/molecules";
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
import { Slider } from "@mui/material";

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

export default function PostureEvaluationComponent(props) {

  const {
    handleOnChangePruArcHombroFlex1,
    objArchesMobilityTest = {},
    handleOnChangePruArcHombroExten1,
    handleOnChangePruArcHombroABD1,
    handleOnChangePruArcHombroADD1,
    handleOnChangePruArcHombroFlex2,
    handleOnChangePruArcHombroExt2,
    handleOnChangePruArcHombroABD2,
    handleOnChangePruArcHombroADD2,
    handleOnChangePruArcHombroFlex3,
    handleOnChangePruArcHombroExten3
  } = props;
  
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mt-2">
      <div className="card-body">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Prueba de Arcos de Movilidad para miembros Superiores" {...a11yProps(0)} />
              <Tab label="Prueba de Arcos de Movilidad para miembros Inferiores" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="row">
              <div className="col-md-3">
                <img src="../../images/avatars/rotacion_1_izq.png"
                  className="rounded float-left img-responsive"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-6 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">HOMBRO IZQUIERDO</th>
                      <th colSpan="4">HOMBRO DERECHO</th>
                    </tr>
                    <tr className="text-center">
                      <th width='10%'>Flexión °</th>
                      <th width='10%'>Extensión °</th>
                      <th width='10%'>ABD °</th>
                      <th width='10%'>ADD °</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            id="idPruArcHombroFlex1"
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroFlex1}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcFlex1}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            id='idPruArcHombroExten1'
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroExten1}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcExten1}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            id="idPruArcHombroABD1"
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroABD1}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcABD1}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            id='idPruArcHombroADD1'
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroADD1}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcADD1}
                            align="center"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl 
                            id='idPruArcHombroFlex2'
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroFlex2}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcFlex2}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            id='idPruArcHombroExt2'
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroExt2}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcExten2}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            id="idPruArcHombroABD2"
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroABD2}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcABD2}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            id='idPruArcHombroADD2'
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroADD2}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcADD2}
                            align="center"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            id="idPruArcHombroFlex3"
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroFlex3}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcFlex3}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            id="idPruArcHombroExten3"
                            type="text"
                            autoFocus
                            className="col-md-10"
                            onChange={handleOnChangePruArcHombroExten3}
                            defaultValue={objArchesMobilityTest.valorHombroPruArcExten3}
                            align="center"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3">
                <img src="../../images/avatars/rotacion_1_der.png"
                  className="rounded float-left img-responsive"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_2_izq.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-6 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">ROTACIÓN</th>
                      <th colSpan="4">CODO</th>
                    </tr>
                    <tr className="text-center">
                      <th width='10%'>Externa</th>
                      <th width='10%'>Interna</th>
                      <th width='10%'>Flexión</th>
                      <th width='10%'>Ext.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_2_der.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_3_izq.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-6 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">ANTEBRAZO</th>
                      <th colSpan="4">DESVIACIÓN</th>
                    </tr>
                    <tr className="text-center">
                      <th width='10%'>Externa</th>
                      <th width='10%'>Interna</th>
                      <th width='10%'>Flexión</th>
                      <th width='10%'>Ext.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_3_der.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_4_izq.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-9 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">REFLEXIÓN</th>
                      <th>DEDOS</th>
                      <th>MCF</th>
                      <th>IFP</th>
                      <th>IFD</th>
                      <th>ABD</th>
                    </tr>
                    <tr>
                      <th width='10%' className="text-center">Palmar</th>
                      <th width='10%' className="text-center">Dorsal</th>
                      <th width='10%' className="text-center">Índice</th>
                      <th width='10%'>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </th>
                      <th width='10%'>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </th>
                      <th width='10%'>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </th>
                      <th width='10%'>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>Medio</td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td style={{ backgroundColor: 'black' }}></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>Anular</td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>Meñique</td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>Pulgar</td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td style={{ backgroundColor: 'black' }}>-</td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="row">
              <div className="col-md-3 mt-2">
                <img src="../../images/avatars/rotacion_5_izq.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-6 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">FLEXIÓN CADERA c/rod. Ext.</th>
                      <th colSpan="4">EXTENSIÓN DE CADERA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td> <div className="row">
                        <div className="col-md-2 mt-1">
                          -
                        </div>
                        <InputFormControl
                          type="text"
                          autoFocus
                          className="col-md-10"
                        />
                      </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3 mt-2">
                <img src="../../images/avatars/rotacion_5_der.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_6_izq.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-6 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">FLEXIÓN CADERA c/rod. Ext.</th>
                      <th colSpan="4">RODILLA</th>
                    </tr>
                    <tr className="text-center">
                      <th width='10%'></th>
                      <th width='10%'></th>
                      <th width='10%'>Flexión</th>
                      <th width='10%'>Ext.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_6_der.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_8_izq.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
              <div className="col-md-6 mt-4">
                <table className="table table-bordered table-sm mt-4">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="2">ROTACIÓN</th>
                      <th colSpan="4">TOBILLO</th>
                    </tr>
                    <tr className="text-center">
                      <th width='10%'>EXT</th>
                      <th width='10%'>INT</th>
                      <th width='10%'>INV</th>
                      <th width='10%'>EVE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            1.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            2.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            3.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            4.-
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2 mt-1">
                            -
                          </div>
                          <InputFormControl
                            type="text"
                            autoFocus
                            className="col-md-10"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-3 mt-4">
                <img src="../../images/avatars/rotacion_8_der.png"
                  className="rounded float-left img-responsive mt-4"
                  style={{ maxWidth: '100%' }}
                  alt="cuerpo humano"
                />
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  )
}
PostureEvaluationComponent.propTypes = {
  handleOnChangePruArcHombroFlex1: PropTypes.func,
  objArchesMobilityTest: PropTypes.object,
  handleOnChangePruArcHombroExten1: PropTypes.func,
  handleOnChangePruArcHombroABD1: PropTypes.func,
  handleOnChangePruArcHombroADD1: PropTypes.func,
  handleOnChangePruArcHombroFlex2: PropTypes.func,
  handleOnChangePruArcHombroExt2: PropTypes.func,
  handleOnChangePruArcHombroABD2: PropTypes.func,
  handleOnChangePruArcHombroADD2: PropTypes.func,
  handleOnChangePruArcHombroFlex3: PropTypes.func,
  handleOnChangePruArcHombroExten3: PropTypes.func,
};