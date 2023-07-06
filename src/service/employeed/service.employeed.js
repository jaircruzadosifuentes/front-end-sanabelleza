import { EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetAllEmployeed, Uri_GetDisponibiltyEmployeed } from '../../api/employeed/api.employeed';

export async function ServiceGetAllEmployeed() {
  return await EntityGetAll(Uri_GetAllEmployeed());
}
export async function ServiceGetDisponibiltyEmployeed(date, id) {
  return await EntityGetAll(Uri_GetDisponibiltyEmployeed(date, id));
}
 
