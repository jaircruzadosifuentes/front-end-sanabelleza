import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SidebarLeft from "./sidebar-left";
import ChatMessage from "./chat-message";
import { useGetAllMessages, useGetAllUsersWithMessages } from "src/api/hooks/message/message-hooks";
import { fuDevolverDatosUsuario } from "src/utils/utils";
import TextSendMsg from "./text-send-msg";
import { ServiceGetMessageDetailUsersMessage, ServiceGetMessageForReceptorId, ServicePostInsertaMessage } from "src/service/message/service.message";

export default function Manager() {
  const params = useParams();
  const location = useLocation();
  const toIdParams = parseInt(params.id)
  const fromIdParams = parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`)
  const [content, setContent] = useState('');
  const fromTypeUser = `${JSON.parse(fuDevolverDatosUsuario()).typeUser}`
  const [objetoMessage, setObjetoMessage] = useState({});
  const [messageId, setMessageId] = useState(location?.state?.messageId);
  const [toIdFinally, setToIdFinally] = useState(toIdParams);
  const [fromIdFinally, setFromIdFinally] = useState(fromIdParams);
  const [result, setResult] = useState([]);
  const { users, setUsers } = useGetAllUsersWithMessages(fromIdFinally, fromTypeUser);
  const { messages, setMessages } = useGetAllMessages(toIdFinally, fromIdFinally, params.tipo.toUpperCase());

  const handleClickSendMsg = async (e) => {
    let data = {
      messageContent: content
      , toId: toIdFinally
      , fromId: fromIdFinally
      , typeUserTo: params.tipo.toUpperCase()
      , typeUserFrom: fromTypeUser
    }
    let inserta = await ServicePostInsertaMessage(data);
    if (inserta.ok) {
      await handleLoadMessages();
      document.getElementById('idTextBoxMessage').value = '';
    }
  }
  const handleLoadMessages = async (e) => {
    let listMessage = await ServiceGetMessageForReceptorId(toIdFinally, fromIdFinally, params.tipo.toUpperCase());
    setMessages(listMessage);
    let listUsers = await ServiceGetMessageDetailUsersMessage(fromIdFinally, fromTypeUser);
    setUsers(listUsers);
  }
  const handleChangeMsgContent = (e) => {
    setContent(e.target.value);
  }
  const handleKeyUpMsgContent = async(e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      await handleClickSendMsg()
    }
  }
  const handleClickItemMessage = async(e, row) => {
    setObjetoMessage(row);
    const { messageId, toId, fromId, typeUserTo } = row;
    setMessageId(messageId);
    setToIdFinally(toId);
    setFromIdFinally(fromId)
    let listMessage = await ServiceGetMessageForReceptorId(toId, fromId, typeUserTo);
    setMessages(listMessage);
  }
  const handleChangeSearchMsg = (e) => {
    let searchVal = e.target.value;
    const filterBySearch = users.filter((item) => {
      if (item.person?.surnames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  console.log(users);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ display: 'flex', overflow: 'auto', height: '660px', flexDirection: 'column' }}>
            <SidebarLeft
              users={result.length > 0 ? result: users}
              handleClickItemMessage={handleClickItemMessage}
              handleChangeSearchMsg={handleChangeSearchMsg}
              messageId={messageId}
              stateUserMark={location?.state?.userName}
            />
          </div>
          <div className="col-md-9" style={{ display: 'flex', overflow: 'auto', height: '650px', flexDirection: 'column-reverse' }}>
            <hr />
            <ChatMessage
              messages={messages}
              fromIdParams={fromIdParams}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9 mb-3 mt-3">
            <TextSendMsg
              title="Aa"
              handleClickSendMsg={handleClickSendMsg}
              handleChangeMsgContent={handleChangeMsgContent}
              handleKeyUpMsgContent={handleKeyUpMsgContent}
              autoFocus
              id="idTextBoxMessage"
            />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
}