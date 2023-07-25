import React, { useEffect, useState } from "react";
import List from "./list";
import ListCitasProg from "./list-citas-prog";
import { Title } from "src/components/atoms";
import { useGetAllPatientsPatientWithAppoiment, useGetAllPatientsPendApro } from "./hooks";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Filter from "./filter";
import { ServiceGetAllPatientsPatientWithAppoiment, ServiceGetAllPatientsPendApro, ServicePutApprovePatient, ServicePutApprovePatientNew } from "src/service/patient/service.patient";
import PropTypes from 'prop-types';
import CardCountSolicitudes from "./card-count-solicitudes";
import { convertDateTimeToDate, getDateNow } from "src/utils/utils";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import { Modal } from "src/components/molecules";
import FormSendWssp from "./form-send-wssp";

export default function Manager(props) {
  //Variables
  //const [patient, setPatient] = useState({});
  const { listPatientsPendPro, setListPatientsPendPro } = useGetAllPatientsPendApro(props);
  const { listPatientsWithAppoiment, setListPatientWithAppoiment } = useGetAllPatientsPatientWithAppoiment(props);
  const [result, setResult] = useState([]);
  const [resultWithAppoiment, setResultWithAppoiment] = useState([]);
  const [idSelectTypeCard, setIdSelectTypeCard] = useState(1);
  const [typeCard, setTypeCard] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [openModalWssp, setOpenModalWssp] = useState(false);
  //const [openModalEmail, setOpenModalEmail] = useState(false);
  const [cellphone, setCellPhone] = useState('');
  const [messageWssp, setMessageWssp] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    async function getAllTypes() {
      let countPending = listPatientsPendPro.filter(l => l.state === 'PENDIENTE').length;
      let countRechazado = listPatientsPendPro.filter(l => l.state === 'RECHAZADO').length;
      let data = [
        {
          id: 1,
          value: 'PENDIENTE',
          contador: countPending
        },
        {
          id: 2,
          value: 'RECHAZADO',
          contador: countRechazado
        },
      ];
      setTypeCard(data)
    }
    async function getAllDefault() {
      setResult(listPatientsPendPro.filter(l => l.state === 'PENDIENTE'))
      setResultWithAppoiment(listPatientsWithAppoiment)
    }
    getAllDefault();
    getAllTypes();
  }, [listPatientsPendPro, listPatientsWithAppoiment])

  //Funciones

  const handleCancelRequest = async (e, row) => {
    let patient = row;
    let patientId = parseInt(patient.patientId);
    let namePatient = `${patient.person.surnames}/${patient.person.names}` ;
    if (isNaN(patientId)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Para rechazar, por favor seleccione un item.`,
      });
      return;
    }
    Swal.fire({
      title: '¿Desea rechazar la solicitud?',
      text: `Usted está rechazando la solicitud del paciente ${namePatient}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = await ServicePutApprovePatient(patientId, 'R');
        if (insert.ok) {
          await handleLoadData();
          Swal.fire(
            'Rechazo exitoso',
            'El rechazo ha sido realizado con éxito.',
            'success'
          );
          handleClearControls();
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
  const handleClickAprobarSolicitud = async (e, row, type = 1) => {
    if (type === 1) {
      let patient = row;
      let patientId = parseInt(patient.patientId);
      let namePatient = `${patient.person.surnames}/${patient.person.names}` ;
      if (isNaN(patientId)) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `Para aprobar, por favor seleccione un item.`,
        });
        return;
      }
      if (!patient.patientSolicitude.hourAttention) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `No puede aprobar, si no se ha programado la hora de atención de la sesión.`,
        });
        return;
      }
      if (convertDateTimeToDate(patient.patientSolicitude.dateAttention) !== convertDateTimeToDate(getDateNow())) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `No puede aprobar la sesión, si la fecha de atención es menor a la actual.`,
        });
        return;
      }
      Swal.fire({
        title: '¿Desea aprobar la solicitud?',
        text: `Usted está aprobando la solicitud del paciente ${namePatient}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let insert = true;
          insert = await ServicePutApprovePatient(patientId, 'A')
          if (insert.ok) {
            await handleLoadData();
            Swal.fire(
              'Aprobación exitosa',
              'La solicitud ha sido aprobada con éxito.',
              'success'
            );
            handleClearControls();
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
    } else if (type === 2) {
      let patientProgress = row;
      let patientProgressId = parseInt(patientProgress.patientProgressId);

      if (patientProgress.isQueueRemoval) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `La sesión ya ha sido aprobada. No puede volver a aprobar.`,
        });
        return;
      }

      if (patientProgress.hourOffAttention === '-') {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `No puede aprobar, si no se ha programado la hora de atención de la sesión.`,
        });
        return;
      }
      if (new Date(getDateNow()) > new Date((patientProgress.dateOfAttention))) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `No puede aprobar la sesión, si la fecha de la sesión es menor a la fecha actual.`,
        });
        return;
      }
      Swal.fire({
        title: '¿Desea aprobar la solicitud?',
        text: `Usted está aprobando la sesión`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let insert = true;
          insert = await ServicePutApprovePatient(patientProgressId, 'S');
          if (insert.ok) {
            await handleLoadData(type);
            Swal.fire(
              'Aprobación exitosa',
              'La solicitud ha sido aprobada con éxito.',
              'success'
            );
            handleClearControls();
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
  }
  const handleClearControls = () => {
  }
  const handleLoadData = async (type = 1) => {
    if (type === 1) {
      let listPatients = await ServiceGetAllPatientsPendApro();
      setListPatientsPendPro(listPatients)
    } else if (type === 2) {
      let listPatients = await ServiceGetAllPatientsPatientWithAppoiment();
      setListPatientWithAppoiment(listPatients)
    }
  }
  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = listPatientsPendPro.filter((item) => {
      if (item.patientName.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }

  const handleChangeSelectCardType = (e, patient) => {
    let { id, value } = patient;
    setIdSelectTypeCard(id);
    const filterBySearch = listPatientsPendPro.filter((item) => {
      if (item.state.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleSendWhatsapp = (e, number) => {
    setCellPhone(number)
    setOpenModalWssp(true);
  }
  const handleCloseModalWssp = (e) => {
    setOpenModalWssp(false);
  }
  const handleSendMessWssp = (e) => {
    if(!cellphone) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar el número de celular.`,
      })
      return;
    }
    if(!messageWssp) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de ingresar el cuerpo del mensaje.`,
      })
      return;
    }
    setMessageWssp(messageWssp.replace(" ", "%20"));
    let url = `https://wa.me/51${cellphone}?text=${messageWssp}`
    window.open(url);
  }
  const handleChangeMessageWssp = (e) => {
    setMessageWssp(e.target.value);
  }
  const handleChangeCellPhone = (e) => {
    setCellPhone(e.target.value);
  }
  const handleChangeSendMsgWssp = (e, row, dataHead) => {
    let isAttention = row.isAttention;
    let cellPhoneSend = dataHead.cellphone
    let dateOfAttention = (row.dateOfAttention);
    let hourOffAttention = (row.hourOffAttention);
    let systemHour = row.systemHour;
    let mssg = '';
    let dateOfAttentionValidate = new Date(dateOfAttention);
    let dateNow = new Date(getDateNow());
    let isValidateDate = dateOfAttentionValidate < dateNow;

    if(hourOffAttention === '-') {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Debe de asignarse la hora de la cita. En todo caso contáctese con la Doctora en turno. Si no es el caso, con la autorización de la Doctora y con el perfil de ASISTENTE, reconfigure la hora de la cita.`,
      })
      return;
    }

    if(isValidateDate) {
      mssg = `Estimada Lozada Durand, Madelyne, para hacerle recordar que no asistió a su cita programada para el 
        día ${convertDateTimeToDate(dateOfAttention)} a las ${hourOffAttention} ${systemHour}. Para reprogramar, por favor de 
        llamar a reprogramar su cita. En caso contrario, perderá la sesión programada.`
    }
    else if(!isAttention && !isValidateDate) {
      mssg = `Estimado Lozada Durand, Madelyne, para hacerle recordar que tiene una cita programada para el día ${convertDateTimeToDate(dateOfAttention)} a las ${hourOffAttention}. 
        Por favor de confirmar por este medio.`
    }
    mssg = mssg.replace(" ", "%20");
    let url = `https://wa.me/51${cellPhoneSend}?text=${mssg}`
    window.open(url);
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Title value={'MÓDULO DE APROBACIÓN Y/O RECHAZO DE SOLICITUDES'} type={'h1'} />
        </div>
        <CardCountSolicitudes
          rows={result}
          handleChangeSelectCardType={handleChangeSelectCardType}
          idSelectTypeCard={idSelectTypeCard}
          typeCard={typeCard}
        />
        <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
          <Radio
            checked={selectedValue === 'a'}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            label="CONSULTAS INICIALES"
          />
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            label="CITAS PROGRAMADAS"
          />
        </Box>
        <Filter
          handleSearchForSurNames={handleSearchForSurNames}
        />
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          {
            selectedValue === 'a' ?
              <List
                rows={result}
                handleClickAprobarSolicitud={handleClickAprobarSolicitud}
                handleCancelRequest={handleCancelRequest}
                typeList={1}
              /> :
              <ListCitasProg
                rows={resultWithAppoiment}
                handleClickAprobarSolicitud={handleClickAprobarSolicitud}
                handleCancelRequest={handleCancelRequest}
                typeList={2}
                handleSendWhatsapp={handleSendWhatsapp}
                handleChangeSendMsgWssp={handleChangeSendMsgWssp}
              />
          }
        </div>
      </div>
      {
        openModalWssp && (
          <Modal
            title={`ENVIO DE MENSAJES POR WHATSAPP`}
            size={"modal-xs"}
            close
            openModal={openModalWssp}
            onClose={handleCloseModalWssp}
          >
            <FormSendWssp
              handleSendMessWssp={handleSendMessWssp}
              handleChangeMessageWssp={handleChangeMessageWssp}
              handleChangeCellPhone={handleChangeCellPhone}
              cellphone={cellphone}
              handleCloseModalWssp={handleCloseModalWssp}
            />
          </Modal>
        )
      }
    </div>
  )
}
Manager.propTypes = {
  handleChangeSendMsgWssp: PropTypes.func,
  handleChangeMessageWssp: PropTypes.func,
  handleChangeCellPhone: PropTypes.func,
  history: PropTypes.func,
  handleSendWhatsapp: PropTypes.func,
  handleSendMessWssp: PropTypes.func,
};