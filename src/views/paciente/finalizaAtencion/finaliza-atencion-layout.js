import React from "react";
import FinalizaAtencionTemplate from '../../../components/template/paciente/finalizaAtencion/manager';
import { getTitle } from "src/utils/utils";

export default function FinalizaAtencionLayout() {
  getTitle('Finaliza Atención');
  return (
    <FinalizaAtencionTemplate />
  )
}