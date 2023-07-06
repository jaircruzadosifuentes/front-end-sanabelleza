import { EntityCreate, EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetAllPatientsClinicalCareEnds, Uri_PostRegisterFirstClinicalAnalysis, Uri_PostRegistrSolicitudAttention } from '../../api/solicitudAttention/api.solicitudAttention';

export async function ServicePostRegistrSolicitudAttention(postAttention) {
  return await EntityCreate(Uri_PostRegistrSolicitudAttention, postAttention);
}
export async function ServiceGetAllPatientsClinicalCareEnds() {
  return await EntityGetAll(Uri_GetAllPatientsClinicalCareEnds);
}
export async function ServicePostRegisterFirstClinicalAnalysis(firstRegister) {
  return await EntityCreate(Uri_PostRegisterFirstClinicalAnalysis, firstRegister);
}
 
