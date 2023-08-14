import React from "react";
import EmployeedAprobacionTemplate from '../../components/template/employeed/aprobacion/manager';
import { getTitle } from "src/utils/utils";

export default function EmployeedAprobacionLayout() {
  getTitle('Aprobación de Contratos');
  return (
    <EmployeedAprobacionTemplate />
  )
}