import { Uri_GetAllMovementsSaleBuyOut } from 'src/api/movements/api-movements';
import { EntityGetAll } from 'src/utils/api-rest';

export async function ServiceGetAllMovementsSaleBuyOut() {
  return await EntityGetAll(Uri_GetAllMovementsSaleBuyOut);
}
