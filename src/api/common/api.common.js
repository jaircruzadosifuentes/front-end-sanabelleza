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
export const Uri_GetOptionsGeneral = `${URI_DEV}/api/Common/GetOptionsGeneral`;
export const Uri_GetOptionsItemGeneral = `${URI_DEV}/api/Common/GetOptionsItemGeneral`;
export const Uri_GetInSelectVoucherDocument = `${URI_DEV}/api/Common/GetInSelectVoucherDocument`;
export const Uri_GetAllConfigs = `${URI_DEV}/api/Common/GetAllConfigs`;
export const Uri_PutConfig= `${URI_DEV}/api/Common/PutConfig`;
export const Uri_GetRoutesSpecial = (userAccess) => `${URI_DEV}/api/Common/GetRoutesSpecial/${userAccess}`;

export const Uri_GetOptionsItemsByCodeEmployeed = (code) => `${URI_DEV}/api/Common/GetOptionsItemsByCodeEmployeed/${code}`;
export const Uri_GetOptionsByCodeEmployeed = (code) => `${URI_DEV}/api/Common/GetOptionsByCodeEmployeed/${code}`;
export const Uri_PutRemoveAddOptionEmployeed = (optionItemId) => `${URI_DEV}/api/Common/PutRemoveAddOptionEmployeed/${optionItemId}`;
export const Uri_AddOptionEmployeed = (optionItemId, optionId, code) => `${URI_DEV}/api/Common/PutAddOptionEmployeed/${optionItemId}/${optionId}/${code}`;
export const Uri_PutAddOptionFather = (codeEmployeed, optionId) => `${URI_DEV}/api/Common/PutAddOptionFather/${codeEmployeed}/${optionId}`;
export const Uri_VerifyPatientByFullName = (surnames, names) => `${URI_DEV}/api/Common/VerifyPatientByFullName/${surnames}/${names}`;
