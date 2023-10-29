import React, { useState } from "react";
import { Title } from "src/components/atoms";
import AutoCompleteTextField from "src/components/organism/autocomplete-text-field";
import { useGetAllEmployeed } from "../paciente/solicitud/hooks";
import FormRegister from "./form-register";
import List from "./list";
import { ServiceDetailDataEmployeedCajaChica, ServiceGetHistDetailCajaChicaByIdEmployeed, ServicePostApertuCajaChica } from "src/service/contabilidad/service.contabilidad";
import { getValueInBrackets } from "src/utils/utils";
import { getDateNowWithFormat } from "src/utils/functions";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SpanFormControl from "src/components/atoms/SpanFormControl";

export default function Manager() {
  const { employeeds } = useGetAllEmployeed();
  const [objDetailEmplo, setObjDetailEmpl] = useState({});
  const [montoApertura, setMontoApertura] = useState(0.00);
  const [lstHistCajaChica, setLstHistCajaChica] = useState([]);
  const [employeedId, setEmployeedId] = useState(0);

  const handleChangeEmployeed = async (e, values) => {
    if (values === null) {
      return;
    }
    if (isNaN(values.label)) {
      let employeedIdSelect = (getValueInBrackets(values.label));
      setEmployeedId(employeedIdSelect);
      if(employeedIdSelect > 0) {
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
    let objEmplo = await ServiceDetailDataEmployeedCajaChica(employeedId, getDateNowWithFormat());
    setObjDetailEmpl(objEmplo);
    let lstHistCajaChicaConsult = await ServiceGetHistDetailCajaChicaByIdEmployeed(employeedId);
    setLstHistCajaChica(lstHistCajaChicaConsult)
  }
  const handleChangeMontoApertura = (e) => {
    setMontoApertura(e.target.value);
  }
  return (
    <div className="container mb-1">
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
          className="col-md-5 mt-3 mb-3"
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
          />
        </div>
      </div>
    </div>
  )
}