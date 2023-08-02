import { URI_DEV } from '../../config/config';

export const Uri_GetAllEmployeed = () => `${URI_DEV}/api/employeed`;
export const Uri_PostAccessSystem = (user, password) => `${URI_DEV}/api/employeed/PostAccessSystem/${user}/${password}`;
export const Uri_GetDisponibiltyEmployeed = (dateToConsult, employeedId) => `${URI_DEV}/api/employeed/${dateToConsult}/${employeedId}`;


