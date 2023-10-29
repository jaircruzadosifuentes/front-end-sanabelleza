import { URI_DEV } from '../../config/config';

export const Uri_GetCajaChicaMontos = (dateOpened, employeedCashId) => `${URI_DEV}/api/Contabilidad/GetCajaChicaMontos/${dateOpened}/${employeedCashId}`;
export const GetDetailMovementsCajaChica = (dateOpened, employeedCashId) => `${URI_DEV}/api/Contabilidad/GetDetailMovementsCajaChica/${dateOpened}/${employeedCashId}`;
export const Uri_VerifyCajaChica = (dateOpened, employeedCashId) => `${URI_DEV}/api/Contabilidad/VerifyCajaChica/${dateOpened}/${employeedCashId}`;
export const Uri_PostCloseCajaChica =  `${URI_DEV}/api/Contabilidad/PostCloseCajaChica`;
export const Uri_PostApertuCajaChica =  `${URI_DEV}/api/Contabilidad/PostApertuCajaChica`;
export const Uri_DetailDataEmployeedCajaChica = (employeedId, dateApertu) => `${URI_DEV}/api/Contabilidad/DetailDataEmployeedCajaChica/${employeedId}/${dateApertu}`;
export const Uri_GetHistDetailCajaChicaByIdEmployeed= (employeedId) => `${URI_DEV}/api/Contabilidad/GetHistDetailCajaChicaByIdEmployeed/${employeedId}`;

