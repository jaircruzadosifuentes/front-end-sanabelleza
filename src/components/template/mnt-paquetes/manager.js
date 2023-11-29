import React, { useState } from "react";
import { useGetAllFrecuencies, useGetAllPacketsOrUnitSessions } from "./hooks";
import List from "./list";
import ListFrecuency from "./list-frecuency";
import Filter from "./filter";
import { Title } from "src/components/atoms";
import Form from "./form";
import FormFrecuency from "./form-frecuency";
import { Modal } from "src/components/molecules";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServiceGetAllPacketsOrUnitSessions } from "./services";
import { ServicePostRegisterPacketsOrUnitSessions, ServicePutUpdatePacketsOrUnitSessions } from "src/service/packetsOrUnitSession/service.packetsOrUnitSession";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import { ServiceGetAllFrecuency, ServicePostRegisterFrecuencyClinic, ServicePutUpdateFrecuencyClinic } from "src/service/common/service.common";
import FormUpdatePaquete from './form-update-paquete';
import FormUpdateFrecuency from "./form-update-frecuency";

export default function Manager(props) {

  const { packetsOrUnitSession, setPacketsOrUnitSession } = useGetAllPacketsOrUnitSessions(props);
  const { frecuencies, setFrecuencies } = useGetAllFrecuencies(props);
  const [result, setResult] = useState([]);
  const [openModalPacketes, setOpenModalPackets] = useState(false);
  const [openModalFrecuency, setOpenModalFrecuency] = useState(false);
  //Hooks para el registro
  const [description, setDescription] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [nroSesion, setNroSesion] = useState(0);
  const [maxCuota, setMaxCuota] = useState(0);
  const [costo, setCosto] = useState(0.00);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [descripcionFrecuencia, setDescripcionFrecuencia] = useState('');
  const [abreviacionFrecuencia, setAbreviacionFrecuencia] = useState('');
  const [valorFrecuencia, setValorFrecuencia] = useState(0);
  const [objetoPaquete, setObjetoPaquete] = useState({
    packetsOrUnitSessionsId: 0,
    description: '',
    abbreviation: '',
    costPerUnit: 0.00,
    numberSessions: 0,
    maximumFeesToPay: 0
  });
  const [openModalEditarPaquete, setOpenModalEditarPaquete] = useState(false);
  const [openModalEditarFrecuencia, setOpenModalEditarFrecuencia] = useState(false);
  const [objetoFrecuencia, setObjetoFrecuencia] = useState({
    frecuencyDescription: '',
    abbreviation: '',
    value: 0,
    state: ''
  });
  const [descriptionEdit, setDescriptionEdit] = useState('');
  const [abbreviationEdit, setAbbreviationEdit] = useState('');
  const [valueEdit, setValueEdit] = useState(0);
  const [descripcionPaqueteEdit, setDescriptionPaqueteEdit] = useState('');
  const [numeroSesionEdit, setNumeroSesionEdit] = useState(0);
  const [costoPorSesionEdit, setCostoPorSesionEdit] = useState(0);
  const [abreviacionPaqueteEdit, setAbreviacionPaqueteEdit] = useState('');
  const [maximoNumeroPago, setMaximoNumeroPago] = useState(0);

  const handleChange = (event) => {
    setResult([]);
    setSelectedValue(event.target.value);
  };
  const handleSearch = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    if(selectedValue === 'a') {
      const filterBySearch = packetsOrUnitSession.filter((item) => {
        if (item.description.toLowerCase().includes(searchVal.toLowerCase())) {
          return item;
        }
        return null;
      })
      setResult(filterBySearch);
    } else {
      const filterBySearch = frecuencies.filter((item) => {
        if (item.frecuencyDescription.toLowerCase().includes(searchVal.toLowerCase())) {
          return item;
        }
        return null;
      })
      setResult(filterBySearch);
    }
  }
  const handleCloseModalPackets = (e) => {
    setOpenModalPackets(false);
  }
  const handleClickNewPackets = (e) => {
    if (selectedValue === 'a') {
      setOpenModalPackets(true);
    } else {
      setOpenModalFrecuency(true);
    }
  }
  //FORMS
  const handleChangeCostCu = (e) => {
    setCosto(e.target.value);
  }
  const handleClosePackets = (e) => {
    setOpenModalPackets(false);
  }
  const handleExportarExcel = (e) => {

  }
  const handleChangeSavePackets = (e) => {
    if(selectedValue === 'a') {
      let data = {
        description,
        abbreviation,
        numberSessions: parseInt(nroSesion),
        maximumFeesToPay: parseInt(maxCuota),
        costPerUnit: parseFloat(costo)
      };
      if (!description) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Debe de ingresar una descripción',
        })
        return;
      }
      if (!abbreviation) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Debe de ingresar una abreviatura',
        })
        return;
      }
      if (!nroSesion || parseInt(nroSesion) === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Debe de ingresar la cantidad de número de sesiones',
        })
        return;
      }
      if (!costo || parseInt(costo) === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Debe de ingresar el costo por sesión',
        })
        return;
      }
      if (!maxCuota || parseInt(maxCuota) === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Debe de ingresar el máximo de cuotas a pagar',
        })
        return;
      }
      Swal.fire({
        title: '¿Desea guardar el paquete ingresado?',
        text: `Usted está guardando el paquete ${abbreviation}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let inserta = await ServicePostRegisterPacketsOrUnitSessions(data);
          if (inserta.ok) {
            await handleLoadData()
            Swal.fire(
              'Registro exitoso',
              `El registro del paquete se ha realizado exitosamente.`,
              'success'
            );
            setOpenModalPackets(false);
          }
        }
      });

    } else {
      let objetoFrecuencia = {
        frecuencyDescription: descripcionFrecuencia,
        abbreviation: abreviacionFrecuencia,
        value: valorFrecuencia
      };
      if(!descripcionFrecuencia) {
        return;
      }
      if(!abreviacionFrecuencia) {
        return;
      }
      if(!valorFrecuencia || valorFrecuencia === 0) {
        return;
      }
      Swal.fire({
        title: '¿Desea guardar la frecuencia ingresada?',
        text: `Usted está guardando la frecuencia ${descripcionFrecuencia}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let inserta = await ServicePostRegisterFrecuencyClinic(objetoFrecuencia);
          if (inserta.ok) {
            await handleLoadData()
            Swal.fire(
              'Registro exitoso',
              `El registro de la frecuencia se ha realizado exitosamente.`,
              'success'
            );
            handleClearControlsNew();
            setOpenModalFrecuency(false);
          }
        }
      });
    }
  }
  const handleLoadData = async () => {
    if(selectedValue === 'a') {
      let listPackets = await ServiceGetAllPacketsOrUnitSessions();
      setPacketsOrUnitSession(listPackets);
    } else {
      let listFrecuencies = await ServiceGetAllFrecuency();
      setFrecuencies(listFrecuencies);
    }
  }
  const handleChangeDescriptionPacket = (e) => {
    setDescription(e.target.value);
  }
  const handleChangeAbbreviation = (e) => {
    setAbbreviation(e.target.value);
  }
  const handleChangeNroSesion = (e) => {
    const inputValue = e.target.value;
    if (!(/^\d+$/).test(inputValue)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    setNroSesion(inputValue);
  }
  const handleChangeMaxCuotas = (e) => {
    const inputValue = e.target.value;
    if (!(/^\d+$/).test(inputValue)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    setMaxCuota(inputValue);
  }
  const handleCloseModalFrecuency = (e) => {
    setOpenModalFrecuency(false);
  }
  const handleChangeValor = (e) => {
    setValorFrecuencia(e.target.value);
  }
  const handleChangeDescriptionFrecuency = (e) => {
    setDescripcionFrecuencia(e.target.value);
  }
  const handleChangeAbbreviationFrecuency = (e) => {
    setAbreviacionFrecuencia(e.target.value);
  }
  const handleEditar = (e, row) => {
    if(selectedValue === 'a') {
      setObjetoPaquete(row);
      setOpenModalEditarPaquete(true);
    } else {
      setObjetoFrecuencia(row);
      setOpenModalEditarFrecuencia(true);
    }
  }
  const handleCloseModalEditarPaquete = (e) => {
    setOpenModalEditarPaquete(false);
  }
  //Editar
  const handleChangeMaxCuotasEditar = (e) => {
    const inputValue = e.target.value;
    if (!(/^\d+$/).test(inputValue)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    setMaximoNumeroPago(inputValue);
  }
  const handleClosePacketsEdit = (e) => {
    setOpenModalEditarPaquete(false);
  }
  const handleCloseFrecuenciaEdit = (e) => {
    setOpenModalEditarFrecuencia(false);
  }
  const handleChangeGuardaEditarFrecuencia = (e) => {
    if (!(/^\d+$/).test(valueEdit)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    let objetoFrecuenciaActualiza = {
      frecuencyId: parseInt(objetoFrecuencia.frecuencyId),
      frecuencyDescription: (descriptionEdit === '' || !descriptionEdit ? objetoFrecuencia.frecuencyDescription: descriptionEdit),
      abbreviation: (abbreviationEdit === '' || !abbreviationEdit? objetoFrecuencia.abbreviation: abbreviationEdit),
      value: (valueEdit === 0 || !valueEdit? objetoFrecuencia.value: valueEdit)
    };
    Swal.fire({
      title: '¿Desea actualizar la frecuencia seleccionada?',
      text: `Usted está actualizando la frecuencia ${objetoFrecuencia.frecuencyDescription}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let inserta = await ServicePutUpdateFrecuencyClinic(objetoFrecuenciaActualiza);
        if (inserta.ok) {
          await handleLoadData()
          Swal.fire(
            'Actualización exitosa',
            `La actualización de la frecuencia se ha realizado exitosamente.`,
            'success'
          );
          handleClearControlsEdit();
          setOpenModalEditarFrecuencia(false);
        }
      }
    });
  }
  const handleChangeValorEdit = (e) => {
    setValueEdit(e.target.value);
  }
  const handleChangeDescriptionFrecuencyEdit = (e) => {
    setDescriptionEdit(e.target.value);
  }
  const handleChangeAbbreviationFrecuencyEdit = (e) => {
    setAbbreviationEdit(e.target.value);
  }
  const handleClearControlsEdit = () => {
    setAbbreviationEdit('');
    setDescriptionEdit('');
    setValueEdit(0);
    setCostoPorSesionEdit(0);
    setNumeroSesionEdit(0)
  }
  const handleClearControlsNew = () => {
    setAbbreviation('');
    setDescription('');
    setValorFrecuencia(0);
    setCosto(0);
    setMaximoNumeroPago(0);
    setNroSesion(0);
  }
  const handleChangeGuardaPacketsEdit = (e) => {
    if (!(/^\d+$/).test(maximoNumeroPago)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    if (!(/^\d+$/).test(numeroSesionEdit)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    let objetoPaqueteEdita = {
      packetsOrUnitSessionsId: objetoPaquete.packetsOrUnitSessionsId,
      numberSessions: (!numeroSesionEdit || numeroSesionEdit === ''? objetoPaquete.numberSessions: numeroSesionEdit),
      costPerUnit: (!costoPorSesionEdit || costoPorSesionEdit === 0? objetoPaquete.costPerUnit: costoPorSesionEdit),
      abbreviation: (!abreviacionPaqueteEdit || abreviacionPaqueteEdit === ''? objetoPaquete.abbreviation: abreviacionPaqueteEdit),
      maximumFeesToPay: (!maximoNumeroPago || maximoNumeroPago === 0? objetoPaquete.maximumFeesToPay: maximoNumeroPago),
      description: (!descripcionPaqueteEdit || descripcionPaqueteEdit === ''? objetoPaquete.description: descripcionPaqueteEdit)
    };
    Swal.fire({
      title: '¿Desea actualizar el paquete seleccionado?',
      text: `Usted está actualizando el paquete ${objetoPaquete.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let inserta = await ServicePutUpdatePacketsOrUnitSessions(objetoPaqueteEdita);
        if (inserta.ok) {
          await handleLoadData()
          Swal.fire(
            'Actualización exitosa',
            `La actualización del paquete se ha realizado exitosamente.`,
            'success'
          );
          setOpenModalEditarPaquete(false);
        }
      }
    });
  }
  const handleChangeCostCuEdit = (e) => {
    setCostoPorSesionEdit(e.target.value);
  }
  const handleChangeNroSesionEdit = (e) => {
    const input = e.target.value;
    if (!(/^\d+$/).test(input)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar un numero entero.',
      })
      return;
    }
    setNumeroSesionEdit(input);
  }
  const handleChangeAbbreviationEdit = (e) => {
    setAbreviacionPaqueteEdit(e.target.value);
  }
  const handleChangeDescriptionPacketEdit = (e) => {
    setDescriptionPaqueteEdit(e.target.value);
  }
  return (
    <div className="row">
      <div className="col-md-12">
        <Title value={`${selectedValue === 'a' ? 'CONFIGURACIÓN DE PAQUETES O SESIONES UNITARIAS' : 'CONFIGURACIÓN DE FRECUENCIAS'}`} type={'h1'} />
      </div>
      <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleChange}
          value="a"
          name="radio-buttons"
          label="PAQUETES"
        />
        <Radio
          checked={selectedValue === 'b'}
          onChange={handleChange}
          value="b"
          name="radio-buttons"
          label="FRECUENCIA"
        />
      </Box>
      <div className="col-md-12">
        <Filter
          handleSearch={handleSearch}
          handleClickNewPackets={handleClickNewPackets}
          handleExportarExcel={handleExportarExcel}
          selectedValue={selectedValue}
        />
      </div>
      <div className="col-md-12 mt-2">
        {
          selectedValue === 'a' ?
            <List 
              rows={result.length > 0 ? result : packetsOrUnitSession} 
              selectedValue={selectedValue} 
              handleEditar={handleEditar}
            /> 
            : 
            <ListFrecuency 
              rows={result.length > 0 ? result : frecuencies} 
              selectedValue={selectedValue}
              handleEditar={handleEditar}
            /> 
        }
      </div>
      {/* Modales */}
      {
        openModalPacketes && (
          <Modal
            title={`NUEVO PAQUETE O SESIÓN UNITARIA`}
            size={"modal-lg"}
            close
            openModal={openModalPacketes}
            onClose={handleCloseModalPackets}
          >
            <Form
              handleChangeCostCu={handleChangeCostCu}
              handleChangeDescriptionPacket={handleChangeDescriptionPacket}
              handleChangeAbbreviation={handleChangeAbbreviation}
              handleChangeNroSesion={handleChangeNroSesion}
              handleChangeMaxCuotas={handleChangeMaxCuotas}
              handleClosePackets={handleClosePackets}
              handleChangeSavePackets={handleChangeSavePackets}
            />
          </Modal>
        )
      }
      {
        openModalFrecuency && (
          <Modal
            title={`REGISTRO DE UNA NUEVA FRECUENCIA`}
            size={"modal-lg"}
            close
            openModal={openModalFrecuency}
            onClose={handleCloseModalFrecuency}
          >
            <FormFrecuency
              handleCloseModalFrecuency={handleCloseModalFrecuency}
              handleChangeSavePackets={handleChangeSavePackets}
              handleChangeDescriptionFrecuency={handleChangeDescriptionFrecuency}
              handleChangeAbbreviationFrecuency={handleChangeAbbreviationFrecuency}
              handleChangeValor={handleChangeValor}
            />
          </Modal>
        )
      }
      {
        openModalEditarPaquete && (
          <Modal
            title={`EDITAR EL PAQUETE ${objetoPaquete.description}`}
            size={"modal-lg"}
            close
            openModal={openModalEditarPaquete}
            onClose={handleCloseModalEditarPaquete}
          >
            <FormUpdatePaquete
              objetoPaquete={objetoPaquete}
              handleChangeMaxCuotasEditar={handleChangeMaxCuotasEditar}
              handleClosePacketsEdit={handleClosePacketsEdit}
              handleChangeDescriptionPacketEdit={handleChangeDescriptionPacketEdit}
              handleChangeAbbreviationEdit={handleChangeAbbreviationEdit}
              handleChangeNroSesionEdit={handleChangeNroSesionEdit}
              handleChangeCostCuEdit={handleChangeCostCuEdit}
              handleChangeGuardaPacketsEdit={handleChangeGuardaPacketsEdit}
            />
          </Modal>
        )
      }
      {
        openModalEditarFrecuencia && (
          <Modal
            title={`EDITAR LA FRECUENCIA ${objetoFrecuencia.frecuencyDescription}`}
            size={"modal-lg"}
            close
            openModal={openModalEditarFrecuencia}
            onClose={handleCloseFrecuenciaEdit}
          >
            <FormUpdateFrecuency
              objetoFrecuencia={objetoFrecuencia}
              handleCloseFrecuenciaEdit={handleCloseFrecuenciaEdit}
              handleChangeGuardaEditarFrecuencia={handleChangeGuardaEditarFrecuencia}

              handleChangeDescriptionFrecuencyEdit={handleChangeDescriptionFrecuencyEdit}
              handleChangeAbbreviationFrecuencyEdit={handleChangeAbbreviationFrecuencyEdit}
              handleChangeValorEdit={handleChangeValorEdit}
            />
          </Modal>
        )
      }
    </div>
  )
}