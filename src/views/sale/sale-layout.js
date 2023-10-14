import React from "react";
import SaleTemplate from '../../components/template/sale/manager';
import { getTitle } from "src/utils/utils";

export default function SaleLayout() {
  getTitle('Módulo de ventas y compras');
  return (
    <SaleTemplate />
  )
}