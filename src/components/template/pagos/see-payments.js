import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, SelectedFormControl } from "src/components/molecules";
import PropTypes from "prop-types";
import { convertDateTimeToDate, formatDecimales } from "src/utils/utils";
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import SeePaymentsList from "./see-payments-list";

export default function SeePayments({
  objetoPago,
  handleCloseModalPago,
  payMethods = [],
  handleChangePayMethod,
  haveConcept = false,
  handlePagarCuota,
  handleChangeConceptoPago,
  handleChangeMontoEfectivo,
  vuelto = 0.00,
  payMethodId = 0,
  debtNumberFlagMax = false,
  vouchers = [],
  handleChangeTipoDocumento,
  selectedValue = '',
  handleChangeRadioButton,
  listDetailPayments = [],
  handleMakePay
}) {
  return (
    <div className="container-fluid">
      {
        debtNumberFlagMax ?
          <div className="row mt-3 mb-3">
            <Alert variant="filled" severity="warning">
              Ésta es su última cuota a pagar, se le preguntará si desea boleta o factura. Se emitirá lo indicado, del total de la deuda ya pagada.
            </Alert>
          </div> : ''
      }
      <Label title={'DETALLE DEL PAGO'} isBold />
      <div className="row">
        <div className="col-md-4" style={{ textAlign: 'left' }}>
          <span>Cuotas: </span>
        </div>
        <div className="col-md-4">
          <span>{listDetailPayments.length}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={{ textAlign: 'left' }}>
          <span>Monto de pago: </span>
        </div>
        <div className="col-md-4">
          <span>S/.{formatDecimales(listDetailPayments.map(d => d.amount)[0])}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={{ textAlign: 'left' }}>
          <span>Fecha de emisión: </span>
        </div>
        <div className="col-md-4">
          <span>12/10/2023 15:35:00 AM</span>
        </div>
      </div>
      <br />
      <Label title={'DETALLE DE CUOTAS PENDIENTES POR PAGAR'} isBold />
      <div className="row">
        <SeePaymentsList 
          rows={listDetailPayments}
          handleMakePay={handleMakePay}
        />
      </div>
      {/* <div className="row">
        <div className="col-md-4 mt-4 mb-4" style={{ textAlign: 'left' }}>
          <span>Método de pago: </span>
        </div>
        <SelectedFormControl
          className="col-md-4"
          placeHolder="Seleccione..."
          options={payMethods}
          handleChange={handleChangePayMethod}
        />
      </div> */}
      {/* {
        haveConcept ?
          <div className="row">
            {
              payMethodId !== 3 ?
                <>
                  <div className="col-md-4" style={{ textAlign: 'left' }}></div>
                  <InputFormControl
                    type="text"
                    className="col-md-4"
                    isLabel
                    label="Ingrese concepto"
                    onChange={handleChangeConceptoPago}
                  />
                </> :
                <>
                  <div className="col-md-4 mt-2" style={{ textAlign: 'left' }}></div>
                  <InputFormControl
                    type="number"
                    className="col-md-4"
                    isLabel
                    align="right"
                    label={`Monto en efectivo`}
                    onChange={handleChangeMontoEfectivo}
                    id="txtMontoEfectivo"
                    autoFocus
                  />
                  <div className="col-md-3 mt-3">
                    Vuelto en efectivo:
                    <Chip label={`S/. ${formatDecimales(vuelto)}`} color="success" />
                  </div>
                </>
            }
          </div> : ''
      } */}

      {/* <div className="row mb-4">
        <div className="col-md-4 mt-4" style={{ textAlign: 'left' }}>
          <span>Tipo de documento: </span>
        </div>
        <SelectedFormControl
          className="col-md-4"
          placeHolder="Seleccione..."
          options={vouchers}
          handleChange={handleChangeTipoDocumento}
        />
      </div>
      <div className="row mt-4">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
            <Radio
              checked={selectedValue === 'p'}
              onChange={handleChangeRadioButton}
              value="p"
              name="radio-buttons"
              label="¿Documento emitido a nombre de Paciente?"
            />
            <Radio
              checked={selectedValue === 'n'}
              onChange={handleChangeRadioButton}
              value="n"
              name="radio-buttons"
              label="¿Documento emitido aún cliente nuevo?"
            />
          </Box>
        </div>
      </div> */}
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
            {/* <div className="btn-group">
              <ButtonFormControl
                title="Pagar"
                color='btn btn-success'
                type={14}
                onClick={handlePagarCuota}
              />
            </div>&nbsp; */}
          </div>
        </div>
      </div>
    </div>
  )
}
SeePayments.propTypes = {
  objetoPago: PropTypes.object,
  handleCloseModalPago: PropTypes.func,
  handleMakePay: PropTypes.func,
  handleChangeConceptoPago: PropTypes.func,
  handleChangePayMethod: PropTypes.func,
  handlePagarCuota: PropTypes.func,
  handleChangeMontoEfectivo: PropTypes.func,
  handleChangeTipoDocumento: PropTypes.func,
  handleChangeRadioButton: PropTypes.func,
  payMethods: PropTypes.array,
  listDetailPayments: PropTypes.array,
  vouchers: PropTypes.array,
  haveConcept: PropTypes.bool,
  vuelto: PropTypes.number,
  payMethodId: PropTypes.number,
  debtNumberFlagMax: PropTypes.bool,
  selectedValue: PropTypes.string,
};