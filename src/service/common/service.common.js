import { EntityCreate, EntityGetAll, EntityGetById, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetAllFrecuency, Uri_GetAllPayMethods, Uri_GetAreasInSelect, Uri_GetCountPatientsType, Uri_GetInComboAfpSure, Uri_GetInComboModalityContract, Uri_GetInComboRole, Uri_GetInComboTypeOfContract, Uri_GetOptions, Uri_GetReportMensualCategoryTTO, Uri_GetRoles, Uri_GetRoutes, Uri_PostRegisterFrecuencyClinic, Uri_PostRegisterRole, Uri_PutDisabledEnabledRole, Uri_PutRole, Uri_PutUpdateFrecuencyClinic } from '../../api/common/api.common';

export async function ServiceGetAllPayMethods() {
  return await EntityGetAll(Uri_GetAllPayMethods);
}
export async function ServiceGetInComboTypeOfContract() {
  return await EntityGetAll(Uri_GetInComboTypeOfContract);
}
export async function ServiceGetCountPatientsType() {
  return await EntityGetAll(Uri_GetCountPatientsType);
}
export async function ServiceGetRoles() {
  return await EntityGetAll(Uri_GetRoles);
}
export async function ServiceGetAreasInSelect() {
  return await EntityGetAll(Uri_GetAreasInSelect);
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
export async function ServiceGetReportMensualCategoryTTO() {
  return await EntityGetAll(Uri_GetReportMensualCategoryTTO);
}
export async function ServicePostRegisterFrecuencyClinic(data) {
  return await EntityCreate(Uri_PostRegisterFrecuencyClinic, data);
}
export async function ServicePostRegisterRole(data) {
  return await EntityCreate(Uri_PostRegisterRole, data);
}
export async function ServicePutUpdateFrecuencyClinic(data) {
  return await EntityUpdate(Uri_PutUpdateFrecuencyClinic, data);
}
export async function ServicePutDisabledEnabledRole(roleId, type) {
  return await EntityUpdate(Uri_PutDisabledEnabledRole(roleId, type));
}
export async function ServicePutRole(data) {
  return await EntityUpdate(Uri_PutRole, data);
}
export async function ServiceGetOptions(employeedId) {
  return await EntityGetById(Uri_GetOptions(employeedId));
}
export async function ServiceGetRoutes(employeedId) {
  return await EntityGetById(Uri_GetRoutes(employeedId));
}
