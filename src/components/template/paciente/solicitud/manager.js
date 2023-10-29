import React, { useState } from "react";
import { Title } from "src/components/atoms";
import { getValueInBrackets } from "src/utils/utils";
import Form from "./form";
import PropTypes from "prop-types";
import { Modal } from "src/components/molecules";
import FormDisponibilty from "./form-disponibility";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useGetAllDocuments, useGetAllEmployeed } from './hooks/index';
import { ServiceGetDisponibiltyEmployeed } from "./services";
import ListPatientDraft from './list-patient-draft';
import { ServiceGetPatientsSolicitudeInDraft, ServicePostRegistrSolicitudAttention } from "src/service/solicitudAttention/service.solicitudAttention";
import { useNavigate } from "react-router-dom";
import { EntityGetByDni } from "src/utils/api-rest";
import Switch from '@mui/material/Switch';
import { AREA_FISIOTERAPIA_ATENCION, COLOR_BUTTON_MAB, COLOR_GREEN } from "src/config/config";
import { ServiceVerifyPatientByFullName } from "src/service/common/service.common";

export default function Manager(props) {
  let navigate = useNavigate();
  //HOOKS
  const { documents } = useGetAllDocuments(props);
  const { employeeds } = useGetAllEmployeed(props);
  //Variables
  const [openModalViewDisponibilty, setOpenModalViewDisponibility] = useState(false);
  const [dateDisponibiltySearch, setDateDisponibilitySearch] = useState('');
  const [employeedId, setEmployeedId] = useState(0);
  const [employeed, setEmployeed] = useState('');
  const [employeedsDisponibiltyResult, setEmployeedDisponibilityResult] = useState([]);
  const [employeedsWithScheduleResult, setEmployeedWithScheduleResult] = useState([]);

  const [dateOfRegister, setDateOfRegister] = useState('');
  const [hourInitial, setHourInitial] = useState('');
  const [hourFinished, setHourFinished] = useState('');
  const [sizeDocument, setSizeDocument] = useState(0);
  const [names, setNames] = useState('');
  const [surNames, setSurNames] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nroDocument, setNroDocument] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [documentTypeId, setDocumentTypeId] = useState(0);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [openModalVerEnBorrador, setOpenModalVerEnBorrador] = useState(false);
  const [listaPacientesEnBorrador, setListaPacientesEnBorrador] = useState([]);
  const [consultReniec, setConsultReniec] = useState(true);
  const [apellidoPaternoReniec, setApellidoPaternoReniec] = useState('');
  const [apellidoMaternoReniec, setApellidoMaternoReniec] = useState('');
  const [nombresReniec, setNombresReniec] = useState('');
  const [nombresCompletos, setNombresCompletos] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  //#region Metodos
  const handleViewDisponibilty = () => {
    setOpenModalViewDisponibility(true);
  }
  const handleCloseModalViewDisponibility = () => {
    setOpenModalViewDisponibility(false);
  }
  const handleViewDisponibiltyForIdEmployeed = async (e) => {
    console.log(dateDisponibiltySearch);
    if(!dateDisponibiltySearch) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar la fecha a buscar`,
      })
      return;
    }
    if (employeedsDisponibiltyResult.length > 0) {
      setEmployeedDisponibilityResult([]);
    }
    let result = await ServiceGetDisponibiltyEmployeed(dateDisponibiltySearch, employeedId);
    setEmployeedDisponibilityResult(result);
  }
  const handleChangeSearchForDate = (e) => {
    setDateDisponibilitySearch(e.target.value);
  }
  const handleChangeEmployeed = (e, values) => {
    if (values === null) {
      return;
    }
    if (isNaN(values.label)) {
      setEmployeedWithScheduleResult([]);
      setEmployeed(values.label);
      setEmployeedId(getValueInBrackets(values.label));
    }
  }
  const handleSave = async(e) => {
    if(!names) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Ingrese los nombres el paciente.`,
      })
      return;
    }
    if(!surNames) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Ingrese los apellidos del paciente.`,
      })
      return;
    }
    if(!nroDocument || !documentTypeId) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Ingrese el nro de documento del paciente y seleccione el tipo de documento del paciente.`,
      })
      return;
    }
    if(nroDocument.length < sizeDocument) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Ingrese correctamente el tamaño del documento del paciente.`,
      })
      return;
    }
    if(!employeedId) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Asigne la persona encargada a atender al paciente.`,
      })
      return;
    }
    if(!birthDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar la fecha de nacimiento del paciente.`,
      })
      return;
    }

    if(!consultReniec) {
      let listVerify = [];
      listVerify = await ServiceVerifyPatientByFullName(surNames, names);
      let isExists = isExistsPatient(listVerify);
      if(isExists) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `El paciente ${getNameIsExistsPatient(listVerify)}, ya se encuentra en tratamiento actualmente. Por favor, debe de esperar que su tratamiento finalice.`,
        });
        return;
      }
    } 

    let data = {
      person: {
        names, 
        surNames,
        birthDate,
        personDocument: {
          nroDocument,
        },
        personCellphone: {
          cellPhoneNumber: cellPhone
        },
        document: {
          value: parseInt(documentTypeId),
        },
        gender: selectedValue === 'a'? 'M': 'F',
        personEmail: {
          emailDescription: email
        }
      },
      saveInDraft: false,
      cellPhone,
      patientSolicitude: {
        hourAttention: hourInitial,
        dateAttention: dateOfRegister,
        employeed: {
          employeedId: employeedId
        }
      }
    };
    Swal.fire({
      title: '¿Desea guardar la solicitud?',
      text: `Usted está guardando la solicitud para el paciente ${surNames}/${names}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        let insert = await ServicePostRegistrSolicitudAttention(data);
        console.log(insert);
        if(insert.ok) {
          handleClearControls();
          Swal.fire(
            'Guardado exitoso',
            'La solicitud ha sido creada con éxito.',
            'success'
          )
          setTimeout(() => {
            navigate("/aprobacion-rechazo-solicitud");
          }, 2000);
        }
        else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `Error: ${insert.title}. Comuniquese con Sistemas.`,
          })
          return;
        }
      }
    })
  }
  const handleSaveTemporality = (e) => {
    if(!names || !surNames) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar almenos el nombre y apellido del paciente.`,
      })
      return;
    }
    let data = {
      person: {
        names, 
        surNames,
        birthDate: birthDate === '' ? '1999-01-01': birthDate,
        personDocument: {
          nroDocument,
        },
        personCellphone: {
          cellPhoneNumber: cellPhone
        },
        document: {
          value: parseInt(documentTypeId),
        },
        gender: selectedValue === 'a'? 'M': 'F',
        personEmail: {
          emailDescription: email
        }
      },
      saveInDraft: true,
      cellPhone,
      patientSolicitude: {
        hourAttention: hourInitial,
        dateAttention: dateOfRegister === ''? '1999-01-01': dateOfRegister,
        employeed: {
          employeedId: employeedId 
        }
      }
    };
    Swal.fire({
      title: '¿Desea guardar la solicitud en borrador?',
      text: `Usted está guardando la solicitud en borrador para el paciente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        let insert = await ServicePostRegistrSolicitudAttention(data);
        if(insert.ok) {
          handleClearControls();
          Swal.fire(
            'Guardado en borrador exitoso',
            'La solicitud ha sido guardada en borrador con éxito.',
            'success'
          )
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
  const handleLimpiarControles = () => {
    document.getElementById('idApellidosSolicitud').value = '';
    document.getElementById('idNombresSolicitud').value = '';
    document.getElementById('idNroDocumentoSolicitud').value = '';
  }
  const handleClearControls = () => {
    setNames('');
    setSurNames('');
    setBirthDate('');
    setCellPhone('');
    setEmail('');
    setEmployeedWithScheduleResult([]);
    setEmployeedDisponibilityResult([]);
    setEmployeed('');
    setEmployeedId(0);
    setHourInitial('');
    setHourFinished('');
    setDateOfRegister('');
    setNombresReniec('');
    setApellidoMaternoReniec('');
    setApellidoPaternoReniec('');

    document.getElementById('idApellidosSolicitud').value = '';
    document.getElementById('idNombresSolicitud').value = '';
    document.getElementById('idNroDocumentoSolicitud').value = '';
  }
  const handleAsignarSchedule = (data) => {
    Swal.fire({
      title: `¿Desea asignar el horario seleccionado?`,
      text: `Usted está seleccionando el horario de atención de ${data.hourInitial} - ${data.hourFinished}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Asignar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setHourInitial(data.hourInitial);
        setHourFinished(data.hourFinished);
        setDateOfRegister(data.dateProgramming);
        setEmployeedWithScheduleResult(data);
        setOpenModalViewDisponibility(false);
        Swal.fire(
          'Asignación exitosa',
          'La Asignación de Horario ha sido registrada con éxito.',
          'success'
        )
      }
    })
  }
  const handleChangeHourFinishedRegisterSchedule = (e) => {
    setHourFinished(e.target.value);
  }
  const handleChangeDateRegisterSchedule = (e) => {
    setDateOfRegister(e.target.value);
  }
  const handleChangeHourInitialRegisterSchedule = (e) => {
    setHourInitial(e.target.value);
  }
  const handleChangeTipoDocumento = (e) => {
    setSizeDocument(e?.longitud)
    setDocumentTypeId(e?.value);
  }
  const handleChangeSurNames = (e) => {
    setSurNames(e.target.value);
  }   
  const handleChangeNames = (e) => {
    setNames(e.target.value);
  }
  const handleChangeBirthDate = (e) => {
    setBirthDate(e.target.value);
  }
  const handleChangeNroDocument = (e) => {
    setNroDocument(e.target.value);
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangeCellPhone = (e) => {
    setCellPhone(e.target.value);
  }
  const handleItemEditSchedule = (item) => {
    handleAsignarSchedule(item);
  }
  const handleVerEnBorrador = async(e) => {
    setOpenModalVerEnBorrador(true);
    let listaPacientes = await ServiceGetPatientsSolicitudeInDraft();
    setListaPacientesEnBorrador(listaPacientes);
  }
  const handleCloseModalVerEnBorrador = (e) => {
    setOpenModalVerEnBorrador(false);
  }
  const handleChangeCancelar = (e) => {
    navigate('/dashboard');
  }
  const handleKeyUpNroDocument = async(e) => {
    let listVerify = []
    if(e.keyCode === 13) {
      if(consultReniec) {
        let objectPerson = await EntityGetByDni(nroDocument);
        if(objectPerson.success) {
          setApellidoPaternoReniec(objectPerson?.data?.apellido_paterno);
          setApellidoMaternoReniec(objectPerson?.data?.apellido_materno);
          setNombresCompletos(objectPerson?.data?.nombre_completo.split(',')[0]);
          setSurNames(objectPerson?.data?.apellido_paterno + ' ' + objectPerson?.data?.apellido_materno);
          setNames(objectPerson?.data?.nombres);
          setNombresReniec(objectPerson?.data?.nombres);
          listVerify = await ServiceVerifyPatientByFullName(objectPerson?.data?.apellido_paterno + ' ' + objectPerson?.data?.apellido_materno, objectPerson?.data?.nombres);
          let isExists = isExistsPatient(listVerify);
          if(isExists) {
            Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: `El(la) paciente ${getNameIsExistsPatient(listVerify)}, ya se encuentra en tratamiento actualmente. Por favor, debe de esperar que su tratamiento finalice.`,
            });
            handleClearControls();
            return;
          }
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `${objectPerson.message}`,
          });
          return;
        }
      } 
    }
  }
  const isExistsPatient = (listVerify = []) => {
    return listVerify[0].isExitsPerson;
  }
  const getNameIsExistsPatient = (listVerify = []) => {
    return listVerify[0].namesFull;
  }
  const handleChangeConsultaReniec = (e) => {
    setConsultReniec(e.target.checked);
  }
  //#region Metodos
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title
        type={'h1'}
        value={'SOLICITUD - REGISTRO DEL PACIENTE'}
      />
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2">
          <span style={{color: consultReniec ? COLOR_GREEN: COLOR_BUTTON_MAB}}>Consultar con RENIEC</span> <Switch {...label} defaultChecked onChange={handleChangeConsultaReniec} />
        </div>
      </div>
      <Form
        objPersonConRenic={{
          apellido_paterno: apellidoPaternoReniec,
          apellido_materno: apellidoMaternoReniec,
          nombres: nombresReniec,
          nombresCompletos: nombresCompletos
        }}
        handleViewDisponibilty={handleViewDisponibilty}
        handleSave={handleSave}
        handleSaveTemporality={handleSaveTemporality}
        documents={documents}
        employeed={employeed}
        dateOfRegister={dateOfRegister}
        hourInitial={hourInitial}
        hourFinished={hourFinished}
        handleChangeTipoDocumento={handleChangeTipoDocumento}
        sizeDocument={sizeDocument}
        handleChangeSurNames={handleChangeSurNames}
        handleChangeNames={handleChangeNames}
        handleChangeBirthDate={handleChangeBirthDate}
        handleChangeNroDocument={handleChangeNroDocument}
        handleChangeCellPhone={handleChangeCellPhone}
        handleChangeEmail={handleChangeEmail}
        selectedValue={selectedValue}
        handleChange={handleChange}
        handleVerEnBorrador={handleVerEnBorrador}
        handleLimpiarControles={handleLimpiarControles}
        listaPacientesEnBorrador={listaPacientesEnBorrador}
        handleChangeCancelar={handleChangeCancelar}
        handleKeyUpNroDocument={handleKeyUpNroDocument}
      />

      {/* Modales */}
      {
        openModalViewDisponibilty && (
          <Modal
            title={`BUSCAR DISPONIBILIDAD PARA EL PACIENTE ${surNames.toUpperCase()}/${names.toUpperCase()}`}
            size={"modal-xl"}
            close
            openModal={openModalViewDisponibilty}
            onClose={handleCloseModalViewDisponibility}
          >
            <FormDisponibilty
              employeeds={employeeds.filter(e => parseInt(e.areaId) === AREA_FISIOTERAPIA_ATENCION)}
              employeedsWithScheduleResult={employeedsWithScheduleResult}
              employeedsDisponibiltyResult={employeedsDisponibiltyResult}
              handleChangeEmployeed={handleChangeEmployeed}
              handleChangeSearchForDate={handleChangeSearchForDate}
              handleViewDisponibiltyForIdEmployeed={handleViewDisponibiltyForIdEmployeed}
              handleAsignarSchedule={handleAsignarSchedule}
              handleChangeDateRegisterSchedule={handleChangeDateRegisterSchedule}
              handleChangeHourInitialRegisterSchedule={handleChangeHourInitialRegisterSchedule}
              handleChangeHourFinishedRegisterSchedule={handleChangeHourFinishedRegisterSchedule}
              dateOfRegister={dateOfRegister}
              hourInitial={hourInitial}
              hourFinished={hourFinished}
              handleCloseModalEmployeedDisponibility={handleCloseModalViewDisponibility}
              handleItemEditSchedule={handleItemEditSchedule}
            />
          </Modal>
        )
      }
      {
        openModalVerEnBorrador && (
          <Modal
            title={`LISTADO DE PACIENTES EN BORRADOR`}
            size={"modal-lg"}
            close
            openModal={openModalVerEnBorrador}
            onClose={handleCloseModalVerEnBorrador}
          >
           <ListPatientDraft
              listaPacientesEnBorrador={listaPacientesEnBorrador}
           />
          </Modal>
        )
      }
    </div>
  )
}
const label = { inputProps: { 'aria-label': 'Switch demo' } };
Manager.propTypes = {
  handleViewDisponibilty: PropTypes.func,
  handleAsignarSchedule: PropTypes.func,
  handleViewDisponibiltyForIdEmployeed: PropTypes.func,
  handleItemEditSchedule: PropTypes.func,
  documents: PropTypes.array,
  employeedsDisponibiltyResult: PropTypes.array,
  employeeds: PropTypes.array,
  employeedsWithScheduleResult: PropTypes.array,
};