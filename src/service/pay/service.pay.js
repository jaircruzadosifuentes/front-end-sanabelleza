import { EntityCreate, EntityGetById } from 'src/utils/api-rest';
import { Uri_GetPayDueDetailForPatientId, Uri_PostInsertPaySolicitud } from '../../api/pay/api.pay'

export async function ServicePostInsertPaySolicitud(data) {
  return await EntityCreate(Uri_PostInsertPaySolicitud, data);
}
export async function ServiceGetPayDueDetailForPatientId(patientId) {
  return await EntityGetById(Uri_GetPayDueDetailForPatientId(patientId));
}

