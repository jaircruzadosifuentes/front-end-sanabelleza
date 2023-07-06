import React, { useState } from "react";
import List from "./list";
import { Title } from "src/components/atoms";
import { ButtonFormControl, TextAreaFormControl } from "src/components/molecules";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Filter from "./filter";
import { ServiceGetAllPatientsPendApro, ServicePutApprovePatient, ServicePutApprovePatientNew } from "src/service/patient/service.patient";
import PropTypes from 'prop-types';
import { useGetAllPatientsPendApro } from "./hooks";

export default function Manager(props) {
  //Variables
  const [patient, setPatient] = useState({});
  const [result, setResult] = useState([]);
  const { listPatientsPendPro, setListPatientsPendPro } = useGetAllPatientsPendApro(props);
  //Funciones
  const handleChangeCaptureIdPatientAprrove = (e, row) => {
    setPatient(row);
  }
  const handleClickAprobarSolicitud = async (e) => {
    let isNew = parseInt(patient.isNew);
    let patientId = parseInt(patient.patientId);
    let namePatient = patient.patientName;
    if (isNaN(patientId)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `Para aprobar, por favor seleccione un item.`,
      })
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
        if (isNew === 0) {
          insert = await ServicePutApprovePatientNew(patientId);
        } else {
          insert = await ServicePutApprovePatient(patientId);
        }
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
  }
  const handleClearControls = () => {
    setPatient([]);
  }
  const handleLoadData = async () => {
    let listPatients = await ServiceGetAllPatientsPendApro();
    setListPatientsPendPro(listPatients)
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
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Title value={'MÓDULO DE RECHAZO DE SOLICITUDES'} type={'h1'} />
        </div>
        <Filter
          handleSearchForSurNames={handleSearchForSurNames}
        />
        <div className="col-md-4 mt-3" >
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Rechazar"
                color='btn btn-danger'
                type={2}
                onClick={handleClickAprobarSolicitud}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <List
            rows={result.length > 0 ? result: listPatientsPendPro}
            handleChangeCaptureIdPatientAprrove={handleChangeCaptureIdPatientAprrove}
          />
        </div>
      </div>
      <div className="row mt-2 mb-2">
        <div className="col-md-6">
          <TextAreaFormControl
            type="text"
            label="Glosa"
            isLabel
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
Manager.propTypes = {
  history: PropTypes.func,
};