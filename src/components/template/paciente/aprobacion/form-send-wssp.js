import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function FormSendWssp({
  handleSendMessWssp,
  handleChangeCellPhone,
  handleChangeMessageWssp,
  cellphone = '',
  handleCloseModalWssp
}) {
  return (
    <div className="form-group">
      <Label title={'CUERPO DEL MENSAJE'} isBold />
      <div className="row">
        <InputFormControl
          type="text"
          className="col-md-2"
          isLabel
          label="Código"
          readOnly
          defaultValue="+51"
        />
        <InputFormControl
          type="text"
          className="col-md-10"
          isLabel
          label="Celular"
          onChange={handleChangeCellPhone}
          defaultValue={cellphone}
        />
      </div>
      <div className="row">
        <TextAreaFormControl
          type="text"
          className="col-md-12"
          label="Mensaje"
          onChange={handleChangeMessageWssp}
          isLabel
          autoFocus
          rows={3}
        />
      </div>
      <hr />
      <div className="col-md-12">
        <div className="btn-toolbar" style={{ float: 'right' }}>
          <div className="btn-group">
            <ButtonFormControl
              title="Salir"
              color='btn btn-danger'
              type={2}
              onClick={handleCloseModalWssp}
            />
          </div>&nbsp;
        </div>
        <div className="btn-toolbar">
          <div className="btn-group">
            <ButtonFormControl
              title="Enviar"
              color='btn btn-success'
              type={11}
              onClick={handleSendMessWssp}
            />
          </div>&nbsp;
        </div>
      </div>
    </div>
  )
}
FormSendWssp.propTypes = {
  cellphone: PropTypes.string,
  handleCloseModalWssp: PropTypes.func,
  handleChangeMessageWssp: PropTypes.func,
  handleChangeCellPhone: PropTypes.func,
  handleClickAprobarSolicitud: PropTypes.func,
  handleSendMessWssp: PropTypes.func,
};