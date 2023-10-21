import React from "react";
import SaleDetailList from "./sale-detail-list";
import PropTypes from "prop-types";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, SelectedFormControl } from "src/components/molecules";
import SpanFormControl from "src/components/atoms/SpanFormControl";
import { formatDecimales } from "src/utils/utils";
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GREEN } from "src/config/config";

export default function FormSaveSale({
  productsAddCart = [],
  handleRemoveItemProductAdd,
  handleAddDecreaseQuantity,
  payMethods = [],
  getIgv,
  getTotal,
  handleSaveSaleFinish,
  handleChangePayMethod,
  payMethodId = 0,
  handleChangeMontoEfectivo,
  cashAmount = 0.00,
  handleChangeConcepto,
  handleCloseModalSaveSale,
  vouchers = [],
  handleChangeTipoDoc
}) {
  return (
    <div className="row">
      <div className="col-md-7">
        <SaleDetailList
          rows={productsAddCart}
          handleRemoveItemProductAdd={handleRemoveItemProductAdd}
          handleAddDecreaseQuantity={handleAddDecreaseQuantity}
        />
      </div>
      <div className="col-md-5">
        <div className="row">
          <div className="col-md-12">
            <Label title={'REALIZAR PAGO'} isBold isColor />
          </div>
          <div className="col-md-5 mt-4 mb-4" style={{ textAlign: 'left' }}>
            <span>Método de pago: </span>
          </div>
          <SelectedFormControl
            className="col-md-7"
            placeHolder="Seleccione..."
            options={payMethods}
            handleChange={handleChangePayMethod}
          />
        </div>
        {
          payMethodId === 3 ?
            <div className="row">
              <div className="col-md-5 mt-4">
                <SpanFormControl isBold title="Monto:"></SpanFormControl>
              </div>
              <InputFormControl
                type="number"
                className="col-md-7"
                align="center"
                onChange={handleChangeMontoEfectivo}
                autoFocus
              />
            </div> :
            <div className="row">
              <div className="col-md-5 mt-4">
                <SpanFormControl isBold title="Concepto:"></SpanFormControl>
              </div>
              <InputFormControl
                type="text"
                className="col-md-7"
                align="center"
                onChange={handleChangeConcepto}
                autoFocus
              />
            </div>
        }
        <div className="row">
          <div className="col-md-5 mt-4 mb-4" style={{ textAlign: 'left' }}>
            <span>Tipo de documento: </span>
          </div>
          <SelectedFormControl
            className="col-md-7"
            placeHolder="Seleccione..."
            options={vouchers}
            handleChange={handleChangeTipoDoc}
          />
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-md-12">
            <Label title={'DETALLE TOTAL A PAGAR'} isBold isColor />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="row">
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <SpanFormControl isBold title="SUB TOTAL:" />
              </div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <SpanFormControl title={`S/. ${formatDecimales(getTotal()) - formatDecimales(getIgv())}`} />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="row">
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <SpanFormControl isBold title="IGV:" />
              </div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <SpanFormControl title={`S/. ${(formatDecimales(getIgv()))}`} />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="row">
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <SpanFormControl isBold title="TOTAL:" />
              </div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <SpanFormControl title={`S/. ${(formatDecimales(getTotal()))}`} />
              </div>
            </div>
          </div>
          {
            payMethodId === 3 ?
              <div className="col-md-12 mt-4">
                <div className="row">
                  <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <span style={{ color: COLOR_BLUE_MAB, fontWeight: 'bold' }}>EFECTIVO: </span>
                  </div>
                  <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <span style={{ color: COLOR_BLUE_MAB, fontWeight: 'bold' }}>S/.{`${formatDecimales(cashAmount)}`}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <span style={{ color: formatDecimales(cashAmount - getTotal()) > 0? COLOR_GREEN: COLOR_BUTTON_MAB, fontWeight: 'bold' }}>VUELTO: </span>
                  </div>
                  <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <span style={{ color: formatDecimales(cashAmount - getTotal()) > 0? COLOR_GREEN: COLOR_BUTTON_MAB, fontWeight: 'bold' }}>S/. {`${formatDecimales(cashAmount - getTotal())}`} </span>
                  </div>
                </div>
              </div> : ''
          }
        </div>
        <div className="row mt-4">
          <div className="col-md-6"></div>
          <div className="col-md-3">
            <ButtonFormControl
              title="Cancelar"
              color='btn btn-danger'
              type={2}
              onClick={handleCloseModalSaveSale}
            />
          </div>
          <div className="col-md-3" >
            <ButtonFormControl
              title="Guardar"
              color='btn btn-success'
              type={14}
              onClick={handleSaveSaleFinish}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
FormSaveSale.propTypes = {
  vouchers: PropTypes.array,
  productsAddCart: PropTypes.array,
  payMethods: PropTypes.array,
  handleRemoveItemProductAdd: PropTypes.func,
  handleAddDecreaseQuantity: PropTypes.func,
  handleSaveSaleFinish: PropTypes.func,
  handleChangePayMethod: PropTypes.func,
  handleChangeMontoEfectivo: PropTypes.func,
  getIgv: PropTypes.number,
  getTotal: PropTypes.number,
  payMethodId: PropTypes.number,
  handleChangeConcepto: PropTypes.func,
  handleCloseModalSaveSale: PropTypes.func,
  handleChangeTipoDoc: PropTypes.func,
  cashAmount: PropTypes.number,
};
