import { EntityGetAll } from 'src/utils/api-rest';
import { Uri_GetAllDocuments } from '../../api/document/api.document';

export async function ServiceGetAllDocuments() {
  return await EntityGetAll(Uri_GetAllDocuments());
}
 
