import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Label, Title } from "src/components/atoms";
import { useNavigate } from "react-router-dom";
import SidebarClinicalTreatmentTreeView from "./sidebar-clinical-treatment";
import FormClinicalTreatment from "./form-clinical-treatment";
import FooterButton from "./footer-button";
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GRIS } from "src/config/config";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ListIcon from '@mui/icons-material/List';
import { ServicePostRegistrProgressSesion } from "src/service/patient/service.patient";

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
  useEffect(() => {
    setObjPatient(location.state.objPatientDetail)
  }, [location.state.objPatientDetail]);

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
  const handleSaveSesion = async(e) => {
    if(parseInt(numeroUmbralDolor) === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de seleccionar un valor en la exploración física del paciente. (1: SIN DOLOR, 2: DOLOR MEDIO, 3: DOLOR INTENSO)',
      })
      return;
    }
    if(!observaciones) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar la observación.',
      })
      return;
    }
    if(!recomendacion) {
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
      numeroUmbralDolor
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
        if(insert.ok) {
          Swal.fire(
            'Registro exitoso',
            `El registro de la sesión ha sido realizada con éxito`,
            'success'
          );
          setTimeout(() => {
            navigate("/pacientes-con-analisis-clinico");
          }, 2000);
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
      case 5:
        setColorUmbral(COLOR_BUTTON_MAB)
        break;
      case 4:
        setColorUmbral(COLOR_BUTTON_MAB)
        break;
      case 3:
        setColorUmbral('darkorange');
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
      <Title value={`TRATAMIENTO DEL PACIENTE Nro ${objPatient.sessionNumber}`} type={'h1'} handleBack={handleBack} arrowBack />
      <div className="row">
        <div className="col-md-12">
        </div>
        <div className="col-md-12 mt-1">
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12 text-center">
                  <span>
                    {objPatient?.patient?.person?.surnames} / {objPatient?.patient?.person?.names}
                  </span>
                </div>
                <div className="col-md-12 text-center">
                  <img
                    alt={objPatient.surNames}
                    src={`images/avatars/${objPatient?.patient?.person?.profilePicture}`}
                    className="rounded float-righ"
                    height={'250px'}
                    width={'220px'}
                  />
                </div>
                <div className="col-md-12">
                  <span><ListIcon />&nbsp;Menú de Opciones</span>
                  <SidebarClinicalTreatmentTreeView
                    handleChangeTreViewSelect={handleChangeTreViewSelect}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {showComponentSelectTreeView(nodeId)}
            </div>
          </div>
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
          />
        </div>
      </div>
    </div>
  )
}
