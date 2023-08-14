import React from "react";
import List from "./list";
import { Title } from "src/components/atoms";
import { useGetAllPatientsInAttention, useGetAllPatientsInWaiting } from "src/api/hooks/patient/patient-hook";

export default function Manager(props) {
  const { patientsInWaiting } = useGetAllPatientsInWaiting(props);
  const { patientsInAttention } = useGetAllPatientsInAttention(props);
  return(
    <div className="container-fluid mt-1 mb-1">
      <div className="row">
        <div className="col-md-6 text-center">
          <Title value={'PACIENTES EN ESPERA'} type={'h1'} />
          <div className="row">
            <div className="col-md-12">
              <List rows={patientsInWaiting}/>
            </div>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <Title value={'PACIENTES EN ATENCIÓN'} type={'h1'} />
          <div className="row">
            <div className="col-md-12">
              <List rows={patientsInAttention}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}