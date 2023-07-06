import React from "react";
import PaquetesTemplate from '../../../components/template/mnt-paquetes/manager';
import { getTitle } from "src/utils/utils";

export default function PaquetesLayout() {
  getTitle('Mantenimiento de Paquetes');
  return (
    <PaquetesTemplate />
  )
}