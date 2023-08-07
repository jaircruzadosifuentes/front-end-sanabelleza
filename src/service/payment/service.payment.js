import { EntityGetAll, EntityUpdate } from 'src/utils/api-rest';
import { Uri_GetPayments, Uri_PutUpdateDebtPayment } from '../../api/payment/api.payment'

export async function ServiceGetPayments() {
  return await EntityGetAll(Uri_GetPayments);
}

export async function ServicePutUpdateDebtPayment(data) {
  return await EntityUpdate(Uri_PutUpdateDebtPayment, data);
}

