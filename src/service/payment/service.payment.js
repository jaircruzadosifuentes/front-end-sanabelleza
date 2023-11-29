import { EntityGetAll, EntityGetById, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetDetailPayPendingGetByIdPayment, Uri_GetPayments, Uri_GetPaymentsScheduleDetail, Uri_PutUpdateDebtPayment } from '../../api/payment/api.payment'

export async function ServiceGetPayments() {
  return await EntityGetAll(Uri_GetPayments);
}
export async function ServiceGetDetailPayPendingGetByIdPayment(paymentId) {
  return await EntityGetById(Uri_GetDetailPayPendingGetByIdPayment(paymentId));
}
export async function ServiceGetPaymentsScheduleDetail(paymentId) {
  return await EntityGetById(Uri_GetPaymentsScheduleDetail(paymentId));
}
export async function ServicePutUpdateDebtPayment(data) {
  return await EntityUpdate(Uri_PutUpdateDebtPayment, data);
}

