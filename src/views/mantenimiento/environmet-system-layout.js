import React from "react";
import EnvironmentTemplate from '../../components/template/mnt-environment-system/manager';
import { getTitle } from "src/utils/utils";

export default function EnvironmentLayout() {
  getTitle('Mantenimiento de variables del sistema');
  return (
    <EnvironmentTemplate />
  )
}