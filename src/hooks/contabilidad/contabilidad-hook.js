import { useEffect, useState } from "react"
import { ServiceGetCajaChicaMontos, ServiceGetDetailMovementsCajaChica, ServiceVerifyCajaChica } from "src/service/contabilidad/service.contabilidad"

export const useGetAllMontosCajaChica = (dateOpened, employeedCashId) => {
  const [listMonto, setObjMonto] = useState([]);
  useEffect(() => {
    async function getAllMontosCajaChica() {
      let objMontoCajaChica = await ServiceGetCajaChicaMontos(dateOpened, employeedCashId);
      setObjMonto(objMontoCajaChica)
    }
    getAllMontosCajaChica();
  }, [dateOpened, employeedCashId]);
  return {listMonto}
}
export const useGetDetailMovementsCajaChica = (dateOpened, employeedCashId) => {
  const [listMontosCajaChica, setObjMontos] = useState([]);
  useEffect(() => {
    async function getAllMontosCajaChica() {
      let lstMontosCajaChica = await ServiceGetDetailMovementsCajaChica(dateOpened, employeedCashId);
      setObjMontos(lstMontosCajaChica)
    }
    getAllMontosCajaChica();
  }, [dateOpened, employeedCashId]);
  return {listMontosCajaChica}
}
export const useVerifyCajaChica = (dateOpened, employeedCashId) => {
  const [objCajaChica, setObjCajaChica] = useState({});
  useEffect(() => {
    async function getVerifyCajaChica() {
      let objCaja = await ServiceVerifyCajaChica(dateOpened, employeedCashId);
      setObjCajaChica(objCaja)
    }
    getVerifyCajaChica();
  }, [dateOpened, employeedCashId]);
  return {objCajaChica, setObjCajaChica}
}