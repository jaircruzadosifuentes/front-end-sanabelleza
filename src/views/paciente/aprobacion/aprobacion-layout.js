import React from "react";
import AprobacionTemplate from '../../../components/template/paciente/aprobacion/manager';
import { getTitle } from "src/utils/utils";

export default function AprobacionLayout() {
  getTitle('Aprobación y/o Rechazo');
  return (
    <AprobacionTemplate />
  )
}