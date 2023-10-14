import React from "react";
import AccountingTemplate from '../../components/template/accounting/manager';
import { getTitle } from "src/utils/utils";

export default function AccountingLayout() {
  getTitle('Cierre de caja - cuadre de caja chica');
  return (
    <AccountingTemplate />
  )
}