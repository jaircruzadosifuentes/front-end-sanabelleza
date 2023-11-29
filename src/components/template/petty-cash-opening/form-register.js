
import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from "prop-types";
import { formatDecimales } from "src/utils/utils";

export default function FormRegister({
  objDetailEmplo = {},
  handleSaveApertuCajaChica,
  handleChangeMontoApertura
}) {
  return (
    <>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-12">
            <Label title={'DATOS DE APERTURA'} isBold isColor />
          </div>
          <InputFormControl
            type="text"
            className="col-md-4"
            isLabel
            label="Descripción de sede"
            readOnly
            defaultValue={objDetailEmplo?.campus}
          />
          <InputFormControl
            type="text"
            className="col-md-2"
            isLabel
            label="Nro de caja"
            readOnly
            defaultValue={objDetailEmplo?.cashRegister}
          />
          {
            parseInt(objDetailEmplo?.isApertu) === 1 ?
              <div className="col-md-3 text-center">
                <div className="row">
                  <div className="col-md-12">
                    Monto aperturado
                  </div>
                  <div className="col-md-12 mt-3">
                    <span>
                      S/.{formatDecimales(objDetailEmplo?.montoAperturado)}
                    </span>
                  </div>
                </div>
              </div>
              :
              <InputFormControl
                type="number"
                className="col-md-3"
                isLabel
                autoFocus
                label="Monto de apertura"
                align="center"
                onChange={handleChangeMontoApertura}
              />
          }
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-6" >
                <ButtonFormControl
                  title="Guardar"
                  color='btn btn-success btn-lg'
                  disabled={objDetailEmplo?.isApertu === 1}
                  type={1}
                  onClick={handleSaveApertuCajaChica}
                />
              </div>
              <div className="col-md-6">
                <ButtonFormControl
                  title="Cancelar"
                  color='btn btn-danger btn-lg'
                  type={2}
                />
              </div>
          </div>
        </div>
      </div>
    </div >
    </>
  )
}
FormRegister.propTypes = {
  objDetailEmplo: PropTypes.object,
  handleSaveApertuCajaChica: PropTypes.func,
  handleChangeMontoApertura: PropTypes.func,
};