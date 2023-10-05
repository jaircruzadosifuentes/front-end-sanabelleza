import { URI_DEV } from '../../config/config';

export const Uri_GetMessageForReceptorId = (toId, fromId, typeUserTo) => `${URI_DEV}/api/Message/GetMessageForReceptorId/${toId}/${fromId}/${typeUserTo}`;
export const Uri_GetMessageDetailUsersMessage = (fromId, fromTyperUser) => `${URI_DEV}/api/Message/GetMessageDetailUsersMessage/${fromId}/${fromTyperUser}`;
export const Uri_GetMessagesForUserId = (fromId, typeFromUser) => `${URI_DEV}/api/Message/GetMessagesForUserId/${fromId}/${typeFromUser}`;
export const Uri_PostInsertaMessage = `${URI_DEV}/api/Message/PostInsertaMessage`;

 