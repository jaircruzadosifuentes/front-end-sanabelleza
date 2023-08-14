import { EntityCreate, EntityGetAll, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetAllFrecuency, Uri_GetAllPayMethods, Uri_GetCountPatientsType, Uri_GetInComboAfpSure, Uri_GetInComboModalityContract, Uri_GetInComboRole, Uri_GetInComboTypeOfContract, Uri_PostRegisterFrecuencyClinic, Uri_PutUpdateFrecuencyClinic } from '../../api/common/api.common';

export async function ServiceGetAllPayMethods() {
  return await EntityGetAll(Uri_GetAllPayMethods);
}
export async function ServiceGetInComboTypeOfContract() {
  return await EntityGetAll(Uri_GetInComboTypeOfContract);
}
export async function ServiceGetCountPatientsType() {
  return await EntityGetAll(Uri_GetCountPatientsType);
}
export async function ServiceGetInComboModalityContract() {
  return await EntityGetAll(Uri_GetInComboModalityContract);
}
export async function ServiceGetInComboAfpSure() {
  return await EntityGetAll(Uri_GetInComboAfpSure);
}
export async function ServiceGetInComboRole() {
  return await EntityGetAll(Uri_GetInComboRole);
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
 
