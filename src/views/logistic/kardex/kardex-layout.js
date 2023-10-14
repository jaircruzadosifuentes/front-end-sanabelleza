import React from "react";
import LogisticKardexTemplate from '../../../components/template/logistic/kardex/manager';
import { getTitle } from "src/utils/utils";

export default function LogisticKardexLayout() {
  getTitle('Kardex');
  return (
    <LogisticKardexTemplate />
  )
}