import { EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetAllPayMethods, Uri_GetCountPatientsType } from '../../api/common/api.common';

export async function ServiceGetAllPayMethods() {
  return await EntityGetAll(Uri_GetAllPayMethods);
}
 
export async function ServiceGetCountPatientsType() {
  return await EntityGetAll(Uri_GetCountPatientsType);
}
 
