import { EntityCreate, EntityGetAll, EntityGetById } from 'src/utils/api-rest';
import { Uri_GetAllScheduleEmployeed, Uri_GetAllSchedulePatient, Uri_PostGenerateSchedule } from '../../api/schedule/api.schedule';

export async function ServicePostGenerateSchedule(data) {
  return await EntityCreate(Uri_PostGenerateSchedule, data);
}
 
export async function ServiceGetAllSchedulePatient(patientId) {
  return await EntityGetAll(Uri_GetAllSchedulePatient(patientId));
}
 
export async function ServiceGetAllScheduleEmployeed(employeedId) {
  return await EntityGetById(Uri_GetAllScheduleEmployeed(employeedId));
}
 
