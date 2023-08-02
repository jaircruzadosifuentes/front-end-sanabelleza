import { EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetAllEmployeed, Uri_GetDisponibiltyEmployeed, Uri_PostAccessSystem } from '../../api/employeed/api.employeed';

export async function ServiceGetAllEmployeed() {
  return await EntityGetAll(Uri_GetAllEmployeed());
}
export async function ServiceGetDisponibiltyEmployeed(date, id) {
  return await EntityGetAll(Uri_GetDisponibiltyEmployeed(date, id));
}
export async function ServicePostAccessSystem(user, password) {
  return await EntityGetAll(Uri_PostAccessSystem(user, password));
}
 
