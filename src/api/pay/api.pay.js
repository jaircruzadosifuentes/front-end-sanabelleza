import { URI_DEV } from '../../config/config';

export const Uri_PostInsertPaySolicitud = `${URI_DEV}/api/Pay/PostInsertPaySolicitud`;
export const Uri_GetPayDueDetailForPatientId = (patientId) => `${URI_DEV}/api/Pay/GetPayDueDetailForPatientId/${patientId}`;

