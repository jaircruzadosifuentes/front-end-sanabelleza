import React from "react";
import PagosTemplate from '../../components/template/pagos/manager';
import { getTitle } from "src/utils/utils";

export default function PagosLayout() {
  getTitle('Módulo de pagos');
  return (
    <PagosTemplate />
  )
}