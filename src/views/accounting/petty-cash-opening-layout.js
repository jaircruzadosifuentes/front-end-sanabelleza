import React from "react";
import PettyCashOpeningTemplate from '../../components/template/petty-cash-opening/manager';
import { getTitle } from "src/utils/utils";

export default function PettyCashOpeningLayout() {
  getTitle('Apertura de caja chica');
  return (
    <PettyCashOpeningTemplate />
  )
}