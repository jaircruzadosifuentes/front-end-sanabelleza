import React from "react";
import EmployeedTemplate from '../../components/template/employeed/manager';
import { getTitle } from "src/utils/utils";

export default function EmployeedLayout() {
  getTitle('Módulo de Empleados');
  return (
    <EmployeedTemplate />
  )
}