import React from "react";
import MessageTemplate from '../../components/template/messages/manager';
import { getTitle } from "src/utils/utils";

export default function MessageLayout() {
  getTitle('Mensaje');
  return (
    <MessageTemplate />
  )
}