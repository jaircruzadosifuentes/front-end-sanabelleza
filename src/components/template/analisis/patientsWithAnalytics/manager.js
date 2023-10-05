import React, { useState } from "react";
import { useGetAllPatientsInTreatment } from "./hooks";
import List from "./list";
import { Title } from "src/components/atoms";
import Filter from "../../../organism/filter";
import { Modal } from "src/components/molecules";
import ListSchedulePay from '../../../organism/list-schedule-pay';
import { ServiceGetPayDueDetailForPatientId } from "src/service/pay/service.pay";
import AdvanceClinic from "./advance-clinic";
import { ServiceGetAdvanceCliniciForPatientId, ServiceGetAllPatientsInTreatment, ServiceGetByIdPatientProgress, ServicePutUpdateHourSesion } from "src/service/patient/service.patient";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import FormEditHour from "src/components/organism/form-edit-hour";
import { convertDateTimeToDate, getValueInBrackets } from "src/utils/utils";
import { useGetAllEmployeed } from "../../paciente/solicitud/hooks";

export default function Manager(props) {
  const [result, setResult] = useState([]);
  const [openModalPayItem, setOpenModalPayItem] = useState(false);
  const [openModalViewAdvance, setOpenModalViewAdvance] = useState(false);
  const { listPatInTreatment, setListPatInTreatment } = useGetAllPatientsInTreatment(props);
  const [lstPayDueDetail, setLstPayDeDetail] = useState([]);
  const [lstAdvanceClinic, setLstAdvanceClinic] = useState([]);
  const [openEditSesion, setOpenEditSesion] = useState(false);
  const [objSesion, setObjSesion] = useState({});
  const [hourAttention, setHourAttention] = useState('');
  const [employeedId, setEmployeedId] = useState(0);
  const { employeeds } = useGetAllEmployeed(props);

  let navigate = useNavigate();

  const handleViewShedulePay = async(e, row) => {
    let { patientId } = row;
    let lstPays = await ServiceGetPayDueDetailForPatientId(patientId);
    setLstPayDeDetail(lstPays);
    setOpenModalPayItem(true);
    console.log(setResult);
  }
  const handleCloseViewSchedulePay = () => {
    setOpenModalPayItem(false);
  }
  const handleViewAdvanceClinic = async(e, row) => {
    const { patientId } = row;
    let data = await ServiceGetAdvanceCliniciForPatientId(patientId);
    setLstAdvanceClinic(data);
    setOpenModalViewAdvance(true);
  }
  const handleCloseViewAdvanceClinic = (e) => {
    setOpenModalViewAdvance(false);
  }
  const handleStarEvaluation = async(e, row) => {
    //Traemos por ID del paciente, todos los datos necesarios.
    let { patientProgressId } = row;
    let objPatientDetail = await ServiceGetByIdPatientProgress(patientProgressId);
    let stateTimeStatus = (row.hourOffAttention) === '-' ? 0: 1;
    if(!stateTimeStatus) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar una hora de atención.',
      })
      return;
    }

    navigate("/tratamiento-clinico", { state: { objPatientDetail: objPatientDetail[0] } })
  }
  const handleEditSesion = (e, row) => {
    setOpenEditSesion(true);
    setObjSesion(row);
    setHourAttention(row?.hourOffAttention)
  } 
  const handleCloseEditSesion = (e) => {
    setOpenEditSesion(false);
  }
  const handleChangeHourAttention = (e) => {
    setHourAttention(e.target.value);
  }
  const handleSaveHour = async(e) => {
    let data = {
      hourOffAttention: hourAttention,
      patientProgressId: parseInt(objSesion.patientProgressId),
      employeed: {
        employeedId: parseInt(employeedId)
      }
    }
    if(!hourAttention) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Ingrese la hora de atención.`,
      })
      return;
    }
    Swal.fire({
      title: '¿Desea actualizar la sesión?',
      text: `Usted está actualizando la hora de la sesión`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = true;
        insert = await ServicePutUpdateHourSesion(data);
        if (insert.ok) {
          handleDefaultData();
          Swal.fire(
            'Actualización exitosa',
            'La sesión ha sido actualizada con éxito.',
            'success'
          );
          setOpenEditSesion(false);
        }
        else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `Error: ${insert.status}. Comuniquese con Sistemas.`,
          })
          return;
        }
      }
    })
  }
  const handleDefaultData = async() => {
    let data = await ServiceGetAllPatientsInTreatment();
    setListPatInTreatment(data);
  }
  const handleChangeEmployeed = (e, values) => {
    if (values === null) {
      return;
    }
    if (isNaN(values.label)) {
      setEmployeedId(getValueInBrackets(values.label));
    }
  }
  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = listPatInTreatment.filter((item) => {
      if (item?.person?.surnames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
   
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title
        type={'h1'}
        value={'PACIENTES EN TRATAMIENTO'}
      />
      <div className="row">
        <div className="col-md-4">
          <Filter
            handleSearchForSurNames={handleSearchForSurNames}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <List
            rows={result.length > 0 ? result : listPatInTreatment}
            handleViewShedulePay={handleViewShedulePay}
            handleViewAdvanceClinic={handleViewAdvanceClinic}
            handleStarEvaluation={handleStarEvaluation}
            handleEditSesion={handleEditSesion}
            // handleGenerateSessions={handleGenerateSessions}
          />
        </div>
      </div>
      {
        openModalPayItem && (
          <Modal
            title={`CRONOGRAMA DE PAGOS`}
            size={"modal-xl"}
            close
            openModal={openModalPayItem}
            onClose={handleCloseViewSchedulePay}
          >
            <ListSchedulePay
              rows={lstPayDueDetail}
            />
          </Modal>
        )
      }
      {
        openModalViewAdvance && (
          <Modal
            title={`VER AVANCE CLÍNICO`}
            size={"modal-lg"}
            close
            openModal={openModalViewAdvance}
            onClose={handleCloseViewAdvanceClinic}
          >
            <AdvanceClinic
              lstAdvanceClinic={lstAdvanceClinic}
            />
          </Modal>
        )
      }
      {
        openEditSesion && (
          <Modal
            title={`EDITAR HORA DE LA SESIÓN Nro ${objSesion.sessionNumber} del día ${convertDateTimeToDate(objSesion.dateOfAttention)}`}
            size={"modal-lg"}
            close
            openModal={openEditSesion}
            onClose={handleCloseEditSesion}
          >
            <FormEditHour
              handleCloseEditSesion={handleCloseEditSesion}
              handleChangeHourAttention={handleChangeHourAttention}
              handleSaveHour={handleSaveHour}
              handleChangeEmployeed={handleChangeEmployeed}
              employeeds={employeeds}
              objSesion={objSesion}
            />
          </Modal>
        )
      }
    </div>
  )
}