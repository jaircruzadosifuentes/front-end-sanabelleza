import React, { useEffect, useState } from "react";
import { Title } from "src/components/atoms";
import CardAmountDetail from "./card-amount-detail";
import { ButtonFormControl } from "src/components/molecules";
import List from "./list";
import { useGetAllMontosCajaChica, useGetDetailMovementsCajaChica, useVerifyCajaChica } from "src/hooks/contabilidad/contabilidad-hook";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ServicePostCloseCajaChica, ServiceVerifyCajaChica } from "src/service/contabilidad/service.contabilidad";
import { employeedCashRegisterId, getDateNowWithFormat, getHoraActual } from "src/utils/functions";
import { useGetAllConfigs } from "src/hooks/common/common-hook";
import { getDateNow } from "src/utils/utils";

export default function Manager() {
  const [fecha, setFecha] = useState(getDateNowWithFormat());
  const {configs} = useGetAllConfigs();
  const { listMontosCajaChica } = useGetDetailMovementsCajaChica(fecha, employeedCashRegisterId());
  const { objCajaChica, setObjCajaChica } = useVerifyCajaChica(fecha, employeedCashRegisterId());
  const { listMonto } = useGetAllMontosCajaChica(fecha, employeedCashRegisterId());
  const [isApertu, setIsApertu] = useState(0);
  const [cardId, setCardId] = useState(2);

  useEffect(() => {
    setIsApertu(objCajaChica.isApertu);
    setFecha(getDateNowWithFormat());
  }, [objCajaChica.isApertu]);

  const handleChangeSelectCardType = (_, p) => {
    setCardId(p.cajaChicaMontosId);
  }
  const handleChangeCloseCajaChica = (_) => {
    let objMonto= {};
    listMonto.map(m => {
      objMonto[m.description.replace(" ", "_")] = m.amount;
      return m;
    });
    let data = {
      montoAperturado: objMonto.MONTO_APERTURADO,
      montoVendido: objMonto.MONTO_VENDIDO,
      montoEgreso: objMonto.MONTO_EGRESO,
      montoEsperado: objMonto.MONTO_ESPERADO,
      fechaCierre: fecha,
      employeedCashId: employeedCashRegisterId() 
    };
    if(getHoraActual() < configs.hora_fin_cierre_caja_chica) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: `No puede cerrar caja, la hora de cierre de ser mayor a las ${configs.hora_fin_cierre_caja_chica} PM. De ser un caso extremo, contactarse con el administrador del sistema, para que reconfigure la hora de cierre de caja chica programada.`,
      })
      return;
    }
    Swal.fire({
      title: '¿Desea cerrar la caja chica?',
      text: `¿Usted está seguro de cerrar la caja chica?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = await ServicePostCloseCajaChica(data);
        if (insert.ok) {
          await getVerifyCajaChica(fecha, employeedCashRegisterId());
          Swal.fire(
            'Cierre exitoso',
            'La caja chica se ha cerrado con éxito',
            'success'
          )
        } 
      }
    })
  }
  async function getVerifyCajaChica(dateOpened, employeedCashId) {
    let objCaja = await ServiceVerifyCajaChica(dateOpened, employeedCashId);
    setObjCajaChica(objCaja)
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <Title type={'h1'} value={'CUADRE DE CAJA CHICA'} />
        </div>
        <div className="col-md-3 text-center">
          <h3>Fecha actual: {fecha}</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10">
          <CardAmountDetail
            rows={listMonto}
            cardId={cardId}
            handleChangeSelectCardType={handleChangeSelectCardType}
          />
        </div>
        <div className="col-md-2">
          <div className="row mt-2">
            <div className="col-md-12 text-center">
              <ButtonFormControl
                title={objCajaChica.messageState}
                disabled={isApertu !== 0}
                color={`${isApertu === 2? 'btn btn-danger mt-1 mb-1': isApertu === 0? 'btn btn-success mt-1 mb-1': 'btn btn-warning mt-1 mb-1'}`}
                type={`${isApertu !== 1? 18: 17}`}
                onClick={handleChangeCloseCajaChica}
              />
            </div>
            <div className="col-md-12 text-center">
              <ButtonFormControl
                title="Imprimir detalle"
                color='btn btn-primary mt-1 mb-1'
                type={10}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <List 
            rows={listMontosCajaChica}
          />
        </div>  
      </div>
    </div>
  )
}