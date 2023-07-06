import React from "react";
import RegistroAnalisisTemplate from '../../../components/template/analisis/registroAnalisis/manager';
import { getTitle } from "src/utils/utils";

export default function RegistroAnalisisLayout() {
  getTitle('Registro por análisis');
  return (
    <RegistroAnalisisTemplate />
  )
}