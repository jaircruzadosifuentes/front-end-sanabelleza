import { EntityCreate, EntityGetAll, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetAllEmployeed, Uri_GetAllEmployeedPendingAproval, Uri_GetByUserNameEmployeed, Uri_GetDisponibiltyEmployeed, Uri_PostAccessSystem, Uri_PostRegisterEmployeed, Uri_PutAppproveContractEmployeed } from '../../api/employeed/api.employeed';

export async function ServiceGetAllEmployeed() {
  return await EntityGetAll(Uri_GetAllEmployeed());
}
export async function ServiceGetAllEmployeedPendingAproval() {
  return await EntityGetAll(Uri_GetAllEmployeedPendingAproval());
}
export async function ServiceGetDisponibiltyEmployeed(date, id) {
  return await EntityGetAll(Uri_GetDisponibiltyEmployeed(date, id));
}
export async function ServicePostAccessSystem(user, password) {
  return await EntityGetAll(Uri_PostAccessSystem(user, password));
}
export async function ServiceGetByUserNameEmployeed(username) {
  return await EntityGetAll(Uri_GetByUserNameEmployeed(username));
}
export async function ServicePostRegisterEmployeed(data) {
  return await EntityCreate(Uri_PostRegisterEmployeed, data);
}
export async function ServicePutAppproveContractEmployeed(data) {
  return await EntityUpdate(Uri_PutAppproveContractEmployeed, data);
}
 
