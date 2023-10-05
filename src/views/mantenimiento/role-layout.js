import React from "react";
import RolesTemplate from '../../components/template/mnt-roles/manager';
import { getTitle } from "src/utils/utils";

export default function RolesLayout() {
  getTitle('Mantenimiento de Roles');
  return (
    <RolesTemplate />
  )
}