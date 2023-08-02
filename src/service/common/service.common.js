import { EntityCreate, EntityGetAll, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetAllFrecuency, Uri_GetAllPayMethods, Uri_GetCountPatientsType, Uri_PostRegisterFrecuencyClinic, Uri_PutUpdateFrecuencyClinic } from '../../api/common/api.common';

export async function ServiceGetAllPayMethods() {
  return await EntityGetAll(Uri_GetAllPayMethods);
}
 
export async function ServiceGetCountPatientsType() {
  return await EntityGetAll(Uri_GetCountPatientsType);
}
export async function ServiceGetAllFrecuency() {
  return await EntityGetAll(Uri_GetAllFrecuency);
}
 
export async function ServicePostRegisterFrecuencyClinic(data) {
  return await EntityCreate(Uri_PostRegisterFrecuencyClinic, data);
}
export async function ServicePutUpdateFrecuencyClinic(data) {
  return await EntityUpdate(Uri_PutUpdateFrecuencyClinic, data);
}
 
