import React, { useState } from "react";
import { Title } from "src/components/atoms";
import List from "./list";
import { useGetAllPatientsNewAttentionByEmployeedId } from "./hooks";
import Filter from "./filter";
import { useNavigate } from "react-router-dom";

export default function Manager() {
  let navigate = useNavigate();
  const { listPatients } = useGetAllPatientsNewAttentionByEmployeedId(1);
  const [result, setResult] = useState([]);

  const handleSearchForSurNames = (e) => {
    let searchVal = '';
    searchVal = e.target.value;
    const filterBySearch = listPatients.filter((item) => {
      if (item.surNames.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleStartAnalyzing = (e, row) => {
    navigate("/registro-analisis", { state: { row } })
  }
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title
        type={'h1'}
        value={'LISTADO DE PACIENTES PARA SU PRIMER ANÁLISIS CLÍNICO'}
      />
      <Filter
        handleSearchForSurNames={handleSearchForSurNames}
      />
      <List
        rows={result.length > 0 ? result : listPatients}
        handleStartAnalyzing={handleStartAnalyzing}
      />
    </div>
  )
}