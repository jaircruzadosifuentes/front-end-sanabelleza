import React from "react";
import EmployeedSolicitudeTemplate from '../../components/template/employeed/solicitude';
import { getTitle } from "src/utils/utils";

export default function EmployeedSolicitudeLayout() {
  getTitle('Registro de un nuevo empleado');
  return (
    <EmployeedSolicitudeTemplate />
  )
}