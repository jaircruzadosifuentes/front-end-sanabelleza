import { EntityCreate, EntityGetAll, EntityGetById, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetAdvanceCliniciForPatientId, Uri_GetAlLPatientsNewAttentionByEmployeedId, Uri_GetAllPatientsFinishedTreatment, Uri_GetAllPatientsInAttention, Uri_GetAllPatientsInPercentajeTreatment, Uri_GetAllPatientsInTreatment, Uri_GetAllPatientsInWaiting, Uri_GetAllPatientsPatientWithAppoiment, Uri_GetAllPatientsPendApro, Uri_GetAllPatientsWithSchedule, Uri_GetByIdPatientProgress, Uri_GetHistoryForPatientId, Uri_GetItemSesionDetailById, Uri_PostRegistrProgressSesion, Uri_PutApprovePatient, Uri_PutApprovePatientNew, Uri_PutUpdateHourSesion } from '../../api/patient/api.patient';

export async function ServiceGetAllPatientsWithSchedule(hourInitial, hourFinished, dateReserved, employeedId) {
  return await EntityGetAll(Uri_GetAllPatientsWithSchedule(hourInitial, hourFinished, dateReserved, employeedId));
}
export async function ServiceGetAlLPatientsNewAttentionByEmployeedId(employeedId) {
  return await EntityGetAll(Uri_GetAlLPatientsNewAttentionByEmployeedId(employeedId));
}
export async function ServiceGetAllPatientsPendApro() {
  return await EntityGetAll(Uri_GetAllPatientsPendApro);
}
export async function ServiceGetAllPatientsPatientWithAppoiment() {
  return await EntityGetAll(Uri_GetAllPatientsPatientWithAppoiment);
}
export async function ServiceGetAllPatientsInTreatment() {
  return await EntityGetAll(Uri_GetAllPatientsInTreatment);
}
export async function ServiceGetAllPatientsFinishedTreatment() {
  return await EntityGetAll(Uri_GetAllPatientsFinishedTreatment);
}
export async function ServiceGetAllPatientsInWaiting() {
  return await EntityGetAll(Uri_GetAllPatientsInWaiting);
}
export async function ServiceGetAllPatientsInAttention() {
  return await EntityGetAll(Uri_GetAllPatientsInAttention);
}
export async function ServiceGetAllPatientsInPercentajeTreatment(patientId) {
  return await EntityGetById(Uri_GetAllPatientsInPercentajeTreatment(patientId));
}
export async function ServiceGetAdvanceCliniciForPatientId(patientId) {
  return await EntityGetById(Uri_GetAdvanceCliniciForPatientId(patientId));
}
export async function ServiceGetItemSesionDetailById(patientDetailSesionId) {
  return await EntityGetById(Uri_GetItemSesionDetailById(patientDetailSesionId));
}
export async function ServiceGetByIdPatientProgress(patientId) {
  return await EntityGetById(Uri_GetByIdPatientProgress(patientId));
}
export async function ServiceGetHistoryForPatientId(patientId, mostrarTodos) {
  return await EntityGetAll(Uri_GetHistoryForPatientId(patientId, mostrarTodos));
}
export async function ServicePutApprovePatientNew(patientId) {
  return await EntityUpdate(Uri_PutApprovePatientNew(patientId));
}
export async function ServicePutApprovePatient(patientId, type) {
  return await EntityUpdate(Uri_PutApprovePatient(patientId, type));
}
export async function ServicePutUpdateHourSesion(data) {
  return await EntityUpdate(Uri_PutUpdateHourSesion, data);
}
export async function ServicePostRegistrProgressSesion(data) {
  return await EntityCreate(Uri_PostRegistrProgressSesion, data);
}
 
