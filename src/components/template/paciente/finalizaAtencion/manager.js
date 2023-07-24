import React, { useState } from "react";
import { Title } from "src/components/atoms";
import Filter from "./filter";
import { useGetPacientesConPrimeraAtencionClinica, useGetAllPayMethods } from "./hooks";
import List from "./list";
import { Modal } from "src/components/molecules";
import FormTabs from "./form-tabs";
import { useGetAllPacketsOrUnitSessions } from "../../mnt-paquetes/hooks";
import { formatDecimales } from "src/utils/utils";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServiceGetAllSchedulePatient, ServicePostGenerateSchedule } from "src/service/schedule/service.schedule";
import ListScheduleForPatient from './list-schedule-patient';
import { ServiceGetPacientesConPrimeraAtencionClinica } from "./services";
import { ServicePostInsertPaySolicitud } from "src/service/pay/service.pay";

export default function Manager(props) {
  const { listPatients, setListPatients } = useGetPacientesConPrimeraAtencionClinica(props);
  const { packetsOrUnitSession } = useGetAllPacketsOrUnitSessions(props);
  const { payMethods } = useGetAllPayMethods(props);

  const [result, setResult] = useState([]);
  const [objPatient, setObjPatient] = useState({});
  const [openModalEndClinic, setOpenModalEndClinic] = useState(false);
  const [numberDues, setNumberDues] = useState(0);
  const [total, setTotal] = useState(0.00);
  const [igv, setIgv] = useState(0.00);
  const [subTotal, setSubTotal] = useState(0.00);
  const [showControlRefPay, setShowControlRefPay] = useState(false);
  const [descriptionLabelSelectPayMethod, setDescriptionLabelSelectPayMethod] = useState('');
  const [initialDate, setInitialDate] = useState();
  const [stateGenerateSchedule, setStateGenerateSchedule] = useState(false);
  const [listSchedulesPatient, setListSchedulesPatient] = useState([]);
  const [openModalSchedule, setOpenModalSchedule] = useState(false);
  const [hourInitial, setHourInitial] = useState('');
  // const [descPayMethod, setDescPayMethod] = useState('');
  // const [payMethodId, setPayMethodId] = useState(0);

  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = listPatients.filter((item) => {
      if (item.surNames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleEndAnalyzing = async (e, row) => {
    e.preventDefault();
    setObjPatient(row);
    setOpenModalEndClinic(true);
    let cost = row?.clinicalHistory.packetsOrUnitSessions.costPerUnit;
    let unit = row?.clinicalHistory.packetsOrUnitSessions.numberSessions;
    let dues = row?.clinicalHistory.packetsOrUnitSessions.maximumFeesToPay;
    setTotal(formatDecimales((cost * unit) / dues));
    setIgv(formatDecimales(((cost * unit) * 0.18) / dues));
    setSubTotal(formatDecimales(((cost * unit) - (cost * unit) * 0.18) / dues));
    setNumberDues(row.clinicalHistory?.packetsOrUnitSessions.maximumFeesToPay);
    setStateGenerateSchedule(row.scheduleGenerate);
  }
  function showMountSubTotal() {
    return (formatDecimales(showMountTotal() - showMountIgv()));
  }
  function showMountIgv() {
    return (formatDecimales(showMountTotal() * 0.18));
  }
  function showMountTotal() {
    let cost = objPatient?.clinicalHistory.packetsOrUnitSessions.costPerUnit;
    let unit = parseInt(objPatient?.clinicalHistory.packetsOrUnitSessions.numberSessions);
    return (formatDecimales(cost * unit));
  }
  const handleChangeCuotas = (e) => {
    let cuotas = parseInt(e.target.value);
    setNumberDues(cuotas);
    let maximumFeesToPay = objPatient?.clinicalHistory.packetsOrUnitSessions.maximumFeesToPay;

    if (cuotas > maximumFeesToPay) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `El máximo de cuotas en que el paciente puede pagar es de ${maximumFeesToPay} cuotas.`,
      });
      e.target.value = 1;
      setTotal(showMountTotal());
      setIgv(showMountIgv());
      setSubTotal(showMountSubTotal());
      return;
    }

    if (cuotas > 0) {
      setTotal(formatDecimales(total / cuotas));
      setIgv(formatDecimales(igv / cuotas));
      setSubTotal(formatDecimales(subTotal / cuotas));
    }
    else {
      setTotal(showMountTotal());
      setIgv(showMountIgv());
      setSubTotal(showMountSubTotal());
    }
  }
  const handleCloseModalEndClinicPatient = (e) => {
    setOpenModalEndClinic(false);
  }
  const handleChangePayMethod = (e) => {
    let description = '';
    description = e?.description;
    //setPayMethodId(e?.value);
    setShowControlRefPay(description?.length > 0);
    setDescriptionLabelSelectPayMethod(e?.description);
  }
  const handleCloseModalEndCare = (e) => {
    Swal.fire({
      title: '¿Desea cancelar el registro?',
      text: `Usted está cancelando la finalización del registro clínico del paciente ${objPatient?.person.surnames}/${objPatient?.person.names}. Tener en cuenta que toda la información digitada, se perderá.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cancelación exitosa',
          `La cancelación ha sido finalizada correctamente.`,
          'success'
        );
        setOpenModalEndClinic(false);
        handleDefaultControl();
      }
    });
  }
  const handleProcesarCronograma = async (e) => {
    let patientId = parseInt(objPatient.patientId);
    if (stateGenerateSchedule) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `El cronograma para el paciente ${objPatient.person.surnames}/${objPatient.person.names} ya ha sido generado.`,
      });
      return;
    }
    if (!numberDues || numberDues === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar el numero de cuotas..`,
      });
      return;
    }
    if (!initialDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar la fecha inicio del tratamiento.`,
      });
      return;
    }
    let data = {
      patient: {
        patientId: patientId,
      },
      dues: numberDues,
      initialDate: initialDate
    };
    Swal.fire({
      title: '¿Desea generar el cronograma del paciente?',
      text: `Usted está generando el cronograma del paciente ${objPatient.person.surnames}/${objPatient.person.names}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, generar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let generate = await ServicePostGenerateSchedule(data);
        if (generate.ok) {
          setStateGenerateSchedule(true);
          Swal.fire(
            'Generación exitosa',
            `La generación del cronograma ha sido realizada con éxito`,
            'success'
          );
          let list = await ServiceGetPacientesConPrimeraAtencionClinica();
          setListPatients(list)
          let listSchedules = await ServiceGetAllSchedulePatient(patientId);
          setListSchedulesPatient(listSchedules);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `Error al generar cronograma.`,
          });
        }
      }
    });
  }
  const handleDefaultControl = () => {
    setShowControlRefPay(false);
    setDescriptionLabelSelectPayMethod('');
    setObjPatient({});
  }
  const handleChangeInitialDate = (e) => {
    setInitialDate(e.target.value);
  }
  const handleClickViewSchedulePay = async (e) => {
    setOpenModalSchedule(true);
    let patientId = parseInt(objPatient.patientId);
    let listSchedules = await ServiceGetAllSchedulePatient(patientId);
    setListSchedulesPatient(listSchedules);
  }
  const handleCloseModalSchedule = (e) => {
    setOpenModalSchedule(false);
  }
  const handleDescriptionRefPayMethod = (e) => {
    //setDescPayMethod(e.target.value);
  }
  const handleHandlePaySave = async(e) => {
    e.preventDefault();

    let patientId = parseInt(objPatient.patientId);
    if (!numberDues || numberDues === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar el numero de cuotas.`,
      });
      return;
    }
    if(!hourInitial) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Ingrese la hora inicio de su primer tratamiento.`,
      });
      return; 
    }
    let data = {
      patient: {
        patientId: patientId
      },
      hourInitial,
      dateInitial: objPatient.pay.dateInitial
    };
    Swal.fire({
      title: `¿Desea finalizar la solicitud de atención del paciente?`,
      text: `Usted está finalizando la solicitud del paciente ${objPatient.person.surnames}/${objPatient.person.names}. Iniciará su tratamiento, en base a la fecha y hora inicial programada.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, finalizar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let pay = await ServicePostInsertPaySolicitud(data);
        if (pay.ok) {
          Swal.fire(
            'Finalización del proceso de solicitud exitoso',
            `El proceso se ha realizado con éxito`,
            'success'
          );
          let list = await ServiceGetPacientesConPrimeraAtencionClinica();
          setListPatients(list)
          setOpenModalEndClinic(false);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `Error al pagar.`,
          });
        }
      }
    });
  }
  const handleChangeHourInitial = (e) => {
    setHourInitial(e.target.value);
  }
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title
        type={'h1'}
        value={'FINALIZA SOLICITUD - REGISTRO DEL PACIENTE'}
      />
      <Filter
        handleSearchForSurNames={handleSearchForSurNames}
      />
      <List
        rows={result.length > 0 ? result : listPatients}
        handleEndAnalyzing={handleEndAnalyzing}
      />
      {/* Modales */}
      {
        openModalEndClinic && (
          <Modal
            title={`FINALIZAR LA SOLICITUD DEL PACIENTE - ${objPatient?.person.surnames}/${objPatient?.person.names}`}
            size={"modal-xl"}
            close
            openModal={openModalEndClinic}
            onClose={handleCloseModalEndCare}
          >
            <FormTabs
              objPatient={objPatient}
              packetsOrUnitSession={packetsOrUnitSession}
              idSelectPacket={objPatient?.clinicalHistory?.packetsOrUnitSessions?.packetsOrUnitSessionsId}
              idFrecuencia={objPatient?.clinicalHistory?.frecuencyId}
              total={total}
              igv={igv}
              subTotal={subTotal}
              numberDues={numberDues}
              handleChangeCuotas={handleChangeCuotas}
              handleCloseModalEndClinicPatient={handleCloseModalEndClinicPatient}
              payMethods={payMethods}
              handleChangePayMethod={handleChangePayMethod}
              showControlRefPay={showControlRefPay}
              descriptionLabelSelectPayMethod={descriptionLabelSelectPayMethod}
              handleCloseModalEndCare={handleCloseModalEndCare}
              handleProcesarCronograma={handleProcesarCronograma}
              handleChangeInitialDate={handleChangeInitialDate}
              stateGenerateSchedule={stateGenerateSchedule}
              handleClickViewSchedulePay={handleClickViewSchedulePay}
              handleDescriptionRefPayMethod={handleDescriptionRefPayMethod}
              handleHandlePaySave={handleHandlePaySave}
              handleChangeHourInitial={handleChangeHourInitial}
            />
          </Modal>
        )
      }
      {
        openModalSchedule && (
          <Modal
            title={`CRONOGRAMA DEL PACIENTE - ${objPatient.person.surnames}/${objPatient.person.names}`}
            size={"modal-lg"}
            close
            openModal={openModalSchedule}
            onClose={handleCloseModalSchedule}
          >
            <ListScheduleForPatient
              rows={listSchedulesPatient}
              handleCloseModalSchedule={handleCloseModalSchedule}
            />
          </Modal>
        )
      }
    </div>
  )
}