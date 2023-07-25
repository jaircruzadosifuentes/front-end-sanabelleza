import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Label, Title } from "src/components/atoms";
import { useNavigate } from "react-router-dom";
import SidebarClinicalTreatmentTreeView from "./sidebar-clinical-treatment";
import FormClinicalTreatment from "./form-clinical-treatment";
import FooterButton from "./footer-button";
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GRIS } from "src/config/config";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { ServicePostRegistrProgressSesion } from "src/service/patient/service.patient";
import { formatoNumero } from "src/utils/utils";
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

const showComponentSelectTreeView = (nodeId) => {
  switch (parseInt(nodeId)) {
    case 1:
      return (
        <><RadioButtonCheckedIcon style={{ color: COLOR_BUTTON_MAB }} />&nbsp;
          <Label title={'GRABACIÓN DE SESIÓN'} isBold />
          <div className="row">
            <div className="col-md-12">
              <iframe width="100%" height="492" src="https://www.youtube.com/embed/0XG_0L9Rrc0" title="Ejercicios de Fisioterapia para hacer en casa. La automovilización" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>            </div>
          </div>
        </>
      )
    case 2:
      return (
        <>
          <Label title={'DOCUMENTOS ADJUNTOS'} isBold isColor />
        </>
      )
    case 6:
      return (
        <>
          <Label title={'DATOS DEL PACIENTE'} isBold isColor />
        </>
      )
    default:
      break;
  }
}

export default function Manager() {
  let navigate = useNavigate();
  const location = useLocation();
  const [objPatient, setObjPatient] = useState({});
  const [colorUmbral, setColorUmbral] = useState('');
  const [numeroUmbralDolor, setNumeroUmbralDolor] = useState(0);
  const [nodeId, setNodeId] = useState(1);

  const [listDocs, setListDocs] = useState([]);
  const [observaciones, setObservaciones] = useState('');
  const [recomendacion, setRecomendacion] = useState('');
  const [file, setFile] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timeDemoration, setTimeDemoration] = useState('');
  const [missingAsignedEmployeed, setMissingAsignedEmployeed] = useState(false);

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

  const handleChange = (file) => {
    setFile(file);
    setListDocs(listDocs.concat(file));
  };
  const handleBack = () => {
    navigate("/pacientes-con-analisis-clinico");
  }
  const handleCancelRegister = () => {
    navigate("/pacientes-con-analisis-clinico");
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
            navigate("/pacientes-con-analisis-clinico");
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
  const handleChangeTreViewSelect = (e, nodeId) => {
    setNodeId(nodeId);
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
          <Label title={`Tiempo transcurrido de atención: ${timeDemoration}`} />
        </div>
        <hr />
        <div className="col-md-12">
          <FormClinicalTreatment
            handleChangeDiagnostico={handleChangeDiagnostico}
            handleChangeRangoUmbral={handleChangeRangoUmbral}
            handleChangeRecomendacion={handleChangeRecomendacion}
            colorUmbral={colorUmbral}
          />
        </div>
        {/* <div className="col-md-12">
          <LoadDocs 
            handleChange={handleChange}
            file={file}
            listDocs={listDocs}
          />
        </div> */}
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
  let role = employeed?.role?.name
  return (
    <Fragment>
      {
        !missingAsignedEmployeed ?
        <>
          Bienvenido(a): {role}. {employeed?.person?.surnames} / {employeed?.person?.names}
        </>:
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
      Paciente: {patient?.person?.surnames} / {patient?.person?.names}
    </>
  )
}
DetailPatient.propTypes = {
  patient: PropTypes.object,
};