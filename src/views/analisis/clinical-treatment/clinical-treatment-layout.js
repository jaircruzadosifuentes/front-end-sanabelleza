import React from "react";
import ClinicalTreatmentLayout from '../../../components/template/analisis/clinical-treatment/manager';
import { getTitle } from "src/utils/utils";

export default function ClinicalTreatmentTemplate() {
  getTitle('Tratamiento Clínico');
  return (
    <ClinicalTreatmentLayout />
  )
}