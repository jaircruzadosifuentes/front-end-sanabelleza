import { EntityGetById } from 'src/utils/api-rest';
import { Uri_GetPersonByNroDocument } from 'src/api/person/api.person';

export async function ServiceGetPersonByNroDocument(nroDocument) {
  return await EntityGetById(Uri_GetPersonByNroDocument(nroDocument));
}
 
