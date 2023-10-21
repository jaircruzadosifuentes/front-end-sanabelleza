import { URI_DEV } from '../../config/config';

export const Uri_PostGenerateSchedule = `${URI_DEV}/api/Schedule/PostGenerateSchedule`;
export const Uri_GetAllSchedulePatient = (patientId) => `${URI_DEV}/api/Schedule/GetAllSchedulePatient/${patientId}`;
export const Uri_GetAllScheduleEmployeed = (employeedId) => `${URI_DEV}/api/Schedule/GetAllScheduleEmployeed/${employeedId}`;


