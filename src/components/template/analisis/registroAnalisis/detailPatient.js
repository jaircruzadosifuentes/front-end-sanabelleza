import React from "react";
import PropTypes from 'prop-types';
import { InputFormControl } from "src/components/molecules";
import { Label } from "src/components/atoms";

export default function Form({
  objPatient = {}
}) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row ">
          <div className="col-md-3 text-center">
            <div className="row">
              <div className="col-md-12">
                <Label title={'[FOTO DEL PACIENTE]'} isBold isTextAlign textAlign="center" />
              </div>
              <div className="col-md-12">
                <img
                  alt={objPatient?.person?.surnames}
                  src={`images/avatars/${objPatient?.person?.profilePicture}`}
                  className="rounded float-righ"
                  title={`${objPatient?.person?.surnames}/${objPatient?.person?.names}`}
                  height={'320px'}
                  width={'275px'}
                />
              </div>
            </div>
          </div>
          <div className="col-md-9 mt-2">
            <Label title={'DATOS PRINCIPALES'} isBold />
            <div className="row">
              <InputFormControl
                type="text"
                autoFocus
                className="col-md-4"
                label="Apellidos"
                isLabel
                defaultValue={objPatient?.person?.surnames}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-3"
                isLabel
                label="Nombres"
                defaultValue={objPatient?.person?.names}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Fecha Nacimiento"
                defaultValue={objPatient?.person?.birthDate}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-1"
                isLabel
                label="Edad"
                defaultValue={objPatient?.person?.age}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Nro Documento"
                defaultValue={objPatient?.person?.personDocument?.nroDocument}
                readOnly
              />
            </div>
            <br />
            <Label title={'EN ATENCIÓN POR'} isBold />
            <div className="row">
              <div className="col-md-4">
                <Label title={'Nombres y Apellidos'} /> <br />
                <span>{objPatient?.patientSolicitude?.employeed?.person?.surnames}/{objPatient?.patientSolicitude?.employeed?.person?.names}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Hora de Atención'} /> <br />
                <span>{objPatient?.patientSolicitude?.hourAttention}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Fecha Atención'} /> <br />
                <span>{objPatient?.patientSolicitude?.dateAttention}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Tiempo Estimado'} /> <br />
                <span>{objPatient?.patientSolicitude?.timeAttention} minutos.</span>
              </div>
            </div>
            <br />
            <Label title={'DATOS OPCIONALES'} isBold />
            <div className="row">
              <div className="col-md-4">
                <Label title={'Celular'} /> <br />
                <span>{objPatient?.cellPhone}</span>
              </div>
              <div className="col-md-4">
                <Label title={'Email'} /> <br />
                <span>{objPatient?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  )
}
Form.propTypes = {
  objPatient: PropTypes.object,
};