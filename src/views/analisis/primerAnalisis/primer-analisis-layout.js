import React from "react";
import PrimerAnalisisTemplate from '../../../components/template/analisis/primerAnalisis/manager';
import { getTitle } from "src/utils/utils";

export default function PendientesAnalisisLayout() {
  getTitle('Primer análisis clínico');
  return (
    <PrimerAnalisisTemplate />
  )
}