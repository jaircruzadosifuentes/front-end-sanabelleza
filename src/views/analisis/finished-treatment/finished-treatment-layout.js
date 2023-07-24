import React from "react";
import FinishedTreatmentTemplate from '../../../components/template/analisis/finished-treatment/manager';
import { getTitle } from "src/utils/utils";

export default function FinishedTreatment() {
  getTitle('Tratamiento finalizado');
  return (
    <FinishedTreatmentTemplate />
  )
}