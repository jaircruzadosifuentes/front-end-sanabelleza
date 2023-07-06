import React from "react";
import SolicitudTemplate from '../../../components/template/paciente/solicitud/manager';
import { getTitle } from "src/utils/utils";

export default function SolicitudLayout() {
  getTitle('Solicitud de atención');
  return (
    <SolicitudTemplate />
  )
}