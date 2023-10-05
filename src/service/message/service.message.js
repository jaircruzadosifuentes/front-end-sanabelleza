import { Uri_GetMessageDetailUsersMessage, Uri_GetMessageForReceptorId, Uri_GetMessagesForUserId, Uri_PostInsertaMessage } from 'src/api/message/api.message';
import { EntityCreate, EntityGetAll } from 'src/utils/api-rest';

export async function ServiceGetMessageForReceptorId(toId, fromId, typeUserTo) {
  return await EntityGetAll(Uri_GetMessageForReceptorId(toId, fromId, typeUserTo));
}
export async function ServiceGetMessageDetailUsersMessage(fromId, fromTyperUser) {
  return await EntityGetAll(Uri_GetMessageDetailUsersMessage(fromId, fromTyperUser));
}
export async function ServiceGetMessagesForUserId(fromId, typeFromUser) {
  return await EntityGetAll(Uri_GetMessagesForUserId(fromId, typeFromUser));
}
export async function ServicePostInsertaMessage(data) {
  return await EntityCreate(Uri_PostInsertaMessage, data);
}

 
