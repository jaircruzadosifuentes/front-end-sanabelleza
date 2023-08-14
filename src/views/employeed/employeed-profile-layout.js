import React from "react";
import EmployeedProfileTemplate from '../../components/template/profile/manager';
import { getTitle } from "src/utils/utils";

export default function EmployeedProfileLayout() {
  getTitle('Perfil');
  return (
    <EmployeedProfileTemplate />
  )
}