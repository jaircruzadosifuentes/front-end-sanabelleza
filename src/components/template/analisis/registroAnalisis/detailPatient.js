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
                  alt={objPatient.surNames}
                  src={`images/avatars/${objPatient?.profilePicture}`}
                  className="rounded float-righ"
                  title={`${objPatient.surNames}/${objPatient.names}`}
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
                defaultValue={objPatient.surNames}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-3"
                isLabel
                label="Nombres"
                defaultValue={objPatient.names}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Fecha Nacimiento"
                defaultValue={objPatient.birthDate}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-1"
                isLabel
                label="Edad"
                defaultValue={objPatient.age}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Nro Documento"
                defaultValue={objPatient.nroDocument}
                readOnly
              />
            </div>
            <br />
            <Label title={'EN ATENCIÓN POR'} isBold />
            <div className="row">
              <div className="col-md-4">
                <Label title={'Nombres y Apellidos'} /> <br />
                <span>{objPatient.employeed?.person?.surnames}/{objPatient.employeed?.person?.names}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Hora de Atención'} /> <br />
                <span>{objPatient.hourInitial}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Fecha Atención'} /> <br />
                <span>{objPatient.reservedDay}</span>
              </div>
              <div className="col-md-2">
                <Label title={'Tiempo Estimado'} /> <br />
                <span>{objPatient.timeInAttention} minutos.</span>
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