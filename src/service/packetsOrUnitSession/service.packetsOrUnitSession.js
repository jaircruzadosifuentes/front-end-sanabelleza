import { EntityCreate, EntityGetAll, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetAllPacketsOrUnitSessions, Uri_PostRegisterPacketsOrUnitSessions, Uri_PutUpdatePacketsOrUnitSessions } from '../../api/packetsOrUnitSession/api.packetsOrUnitSession';

export async function ServiceGetAllPacketsOrUnitSessions() {
  return await EntityGetAll(Uri_GetAllPacketsOrUnitSessions);
}
export async function ServicePostRegisterPacketsOrUnitSessions(data) {
  return await EntityCreate(Uri_PostRegisterPacketsOrUnitSessions, data);
}
 
export async function ServicePutUpdatePacketsOrUnitSessions(data) {
  return await EntityUpdate(Uri_PutUpdatePacketsOrUnitSessions, data);
}
 
