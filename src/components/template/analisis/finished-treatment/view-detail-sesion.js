
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ButtonFormControl, InputFormControl, TextAreaFormControl } from "src/components/molecules";
import { Label } from "src/components/atoms";
import { convertDateTimeToDate } from "src/utils/utils";

export default function ViewDetailSesion({
  objItemSesion = {},
  person = '',
  handleCloseModalItemSession
}) {
  console.log(person);
  return (
    <div className="container-fluid">
      <Label title={'DATOS DE LA PERSONA QUE ATENDIÓ ESTA CITA'} isBold isColor />
      <div className="row">
        <div className="col-md-4 mt-2">
          <Label title={'Fisioterapeuta'} /> <br />
          <span>
            {person}
          </span>
        </div>
        <div className="col-md-4 mt-2">
          <Label title={'Fecha y hora de la atención'} /> <br />
          <span>
            {convertDateTimeToDate(objItemSesion?.dateOfAttention)} - {objItemSesion?.hourOffAttention}
          </span>
        </div>
      </div>
      <div className="row mt-2 mb-2">
        <TextAreaFormControl
          type="text"
          autoFocus
          className="col-md-6"
          label="Recomendaciones"
          isLabel
          defaultValue={objItemSesion?.recommendation}
          readOnly
          rows={3}
        />
        <TextAreaFormControl
          type="text"
          autoFocus
          className="col-md-6"
          label="Observaciones"
          isLabel
          defaultValue={objItemSesion?.progressDescription}
          readOnly
          rows={3}
        />
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                type={2}
                onClick={handleCloseModalItemSession}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
ViewDetailSesion.propTypes = {
  objItemSesion: PropTypes.object,
  person: PropTypes.object,
  handleCloseModalItemSession: PropTypes.func,
};