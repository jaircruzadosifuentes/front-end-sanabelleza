import { URI_DEV } from '../../config/config';

export const Uri_GetAllPayMethods = `${URI_DEV}/api/Common/GetAllPayMethods`;
export const Uri_GetCountPatientsType = `${URI_DEV}/api/Common/GetCountPatientsType`;
export const Uri_PostRegisterFrecuencyClinic = `${URI_DEV}/api/Common/PostRegisterFrecuencyClinic`;
export const Uri_PutUpdateFrecuencyClinic = `${URI_DEV}/api/Common/PutUpdateFrecuencyClinic`;
export const Uri_GetAllFrecuency = `${URI_DEV}/api/Common/GetAllFrecuency`;
export const Uri_GetInComboTypeOfContract = `${URI_DEV}/api/Common/GetInComboTypeOfContract`;
export const Uri_GetInComboModalityContract = `${URI_DEV}/api/Common/GetInComboModalityContract`;
export const Uri_GetInComboRole = `${URI_DEV}/api/Common/GetInComboRole`;
export const Uri_GetInComboAfpSure = `${URI_DEV}/api/Common/GetInComboAfpSure`;
export const Uri_GetRoles = `${URI_DEV}/api/Common/GetRoles`;
export const Uri_GetAreasInSelect = `${URI_DEV}/api/Common/GetAreasInSelect`;
export const Uri_PostRegisterRole = `${URI_DEV}/api/Common/PostRegisterRole`;
export const Uri_PutRole = `${URI_DEV}/api/Common/PutRole`;
export const Uri_PutDisabledEnabledRole = (roleId, type) => `${URI_DEV}/api/Common/PutDisabledEnabledRole/${roleId}/${type}`;
export const Uri_GetReportMensualCategoryTTO = `${URI_DEV}/api/Common/GetReportMensualCategoryTTO`;

export const Uri_GetOptions = (employeedId) => `${URI_DEV}/api/Common/GetOptions/${employeedId}`;
export const Uri_GetRoutes = (employeedId) => `${URI_DEV}/api/Common/GetRoutes/${employeedId}`;

