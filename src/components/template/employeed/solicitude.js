import React from "react";
import { Title } from "src/components/atoms";
import SolicitudeForm from "./solicitude-form";

export default function Solicitude() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Title type={'h1'} value={'SOLICITUD DE REGISTRO'}  />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <SolicitudeForm />
        </div>
      </div>
    </div>
  )
}