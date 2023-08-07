import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, SelectedFormControl } from "src/components/molecules";
import PropTypes from "prop-types";
import { convertDateTimeToDate, formatDecimales } from "src/utils/utils";

export default function FormPay({
  objetoPago,
  handleCloseModalPago,
  payMethods = [],
  handleChangePayMethod,
  haveConcept = false,
  handlePagarCuota,
  handleChangeConceptoPago
}) {
  return (
    <div className="container form-group">
      <Label title={'DETALLE DEL PAGO'} isBold />
      <div className="row">
        <div className="col-md-4" style={{ textAlign: 'left' }}>
          <span>Cuota: </span>
        </div>
        <div className="col-md-4">
          <span>{objetoPago.debtNumber}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={{ textAlign: 'left' }}>
          <span>Monto: </span>
        </div>
        <div className="col-md-4">
          <span>S/.{formatDecimales(objetoPago.amount)}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={{ textAlign: 'left' }}>
          <span>Fecha de pago: </span>
        </div>
        <div className="col-md-4">
          <span>{convertDateTimeToDate(objetoPago?.paymentDate)}</span>
        </div>
      </div>
      <Label title={'FORMA DE PAGO'} isBold />
      <div className="row">
        <div className="col-md-4 mt-4" style={{ textAlign: 'left' }}>
          <span>Método de pago: </span>
        </div>
        <SelectedFormControl
          className="col-md-4"
          placeHolder="Seleccione..."
          options={payMethods}
          handleChange={handleChangePayMethod}
        />
      </div>
      {
        haveConcept ?
          <div className="row">
            <div className="col-md-4 mt-4" style={{ textAlign: 'left' }}>
            </div>
            <InputFormControl
              type="text"
              className="col-md-4"
              isLabel
              label="Ingrese concepto"
              onChange={handleChangeConceptoPago}
            />
          </div> : ''
      }
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                onClick={handleCloseModalPago}
                type={2}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Pagar"
                color='btn btn-success'
                type={14}
                onClick={handlePagarCuota}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
FormPay.propTypes = {
  objetoPago: PropTypes.object,
  handleCloseModalPago: PropTypes.func,
  handleChangeConceptoPago: PropTypes.func,
  handleChangePayMethod: PropTypes.func,
  handlePagarCuota: PropTypes.func,
  payMethods: PropTypes.array,
  haveConcept: PropTypes.bool,
};