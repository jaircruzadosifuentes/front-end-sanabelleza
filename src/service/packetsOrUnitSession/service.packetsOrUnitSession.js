import { EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetAllPacketsOrUnitSessions } from '../../api/packetsOrUnitSession/api.packetsOrUnitSession';

export async function ServiceGetAllPacketsOrUnitSessions() {
  return await EntityGetAll(Uri_GetAllPacketsOrUnitSessions);
}
 
