import { URI_DEV } from '../../config/config';

export const Uri_GetAllEmployeed = () => `${URI_DEV}/api/employeed`;
export const Uri_GetAllEmployeedPendingAproval = () => `${URI_DEV}/api/employeed/GetAllEmployeedPendingAproval`;
export const Uri_PostAccessSystem = (user, password) => `${URI_DEV}/api/employeed/PostAccessSystem/${user}/${password}`;
export const Uri_GetDisponibiltyEmployeed = (dateToConsult, employeedId) => `${URI_DEV}/api/employeed/${dateToConsult}/${employeedId}`;
export const Uri_PostRegisterEmployeed = `${URI_DEV}/api/employeed/PostRegisterEmployeed`;
export const Uri_PutAppproveContractEmployeed = `${URI_DEV}/api/employeed/PutAppproveContractEmployeed`;
export const Uri_GetByUserNameEmployeed = (userName) => `${URI_DEV}/api/employeed/GetByUserNameEmployeed/${userName}`;


