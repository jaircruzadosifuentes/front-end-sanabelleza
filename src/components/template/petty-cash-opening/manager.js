import React, { useState } from "react";
import { Title } from "src/components/atoms";
import AutoCompleteTextField from "src/components/organism/autocomplete-text-field";
import { useGetAllEmployeed } from "../paciente/solicitud/hooks";
import FormRegister from "./form-register";
import List from "./list";
import { ServiceCloseCashRegisterById, ServiceDetailDataEmployeedCajaChica, ServiceGetHistDetailCajaChicaByIdEmployeed, ServicePostApertuCajaChica } from "src/service/contabilidad/service.contabilidad";
import { getValueInBrackets } from "src/utils/utils";
import { getDateNowWithFormat, getHoraActual } from "src/utils/functions";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SpanFormControl from "src/components/atoms/SpanFormControl";
import { useGetAllConfigs } from "src/hooks/common/common-hook";

export default function Manager() {
  const { employeeds } = useGetAllEmployeed();
  const [objDetailEmplo, setObjDetailEmpl] = useState({});
  const [montoApertura, setMontoApertura] = useState(0.00);
  const [lstHistCajaChica, setLstHistCajaChica] = useState([]);
  const [employeedId, setEmployeedId] = useState(0);
  const {configs} = useGetAllConfigs();

  const handleChangeEmployeed = async (e, values) => {
    if (values === null) {
      return;
    }
    if (isNaN(values.label)) {
      let employeedIdSelect = (getValueInBrackets(values.label));
      setEmployeedId(employeedIdSelect);
      if (employeedIdSelect > 0) {
        let objEmplo = await ServiceDetailDataEmployeedCajaChica(employeedIdSelect, getDateNowWithFormat());
        setObjDetailEmpl(objEmplo);
        let lstHistCajaChicaConsult = await ServiceGetHistDetailCajaChicaByIdEmployeed(employeedIdSelect);
        setLstHistCajaChica(lstHistCajaChicaConsult)
      }
    }
  }
  const handleSaveApertuCajaChica = (e) => {
    if (!montoApertura || montoApertura === 0) {
      return;
    }
    let data = {
      montoAperturado: montoApertura,
      employeedCashId: employeedId,
      fechaApertu: getDateNowWithFormat()
    }
    Swal.fire({
      title: `¿Desea realizar la apertura de la caja del día ${getDateNowWithFormat()}?`,
      text: `Usted está realizando la apertura de la caja chica`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aperturar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let actualiza = await ServicePostApertuCajaChica(data);
        if (actualiza.ok) {
          await handleLoadData();
          Swal.fire(
            'Actualización exitosa',
            `La caja chica ha sido aperturada con éxito.`,
            'success'
          );
        }
      }
    })
  }
  const handleLoadData = async () => {
    let lstHistCajaChicaConsult = await ServiceGetHistDetailCajaChicaByIdEmployeed(employeedId);
    setLstHistCajaChica(lstHistCajaChicaConsult)
  }
  const handleChangeMontoApertura = (e) => {
    setMontoApertura(e.target.value);
  }
  const handleCloseCash = (e, row) => {
    if(getHoraActual() < configs.hora_fin_cierre_caja_chica) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `No puede cerrar caja, ya que es del día de hoy. La hora de cierre de ser mayor a las ${configs.hora_fin_cierre_caja_chica} PM. De ser un caso extremo, contactarse con el administrador del sistema, para que reconfigure la hora de cierre de caja chica programada.`,
      })
      return;
    }
    const { cajaChicaId } = row;
    let data = {
      cashRegisterDetailId: cajaChicaId
    };
    Swal.fire({
      title: `¿Desea realizar el cierre de la caja?`,
      text: `Usted está realizando el cierre de la caja chica`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let actualiza = await ServiceCloseCashRegisterById(data);
        if (actualiza) {
          await handleLoadData();
          Swal.fire(
            'Actualización exitosa',
            `La caja chica ha sido cerrada con éxito.`,
            'success'
          );
        }
      }
    })
  }
  return (
    <div className="container-fluid mb-1">
      <Title
        type={'h1'}
        value={`APERTURA DE CAJA CHICA`}
      />
      {
        objDetailEmplo.state !== undefined ?
          <Alert severity={`${objDetailEmplo?.isApertu === 1 ? 'success' : objDetailEmplo?.isApertu === 2 ? 'warning' : 'error'}`}>
            <AlertTitle>Advertencia</AlertTitle>
            {`${objDetailEmplo?.state}`} — <strong>{`${objDetailEmplo?.isApertu === 1 ? 'Conforme' : '¡Revisar!'}`}</strong>
          </Alert> : ''
      }
      <div className="row">
        <AutoCompleteTextField
          rows={employeeds}
          className="col-md-4 mt-3 mb-3"
          routImage="../images/avatars/"
          handleOnChange={handleChangeEmployeed}
        />
        <FormRegister
          objDetailEmplo={objDetailEmplo}
          handleSaveApertuCajaChica={handleSaveApertuCajaChica}
          handleChangeMontoApertura={handleChangeMontoApertura}
        />
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <SpanFormControl title="Histórico de aperturas" />
        </div>
        <div className="col-md-12">
          <List
            rows={lstHistCajaChica}
            handleCloseCash={handleCloseCash}
          />
        </div>
      </div>
    </div>
  )
}