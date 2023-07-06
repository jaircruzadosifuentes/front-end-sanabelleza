import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailPatient from "./detailPatient";
import { getTitle } from "src/utils/utils";
import { Title } from "src/components/atoms";
import Evaluation from "./evaluation";
import Diagnosis from "./diagnosis";
import FooterButton from "./footerButton";
import RegisterPackets from "./registerPackets";
import { useGetAllPacketsOrUnitSessions } from "../../mnt-paquetes/hooks";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GRIS } from "src/config/config";
import { ServicePostRegisterFirstClinicalAnalysis } from "src/service/solicitudAttention/service.solicitudAttention";

export default function Manager(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const { packetsOrUnitSession } = useGetAllPacketsOrUnitSessions(props);

  const [objPatient, setObjPatient] = useState({});
  const [openSwitchTieneOper, setOpenSwitchTieneOper] = useState(false);
  const [openSwitchTieneEnf, setOpenSwitchTieneEnf] = useState(false);
  const [openSwitchTieneAlergiaMedic, setOpenSwitchTieneAlergiaMedic] = useState(false);
  const [idSelectPacket, setIdSelectPacket] = useState(0);
  const [colorUmbral, setColorUmbral] = useState(COLOR_GRIS)
  const [idFrecuencia, setIdFrecuencia] = useState(0);
  //REGISTRO DEL ANÁLISIS CLÍNICO
  const [weight, setWeight] = useState(0.00);
  const [descriptionEnf, setDescriptionEnf] = useState('');
  const [descriptionOperation, setDescriptionOperation] = useState('');
  const [descExploraFisica, setDescExploraFisica] = useState('');
  const [numeroUmbralDolor, setNumeroUmbralDolor] = useState(0);
  const [descriptionDiag, setDescriptionDiag] = useState('');
  const [descriptionMedic, setDescriptionMedic] = useState('');
  const [informationAdic, setInformationAdic] = useState('');
  //FIN DEL REGISTRO DEL ANÁLISIS CLÍNICO
  useEffect(() => {
    setObjPatient(location.state.row)
  }, [location.state.row]);
  getTitle('Primer Análisis - ' + objPatient.surNames);
  //Funciones
  const handleBack = (e) => {
    navigate("/primer-analisis");
  }
  const handleChangeTieneEnfermedad = (e) => {
    setOpenSwitchTieneEnf(!openSwitchTieneEnf);
  }
  const handleChangeOper = (e) => {
    setOpenSwitchTieneOper(!openSwitchTieneOper);
  }
  const handleChangeTieneAlergiaMedic = (e) => {
    setOpenSwitchTieneAlergiaMedic(!openSwitchTieneAlergiaMedic)
  }
  const handleClickItemPackets = (e, id) => {
    setIdSelectPacket(id);
  }
  const handleClickItemPeriodo = (e, id) => {
    setIdFrecuencia(id);
  }
  const handleCancelRegister = (e) => {
    Swal.fire({
      title: '¿Desea cancelar el registro del análisis clínico?',
      text: `Usted está cancelando el registro clínico del paciente ${objPatient.surNames}/${objPatient.names}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/primer-analisis");
      }
    });
  }
  const handleSaveAnalysis = (e) => {
    if(openSwitchTieneEnf && !descriptionEnf) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar la(s) enfermedad(es) que el paciente tenga.',
      })
      return;
    }
    if(openSwitchTieneOper && !descriptionOperation) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar la(s) operacion(es) que el paciente tenga.',
      })
      return;
    }
    if(!descExploraFisica) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar la descripción de exploración física del paciente.',
      })
      return;
    }
    if(parseInt(numeroUmbralDolor) === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de seleccionar el umbral del dolor del paciente.',
      })
      return;
    }
    if(openSwitchTieneAlergiaMedic && !descriptionMedic) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar las medicinas que toma usted.',
      })
      return;
    }
    if(parseInt(idSelectPacket) === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de seleccionar el tipo de paquete.',
      })
      return;
    }
    if(parseInt(idFrecuencia) === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de seleccionar el tipo de frecuencia.',
      })
      return;
    }
    let data = {
      patientNewId: objPatient.patientNewId,
      weight: parseFloat(weight),
      disease: descriptionEnf,
      descOperation: descriptionOperation,
      physicalExploration: descExploraFisica,
      shadowPain: numeroUmbralDolor,
      diagnosis: descriptionDiag,
      descMedicine: descriptionMedic,
      additionalInformation: informationAdic,
      takeMedicine: openSwitchTieneAlergiaMedic,
      hasDisease: openSwitchTieneEnf,
      hasOperation: openSwitchTieneOper,
      frecuencyId: idFrecuencia,
      packetsOrUnitSessions: {
        packetsOrUnitSessionsId: idSelectPacket
      } 
    }
    Swal.fire({
      title: '¿Desea guardar el registro del análisis clínico?',
      text: `Usted está guardando el registro clínico del paciente ${objPatient.surNames}/${objPatient.names}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = await ServicePostRegisterFirstClinicalAnalysis(data);
        if(insert.ok) {
          Swal.fire(
            'Registro exitoso',
            `El registro para el paciente ${objPatient.surNames}/${objPatient.names}, ha sido registrado de manera exitosa. Indicar al paciente pasar con la Asistente de Fisioterapia, para la programación y cancelación de sus sesiones.`,
            'success'
          );
          setTimeout(() => {
            navigate("/primer-analisis");
          }, 3000);
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
  //REGISTRO DEL ANÁLISIS CLÍNICO
  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  }
  const handleChangeEnfermedad = (e) => {
    setDescriptionEnf(e.target.value);
  }
  const handleChangeOperation = (e) => {
    setDescriptionOperation(e.target.value);
  }
  const handleChangeExploracionFisica = (e) => {
    setDescExploraFisica(e.target.value);
  }
  const handleChangeDescDiag = (e) => {
    setDescriptionDiag(e.target.value);
  }
  const handleChangeDescMedic = (e) => {
    setDescriptionMedic(e.target.value);
  }
  const handleChangeInformationAdi = (e) => {
    setInformationAdic(e.target.value);
  }
  //FIN DEL REGISTRO DEL ANÁLISIS CLÍNICO
  //Fin de Funciones
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title value={'REGISTRO DE ANÁLISIS CLÍNICO'} type={'h1'} arrowBack handleBack={handleBack}/>
      <DetailPatient
        objPatient={objPatient}
      />
      <Evaluation 
        handleChangeTieneEnfermedad={handleChangeTieneEnfermedad}
        openSwitchTieneEnf={openSwitchTieneEnf}
        handleChangeOper={handleChangeOper}
        openSwitchTieneOper={openSwitchTieneOper}

        handleChangeWeight={handleChangeWeight}
        handleChangeEnfermedad={handleChangeEnfermedad}
        handleChangeOperation={handleChangeOperation}
      />
      <Diagnosis
        handleChangeTieneAlergiaMedic={handleChangeTieneAlergiaMedic}
        openSwitchTieneAlergiaMedic={openSwitchTieneAlergiaMedic}
        handleChangeRangoUmbral={handleChangeRangoUmbral}
        colorUmbral={colorUmbral}

        handleChangeExploracionFisica={handleChangeExploracionFisica}
        handleChangeDescDiag={handleChangeDescDiag}
        handleChangeDescMedic={handleChangeDescMedic}
      />
      <RegisterPackets 
        packetsOrUnitSession={packetsOrUnitSession}
        handleClickItemPackets={handleClickItemPackets}
        idSelectPacket={idSelectPacket}
        handleClickItemPeriodo={handleClickItemPeriodo}
        idFrecuencia={idFrecuencia}
      />
      <FooterButton 
        handleCancelRegister={handleCancelRegister}
        handleSaveAnalysis={handleSaveAnalysis}

        handleChangeInformationAdi={handleChangeInformationAdi}
      />
    </div>
  )
}