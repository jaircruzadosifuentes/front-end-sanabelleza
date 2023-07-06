import React from "react";
import { Label } from "src/components/atoms";
import PropTypes from 'prop-types';
import { InputFormControl } from "src/components/molecules";

export default function FormDetailPatient({
  objPatient = {}
}) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row ">
          <div className="col-md-4 text-center">
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
                  height={'330px'}
                  width={'275px'}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <Label title={'DATOS PRINCIPALES'} isBold />
            <div className="row">
              <InputFormControl
                type="text"
                autoFocus
                className="col-md-7"
                label="Nombres y Apellidos"
                isLabel
                defaultValue={`${objPatient.surNames}/${objPatient.names}`}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-2"
                isLabel
                label="Edad"
                defaultValue={objPatient.age}
                readOnly
              />
              <InputFormControl
                type="text"
                className="col-md-3"
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
              <div className="col-md-4">
                <Label title={'Hora de Atención'} /> <br />
                <span>{objPatient.hourInitial}</span>
              </div>
              <div className="col-md-4">
                <Label title={'Fecha Atención'} /> <br />
                <span>{objPatient.reservedDay}</span>
              </div>
            </div>
            <br />
            <Label title={'DATOS OPCIONALES'} isBold />
            <div className="row">
              <div className="col-md-4">
                <Label title={'Celular'} /> <br />
                <span>{objPatient?.cellPhone}</span>
              </div>
              <div className="col-md-6">
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
FormDetailPatient.propTypes = {
  objPatient: PropTypes.object,
};
