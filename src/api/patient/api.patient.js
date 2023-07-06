import { URI_DEV } from '../../config/config';

export const Uri_GetAllPatientsWithSchedule = (hourInitial, hourFinished, fechaReserved, employeedId) => `${URI_DEV}/api/patient/${hourInitial}/${hourFinished}/${fechaReserved}/${employeedId}`;
export const Uri_GetAllPatientsPendApro= `${URI_DEV}/api/patient/GetAllPatientsPendApro`;
export const Uri_GetAllPatientsPatientWithAppoiment = `${URI_DEV}/api/patient/GetAllPatientsPatientWithAppoiment`;
export const Uri_GetAllPatientsInTreatment = `${URI_DEV}/api/patient/GetAllPatientsInTreatment`;
export const Uri_PutApprovePatientNew = (patientId, type) => `${URI_DEV}/api/patient/PutApprovePatientNew/${patientId}/${type}`;
export const Uri_PutApprovePatient = (patientId, type) => `${URI_DEV}/api/patient/PutApprovePatient/${patientId}/${type}`;
export const Uri_GetAlLPatientsNewAttentionByEmployeedId = (employeedId) => `${URI_DEV}/api/patient/GetAllPatientsNewAttentionByEmployeedId/${employeedId}`;
export const Uri_GetAllPatientsInPercentajeTreatment = (patientId) => `${URI_DEV}/api/patient/GetAllPatientsInPercentajeTreatment/${patientId}`;
export const Uri_GetAdvanceCliniciForPatientId = (patientId) => `${URI_DEV}/api/patient/GetAdvanceCliniciForPatientId/${patientId}`;
export const Uri_GetByIdPatientProgress = (patientId) => `${URI_DEV}/api/patient/GetByIdPatientProgress/${patientId}`;
export const Uri_PostRegistrProgressSesion = `${URI_DEV}/api/patient/PostRegistrProgressSesion`;
export const Uri_PutUpdateHourSesion = `${URI_DEV}/api/patient/PutUpdateHourSesion`;


 