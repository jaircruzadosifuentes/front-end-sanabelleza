import React from "react";
import VentanillaTemplate from '../../components/template/ventanilla/manager';
import { getTitle } from "src/utils/utils";

export default function VentanillaLayout() {
  getTitle('Pacientes en cola');
  return (
    <VentanillaTemplate />
  )
}