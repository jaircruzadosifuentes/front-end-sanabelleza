import { EntityCreate, EntityGetAll, EntityGetById, EntityUpdate } from 'src/utils/api-rest';
import { Uri_AddOptionEmployeed, Uri_GetAllConfigs, Uri_GetAllFrecuency, Uri_GetAllPayMethods, Uri_GetAreasInSelect, Uri_GetCategoriesInSelect, Uri_GetCountPatientsType, Uri_GetInComboAfpSure, Uri_GetInComboModalityContract, Uri_GetInComboRole, Uri_GetInComboTypeOfContract, Uri_GetInSelectVoucherDocument, Uri_GetOptions, Uri_GetOptionsByCodeEmployeed, Uri_GetOptionsGeneral, Uri_GetOptionsItemGeneral, Uri_GetOptionsItemsByCodeEmployeed, Uri_GetReportMensualCategoryTTO, Uri_GetRoles, Uri_GetRoutes, Uri_GetRoutesSpecial, Uri_GetSubCategoriesInSelect, Uri_PostRegisterFrecuencyClinic, Uri_PostRegisterRole, Uri_PutAddOptionFather, Uri_PutConfig, Uri_PutDisabledEnabledRole, Uri_PutRemoveAddOptionEmployeed, Uri_PutRole, Uri_PutUpdateFrecuencyClinic, Uri_VerifyPatientByFullName } from '../../api/common/api.common';

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
export async function ServiceGetOptionsGeneral() {
  return await EntityGetAll(Uri_GetOptionsGeneral);
}
export async function ServiceGetAllConfigs() {
  return await EntityGetAll(Uri_GetAllConfigs);
}
export async function ServiceGetCategoriesInSelect() {
  return await EntityGetAll(Uri_GetCategoriesInSelect);
}
export async function ServiceGetOptionsItemGeneral() {
  return await EntityGetAll(Uri_GetOptionsItemGeneral);
}
export async function ServiceGetInSelectVoucherDocument() {
  return await EntityGetAll(Uri_GetInSelectVoucherDocument);
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
export async function ServicePutConfig(data) {
  return await EntityUpdate(Uri_PutConfig, data);
}
export async function ServiceGetOptions(employeedId) {
  return await EntityGetById(Uri_GetOptions(employeedId));
}
export async function ServiceGetRoutesSpecial(userAccess) {
  return await EntityGetById(Uri_GetRoutesSpecial(userAccess));
}
export async function ServiceGetRoutes(employeedId) {
  return await EntityGetById(Uri_GetRoutes(employeedId));
}
export async function ServiceGetSubCategoriesInSelect(categoryId) {
  return await EntityGetById(Uri_GetSubCategoriesInSelect(categoryId));
}
export async function ServiceGetOptionsByCodeEmployeed(code) {
  return await EntityGetById(Uri_GetOptionsByCodeEmployeed(code));
}
export async function ServiceGetOptionsItemsByCodeEmployeed(code) {
  return await EntityGetById(Uri_GetOptionsItemsByCodeEmployeed(code));
}
export async function ServiceVerifyPatientByFullName(surnames, names) {
  return await EntityGetById(Uri_VerifyPatientByFullName(surnames, names));
}
export async function ServicePutRemoveAddOptionEmployeed(optionItemId) {
  return await EntityUpdate(Uri_PutRemoveAddOptionEmployeed(optionItemId));
}
export async function ServiceAddOptionEmployeed(optionItemId, optionId, code) {
  return await EntityUpdate(Uri_AddOptionEmployeed(optionItemId, optionId, code));
}
export async function ServicePutAddOptionFather(codeEmployeed, optionId) {
  return await EntityCreate(Uri_PutAddOptionFather(codeEmployeed, optionId));
}