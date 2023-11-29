import { URI_DEV } from '../../config/config';

export const Uri_GetPayments = `${URI_DEV}/api/Payment/GetPayments`;
export const Uri_PutUpdateDebtPayment = `${URI_DEV}/api/Payment/PutUpdateDebtPayment`;
export const Uri_GetDetailPayPendingGetByIdPayment = (paymentId) => `${URI_DEV}/api/Payment/GetDetailPayPendingGetByIdPayment/${paymentId}`;
export const Uri_GetPaymentsScheduleDetail = (paymentId) => `${URI_DEV}/api/Payment/GetPaymentsScheduleDetail/${paymentId}`;

