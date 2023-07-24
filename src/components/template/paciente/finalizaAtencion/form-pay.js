import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import { convertDateTimeToDate, formatDecimales } from "src/utils/utils";

function showFrecuency(value) {
  let result = '';
  switch (value) {
    case 1:
      result = 'DIARIO (TODOS LOS DÍAS)'
      break;
    case 2:
      result = '2 VECES POR SEMANA'
      break;
    case 3:
      result = '3 VECES POR SEMANA'
      break;
    default:
      break;
  }
  return result;
}
export default function FormPay({
  objPatient = {},
  total = 0.00,
  igv = 0.00,
  subTotal = 0.00,
  handleChangeCuotas,
  handleCloseModalEndClinicPatient,
  numberDues = 0,
  payMethods = [],
  handleChangePayMethod,
  showControlRefPay = false,
  descriptionLabelSelectPayMethod = '',
  handleCloseModalEndCare,
  handleProcesarCronograma,
  stateButtonProcessSchedule = false,
  handleChangeInitialDate,
  stateGenerateSchedule = false,
  handleClickViewSchedulePay,
  handleDescriptionRefPayMethod,
  handleHandlePaySave,
  handleChangeHourInitial
}) {
  return (
    <Fragment>
      <div className="row">
        <Label title={'RESUMEN DEL PACIENTE'} isBold />
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-6"
          label="Nombres y Apellidos"
          isLabel
          defaultValue={`${objPatient?.person.surnames}/${objPatient?.person?.names}`}
          readOnly
        />
      </div>
      <div className="row mt-3">
        <Label title={'RESUMEN DEL PAQUETE Y FRECUENCIA'} isBold />
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-6"
          label="PAQUETE Y FRECUENCIA"
          isLabel
          defaultValue={`${objPatient?.clinicalHistory?.packetsOrUnitSessions?.abbreviation} - ${showFrecuency(objPatient?.clinicalHistory?.frecuencyId)}`}
          readOnly
        />
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-2"
          label="COSTO POR SESIÓN"
          isLabel
          align="RIGHT"
          defaultValue={`S/. ${formatDecimales(objPatient?.clinicalHistory?.packetsOrUnitSessions.costPerUnit)}`}
          readOnly
        />
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-2"
          label="CUOTAS A PAGAR"
          isLabel
          align="CENTER"
          defaultValue={`${objPatient?.clinicalHistory?.packetsOrUnitSessions.maximumFeesToPay} Cuotas`}
          readOnly
        />
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-2"
          label="TOTAL A PAGAR"
          isLabel
          align="center"
          defaultValue={`S/.${formatDecimales(objPatient?.clinicalHistory?.packetsOrUnitSessions.costPerUnit * objPatient?.clinicalHistory?.packetsOrUnitSessions.numberSessions)}`}
          readOnly
        />
      </div>
      <div className="row mt-3">
        <Label title={'RESUMEN DEL PAGO'} isBold />
        <InputFormControl
          type="NUMBER"
          autoFocus
          className="col-md-2"
          label="CUOTAS"
          align="center"
          isLabel
          defaultValue={numberDues}
          onChange={handleChangeCuotas}
        />
        {/* <SelectedFormControl
          titleLabel="Método de pago"
          className="col-md-4"
          placeHolder="Método de pago"
          options={payMethods}
          handleChange={handleChangePayMethod}
        /> */}
        {/* {
          showControlRefPay ?
          <TextAreaFormControl
            type="text"
            autoFocus
            className="col-md-6"
            label={`${descriptionLabelSelectPayMethod}`}
            onChange={handleDescriptionRefPayMethod}
            isLabel
            rows={1}
          />: ''
        } */}
      </div>
      <div className="row mt-3">
        <Label title={'INICIO DEL TRATAMIENTO'} isBold />
        {
          !stateGenerateSchedule ?
            <InputFormControl
              type="date"
              autoFocus
              className="col-md-2"
              label="Fecha Inicio"
              align="center"
              isLabel
              onChange={handleChangeInitialDate}
            /> :
            <>
              <span className="col-md-4">
                Fecha Inicio: {convertDateTimeToDate(objPatient.pay.dateInitial)}
              </span>
            </>
        }
      </div>
      <div className="row mt-3">
        <InputFormControl
          type="time"
          autoFocus
          className="col-md-2"
          label="Hora Inicio"
          align="center"
          isLabel
          onChange={handleChangeHourInitial}
        />
        <div className="col-md-8">
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="(1) - Procesar Cronograma"
                color='btn btn-warning'
                type={4}
                onClick={handleProcesarCronograma}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="(2) - Ver Cronograma pagos"
                color='btn btn-primary'
                type={3}
                disabled={!stateGenerateSchedule}
                onClick={handleClickViewSchedulePay}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="(3) - Guardar "
                color='btn btn-success'
                type={3}
                disabled={!stateGenerateSchedule}
                onClick={handleHandlePaySave}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                type={2}
                onClick={handleCloseModalEndCare}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </Fragment>
  )
}
FormPay.propTypes = {
  descriptionLabelSelectPayMethod: PropTypes.string,
  showControlRefPay: PropTypes.bool,
  stateGenerateSchedule: PropTypes.bool,
  stateButtonProcessSchedule: PropTypes.bool,
  handleChangeHourInitial: PropTypes.func,
  handleChangePayMethod: PropTypes.func,
  handleHandlePaySave: PropTypes.func,
  handleClickViewSchedulePay: PropTypes.func,
  handleDescriptionRefPayMethod: PropTypes.func,
  handleChangeInitialDate: PropTypes.func,
  handleProcesarCronograma: PropTypes.func,
  handleCloseModalEndCare: PropTypes.func,
  handleCloseModalEndClinicPatient: PropTypes.func,
  handleChangeCuotas: PropTypes.func,
  objPatient: PropTypes.object,
  total: PropTypes.any,
  subTotal: PropTypes.any,
  igv: PropTypes.any,
  numberDues: PropTypes.number,
  payMethods: PropTypes.array,
};
