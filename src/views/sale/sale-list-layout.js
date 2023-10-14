import React from "react";
import SaleListTemplate from '../../components/template/sale-list/manager';
import { getTitle } from "src/utils/utils";

export default function SaleListLayout() {
  getTitle('Listado de ventas y compras');
  return (
    <SaleListTemplate />
  )
}