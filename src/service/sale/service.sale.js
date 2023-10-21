import { EntityCreate } from 'src/utils/api-rest';
import { Uri_PostSaveSaleHead } from 'src/api/sale/api.sale';

export async function ServicePostSaveSaleHead(data) {
  return await EntityCreate(Uri_PostSaveSaleHead, data);
}
 
