import React from "react";
import RechazoTemplate from '../../../components/template/paciente/rechazo/manager';
import { getTitle } from "src/utils/utils";

export default function RechazoLayout() {
  getTitle('Rechazo');
  return (
    <RechazoTemplate />
  )
}