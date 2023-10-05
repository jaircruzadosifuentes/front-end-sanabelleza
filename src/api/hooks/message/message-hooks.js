import { useEffect, useState } from "react";
import { ServiceGetMessageDetailUsersMessage, ServiceGetMessageForReceptorId, ServiceGetMessagesForUserId } from "src/service/message/service.message";

export const useGetAllMessages = (receptorId, sendingId, typeUserTo) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function getAllMessages() {
      let listMessage = await ServiceGetMessageForReceptorId(receptorId, sendingId, typeUserTo);
      setMessages(listMessage);
    }
    getAllMessages();
  }, [receptorId, sendingId, typeUserTo]);
  return {messages, setMessages}
}
export const useGetAllUsersWithMessages = (fromId, fromTyperUser) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getAllUsersWithMessages() {
      let listUsers = await ServiceGetMessageDetailUsersMessage(fromId, fromTyperUser);
      setUsers(listUsers);
    }
    getAllUsersWithMessages();
  }, [fromId, fromTyperUser]);
  return {users, setUsers}
}
export const useGetAllMsgForId = (fromId, typeFromUser) => {
  const [messagesForIdUser, setMessageForIdUser] = useState([]);
  useEffect(() => {
    async function getAllUsersWithMessages() {
      let listUsers = await ServiceGetMessagesForUserId(fromId, typeFromUser);
      setMessageForIdUser(listUsers);
    }
    getAllUsersWithMessages();
  }, [fromId, typeFromUser]);
  return {messagesForIdUser}
}