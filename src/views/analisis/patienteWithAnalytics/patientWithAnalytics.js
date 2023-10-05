import React from "react";
import PatientsWithAnalyticsTemplate from '../../../components/template/analisis/patientsWithAnalytics/manager';
import { getTitle } from "src/utils/utils";

export default function PatientsWithAnalyticsLayout() {
  getTitle('Pacientes en tratamiento clínico');
  return (
    <PatientsWithAnalyticsTemplate />
  )
}