import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Label, Title } from "src/components/atoms";
import { useNavigate } from "react-router-dom";
import FormClinicalTreatment from "./form-clinical-treatment";
import FooterButton from "./footer-button";
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GRIS } from "src/config/config";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServicePostRegistrProgressSesion } from "src/service/patient/service.patient";
import { formatoNumero } from "src/utils/utils";
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import NameUser from "src/components/organism/name-user";

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

// const showComponentSelectTreeView = (nodeId) => {
//   switch (parseInt(nodeId)) {
//     case 1:
//       return (
//         <><RadioButtonCheckedIcon style={{ color: COLOR_BUTTON_MAB }} />&nbsp;
//           <Label title={'GRABACIÓN DE SESIÓN'} isBold />
//           <div className="row">
//             <div className="col-md-12">
//               <iframe width="100%" height="492" src="https://www.youtube.com/embed/0XG_0L9Rrc0" title="Ejercicios de Fisioterapia para hacer en casa. La automovilización" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            </div>
//           </div>
//         </>
//       )
//     case 2:
//       return (
//         <>
//           <Label title={'DOCUMENTOS ADJUNTOS'} isBold isColor />
//         </>
//       )
//     case 6:
//       return (
//         <>
//           <Label title={'DATOS DEL PACIENTE'} isBold isColor />
//         </>
//       )
//     default:
//       break;
//   }
// }

export default function Manager() {
  let navigate = useNavigate();
  const location = useLocation();
  const [objPatient, setObjPatient] = useState({});
  const [colorUmbral, setColorUmbral] = useState('');
  const [numeroUmbralDolor, setNumeroUmbralDolor] = useState(0);
  // const [nodeId, setNodeId] = useState(1);
  // const [listDocs, setListDocs] = useState([]);
  const [observaciones, setObservaciones] = useState('');
  const [recomendacion, setRecomendacion] = useState('');
  // const [file, setFile] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timeDemoration, setTimeDemoration] = useState('');
  const [missingAsignedEmployeed, setMissingAsignedEmployeed] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setObjPatient(location.state.objPatientDetail);
    setMissingAsignedEmployeed(location.state.objPatientDetail.employeed.employeedId === 0)
  }, [location.state.objPatientDetail]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    setTimeDemoration(
      formatoNumero(Math.floor(timer / 3600)) + ':' + formatoNumero(Math.floor((timer / 60) % 60)) + ':' + formatoNumero(timer % 60)
    )
  }, [timer])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const handleChange = (file) => {
  //   setFile(file);
  //   setListDocs(listDocs.concat(file));
  // };
  const handleBack = () => {
    navigate("/pacientes/tratamiento/proceso");
  }
  const handleCancelRegister = () => {
    navigate("/pacientes/tratamiento/proceso");
  }
  const handleChangeRecomendacion = (e) => {
    setRecomendacion(e.target.value)
  }
  const handleChangeDiagnostico = (e) => {
    setObservaciones(e.target.value);
  }
  const handleSaveSesion = async (e) => {
    if (parseInt(numeroUmbralDolor) === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de seleccionar un valor en la exploración física del paciente. (1: SIN DOLOR, 2: DOLOR MEDIO, 3: DOLOR INTENSO)',
      })
      return;
    }
    if (!observaciones) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar la observación.',
      })
      return;
    }
    if (!recomendacion) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar la recomendación del paciente.',
      })
      return;
    }

    let data = {
      progressDescription: observaciones,
      recommendation: recomendacion,
      patientProgressId: objPatient.patientProgressId,
      numeroUmbralDolor,
      time: timeDemoration
    };
    Swal.fire({
      title: '¿Desea guardar el registro de la sesión?',
      text: `Usted está guardando el registro clínico de la Sesión Nro ${objPatient.sessionNumber} del paciente ${objPatient?.patient?.person?.surnames}/${objPatient?.patient?.person?.names}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = await ServicePostRegistrProgressSesion(data);
        if (insert.ok) {
          Swal.fire(
            'Registro exitoso',
            `El registro de la sesión ha sido realizada con éxito`,
            'success'
          );
          setTimeout(() => {
            navigate("/pacientes/tratamiento/proceso");
          }, 1000);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Error al ingresar datos',
          })
        }
      }
    });
  }
  const handleChangeRangoUmbral = (e) => {
    let umbral = (e.target.value);
    setNumeroUmbralDolor(umbral);
    switch (umbral) {
      case 3:
        setColorUmbral(COLOR_BUTTON_MAB);
        break;
      case 2:
        setColorUmbral('darkorange');
        break;
      case 1:
        setColorUmbral(COLOR_BLUE_MAB);
        break;
      case 0:
        setColorUmbral(COLOR_GRIS);
        break;
      default:
        break;
    }
  }

  return (
    <div className="container-fluid">
      <Title value={`TRATAMIENTO DEL PACIENTE SESIÓN Nro ${objPatient.sessionNumber}`} type={'h1'} handleBack={handleBack} arrowBack />
      <div className="row">
        {
          missingAsignedEmployeed ?
            <Alert severity="warning">Falta asignar la persona que se encargará de esta sesión fisioterapeutica.</Alert>
            : ''
        }
        <div className="col-md-12">
          <DetailEmployeed
            employeed={objPatient.employeed}
            missingAsignedEmployeed={missingAsignedEmployeed}
          />
        </div>
        <div className="col-md-12">
          <DetailPatient patient={objPatient.patient} />
        </div>
        <div className="col-md-12">
          <Label isBold title={`TIEMPO TRANSCURRIDO DE ATENCIÓN: ${timeDemoration}`} isWarning />
        </div>
        <hr />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Evaluación" {...a11yProps(0)} icon={<MedicationLiquidIcon />} iconPosition="start" />
              {/* <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="col-md-12">
              <FormClinicalTreatment
                handleChangeDiagnostico={handleChangeDiagnostico}
                handleChangeRangoUmbral={handleChangeRangoUmbral}
                handleChangeRecomendacion={handleChangeRecomendacion}
                colorUmbral={colorUmbral}
              />
            </div>
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel> */}
        </Box>
        <div className="col-md-12">
          <FooterButton
            handleCancelRegister={handleCancelRegister}
            handleSaveSesion={handleSaveSesion}
            missingAsignedEmployeed={missingAsignedEmployeed}
          />
        </div>
      </div>
    </div>
  )
}

export const DetailEmployeed = ({
  employeed = {},
  missingAsignedEmployeed = false
}) => {
  return (
    <Fragment>
      {
        !missingAsignedEmployeed ?
          <div className="row">
            <div className="col-md-2">
              BIENVENIDO(A):
            </div>
            <div className="col-md-10">
              <NameUser profile={employeed} employeed />
            </div>
          </div> :
          <strong>
            Por favor, comuniquese con la persona que está a cargo de turno, para la configuración pertinente.
          </strong>
      }
    </Fragment>
  )
}
DetailEmployeed.propTypes = {
  employeed: PropTypes.object,
  missingAsignedEmployeed: PropTypes.bool
};
export const DetailPatient = ({
  patient = {}
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          PACIENTE:
        </div>
        <div className="col-md-10">
          <NameUser patient profile={patient} />
        </div>
      </div>
    </>
  )
}
DetailPatient.propTypes = {
  patient: PropTypes.object,
};