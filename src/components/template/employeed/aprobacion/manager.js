import React, { useState } from "react";
import List from "../list";
import { useGetAllEmployeedPendingAproval } from "src/api/hooks/employeed/employeed-hook";
import { Title } from "src/components/atoms";
import Filter from "src/components/organism/filter";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServiceGetAllEmployeedPendingAproval, ServicePutAppproveContractEmployeed } from "src/service/employeed/service.employeed";

export default function Manager(props) {
  const { employeedsPendingAproval, setEmployeedsPendingAproval } = useGetAllEmployeedPendingAproval(props);
  const [result, setResult] = useState([]);

  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = employeedsPendingAproval.filter((item) => {
      if (item?.person?.surnames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleLoadDataEmployeedsPending = async() => {
    let listEmployeed = await ServiceGetAllEmployeedPendingAproval();
    setEmployeedsPendingAproval(listEmployeed)
  }
  const handleApproveContract = (e, row) => {
    const { employeedId } = row;
    let data = {
      employeedId: employeedId
    };
    //Generamos el PDF de contrato y actualizamos (Esto faltaria)
    Swal.fire({
      title: '¿Desea aprobar la solicitud del contrato?',
      text: `Usted está aprobando la solicitud de contrato del Empleado.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aprobar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = await ServicePutAppproveContractEmployeed(data);
        if (insert) {
          await handleLoadDataEmployeedsPending();
          Swal.fire(
            'Aprobación exitosa',
            'La solicitud del contrato ha sido aprobada con éxito.',
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
  return (
    <div className="container-fluid">
      <div className="row">
        <Title type={'h1'} value={'MÓDULO DE APROBACIÓN DE CONTRATO DE EMPLEADOS'} />
      </div>
      <div className="row">
        <div className="col-md-4 col-xs-4">
          <Filter handleSearchForSurNames={handleSearchForSurNames} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <List 
            rows={result.length > 0 ? result : employeedsPendingAproval} 
            pendingApproval 
            handleApproveContract={handleApproveContract}
          />
        </div>
      </div>
    </div>
  )
}