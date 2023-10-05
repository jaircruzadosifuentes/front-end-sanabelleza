import React from "react";
import DashboardTemplate from '../../components/template/dashboard-paciente/manager';
import { getTitle } from "src/utils/utils";

export default function DashboardLayout() {
  getTitle('Menú principal del paciente');
  return (
    <DashboardTemplate />
  )
}