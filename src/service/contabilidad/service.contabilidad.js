import { GetDetailMovementsCajaChica, Uri_DetailDataEmployeedCajaChica, Uri_GetCajaChicaMontos, Uri_GetHistDetailCajaChicaByIdEmployeed, Uri_PostApertuCajaChica, Uri_PostCloseCajaChica, Uri_VerifyCajaChica } from 'src/api/contabilidad/api.contabilidad';
import { EntityCreate, EntityGetById } from 'src/utils/api-rest';

export async function ServiceGetCajaChicaMontos(dateOpened, employeedCashId) {
  return await EntityGetById(Uri_GetCajaChicaMontos(dateOpened, employeedCashId));
}
 
export async function ServiceGetDetailMovementsCajaChica(dateOpened, employeedCashId) {
  return await EntityGetById(GetDetailMovementsCajaChica(dateOpened, employeedCashId));
}
 
export async function ServiceVerifyCajaChica(dateOpened, employeedCashId) {
  return await EntityGetById(Uri_VerifyCajaChica(dateOpened, employeedCashId));
}
 
export async function ServiceDetailDataEmployeedCajaChica(employeedId, dateApertu) {
  return await EntityGetById(Uri_DetailDataEmployeedCajaChica(employeedId, dateApertu));
}
export async function ServiceGetHistDetailCajaChicaByIdEmployeed(employeedId) {
  return await EntityGetById(Uri_GetHistDetailCajaChicaByIdEmployeed(employeedId));
}
 
export async function ServicePostCloseCajaChica(data) {
  return await EntityCreate(Uri_PostCloseCajaChica, data);
}
 
export async function ServicePostApertuCajaChica(data) {
  return await EntityCreate(Uri_PostApertuCajaChica, data);
}
 
