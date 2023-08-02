import { EntityCreate, EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetPacientesConPrimeraAtencionClinica, Uri_GetPatientsSolicitudeInDraft, Uri_PostRegisterFirstClinicalAnalysis, Uri_PostRegistrSolicitudAttention } from '../../api/solicitudAttention/api.solicitudAttention';

export async function ServicePostRegistrSolicitudAttention(postAttention) {
  return await EntityCreate(Uri_PostRegistrSolicitudAttention, postAttention);
}
export async function ServiceGetPacientesConPrimeraAtencionClinica() {
  return await EntityGetAll(Uri_GetPacientesConPrimeraAtencionClinica);
}
export async function ServiceGetPatientsSolicitudeInDraft() {
  return await EntityGetAll(Uri_GetPatientsSolicitudeInDraft);
}
export async function ServicePostRegisterFirstClinicalAnalysis(firstRegister) {
  return await EntityCreate(Uri_PostRegisterFirstClinicalAnalysis, firstRegister);
}
 
