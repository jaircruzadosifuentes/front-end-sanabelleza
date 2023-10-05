import React, { useState } from "react";
import { useGetAllAreas, useGetAllRoles } from "src/api/hooks/common/common-hooks";
import { Title } from "src/components/atoms";
import Filter from "src/components/organism/filter";
import List from "./list";
import { ButtonFormControl, Modal } from "src/components/molecules";
import Form from "./form";
import { formatDecimales } from "src/utils/utils";
import { ServiceGetRoles, ServicePostRegisterRole, ServicePutDisabledEnabledRole, ServicePutRole } from "src/service/common/service.common";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import FormUpdate from "./form-update";

export default function Manager(props) {
  const [openModal, setOpenModal] = useState(false);

  const { lstRoles, setLstRoles } = useGetAllRoles(props);
  const { areas } = useGetAllAreas(props);
  //Hooks
  const [areaId, setAreaId] = useState(0);
  const [salario, setSalario] = useState(0.00);
  const [descRol, setDescRol] = useState('');
  const [abreviacion, setAbreviacion] = useState('');
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [objRole, setObjRole] = useState({});
  const [result, setResult] = useState([]);

  const handleCloseModal = (e) => {
    setOpenModal(false);
  }
  const handleNewRole = (e) => {
    setOpenModal(true);
  }
  const handleChangeArea = (e) => {
    setAreaId(e?.value);
  }
  const handleChangeSalario = (e) => {
    setSalario(e.target.value);
  }
  const handleChangeDescRol = (e) => {
    setDescRol(e.target.value);
  }
  const handleChangeAbre = (e) => {
    setAbreviacion(e.target.value);
  }
  const clearControlers = () => {
    setAbreviacion('');
    setDescRol('');
    setAreaId(0);
    setSalario(0.00);
  }
  const handleSaveRole = async (e) => {
    if (!descRol) {
      return;
    }
    if (!abreviacion) {
      return;
    }
    if (!areaId || areaId === 0) {
      return;
    }
    if (!salario || salario === 0) {
      return;
    }
    let data = {
      name: descRol,
      salary: formatDecimales(parseFloat(salario)),
      abbreviation: abreviacion,
      area: {
        areaId
      }
    }
    Swal.fire({
      title: '¿Desea registrar el rol ingresado?',
      text: `Usted está registrando el rol ${descRol}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let inserta = await ServicePostRegisterRole(data);
        if (inserta.ok) {
          setOpenModal(false);
          await loadDataRoles();
          clearControlers();
          Swal.fire(
            'Registro exitoso',
            `El registro del role se ha realizado exitosamente.`,
            'success'
          );
        }
      }
    });
  }
  const loadDataRoles = async () => {
    let listRole = await ServiceGetRoles();
    setLstRoles(listRole);
  }
  const handleDisabledEnabled = async (e, row, type) => {
    const { value } = row;
    Swal.fire({
      title: `¿Desea ${type === 1 ? 'deshabilitar' : 'habilitar'} el rol seleccionado?`,
      text: `Usted está ${type === 1 ? 'deshabilitando' : 'habilitando'} el rol ${descRol}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, ${type === 1 ? 'deshabilitar' : 'habilitar'}`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let update = await ServicePutDisabledEnabledRole(value, type);
        if (update.ok) {
          Swal.fire(
            `${type === 1 ? 'Deshabilitación' : 'Habilitación'} exitosa`,
            `El rol ha sido ${type === 1 ? 'deshabilitado' : 'habilitado'} exitosamente.`,
            'success'
            );
          await loadDataRoles();
        }
      }
    });
  }
  const handleEditar = (e, row) => {
    setOpenModalEdit(true);
    setObjRole(row);
  }
  const handleCloseModalEdit = (e) => {
    setOpenModalEdit(false);
  }
  const handleSearch = (e) => {
    let searchVal = e.target.value;
    const filterBySearch = lstRoles.filter((item) => {
      if (item.label.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleEditRole = async(e) => {
    let data = {
      name: descRol === ''? objRole.label: descRol,
      salary: salario === 0 || salario === '' ? objRole?.salary: formatDecimales(parseFloat(salario)),
      abbreviation: abreviacion === ''? objRole?.abbreviation :abreviacion,
      area: {
        areaId: areaId === 0 || areaId === ''? objRole?.area?.areaId: areaId
      },
      roleId: objRole?.value
    }
    Swal.fire({
      title: `¿Desea editar el rol seleccionado?`,
      text: `Usted está editar el rol`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, editar`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let update = await ServicePutRole(data);
        if(update.ok) {
          await loadDataRoles();
          clearControlers();
          setOpenModalEdit(false);
          Swal.fire(
            `Edición exitosa`,
            `El rol ha sido editado exitosamente.`,
            'success'
          );
        }
      }
    });

  }
  return (
    <div className="row">
      <div className="col-md-12">
        <Title value={`MANTENIMIENTO DE CARGOS`} type={'h1'} />
      </div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <Filter
              label="Buscar por descripción"
              handleSearchForSurNames={handleSearch}
            />
          </div>
          <div className="col-md-2 btn-toolbar mt-3" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title={`Nuevo cargo`}
                color='btn btn-success'
                onClick={handleNewRole}
                type={7}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
      <div className="col-md-12 mt-2">
        <List
          rows={result.length > 0 ? result : lstRoles}
          handleDisabledEnabled={handleDisabledEnabled}
          handleEditar={handleEditar}
        />
      </div>
      {
        openModal && (
          <Modal
            title={`NUEVO CARGO`}
            size={"modal-lg"}
            close
            openModal={openModal}
            onClose={handleCloseModal}
          >
            <Form
              handleCloseModal={handleCloseModal}
              areas={areas}
              handleChangeArea={handleChangeArea}
              handleChangeDescRol={handleChangeDescRol}
              handleChangeAbre={handleChangeAbre}
              handleChangeSalario={handleChangeSalario}
              handleSaveRole={handleSaveRole}
            />
          </Modal>
        )
      }
      {
        openModalEdit && (
          <Modal
            title={`EDITAR EL CARGO`}
            size={"modal-lg"}
            close
            openModal={openModalEdit}
            onClose={handleCloseModalEdit}
          >
            <FormUpdate
              handleCloseModalEdit={handleCloseModalEdit}
              areas={areas}
              objRole={objRole}
              handleChangeArea={handleChangeArea}
              handleChangeDescRol={handleChangeDescRol}
              handleChangeAbre={handleChangeAbre}
              handleChangeSalario={handleChangeSalario}
              handleEditRole={handleEditRole}
            />
          </Modal>
        )
      }
    </div>
  )
}