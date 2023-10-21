import React from "react";
import PropTypes from "prop-types";
import { VENTA } from "src/config/config";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import SaleDetailList from "./sale-detail-list";
import SpanFormControl from "src/components/atoms/SpanFormControl";
import { formatDecimales } from "src/utils/utils";

export default function SaleHeaderSidebarLeft({
  typeTransaction = '',
  productsAddCart,
  handleRemoveItemProductAdd,
  handleChangeCantidad,
  enabled = false,
  handleSaveSale,
  getTotal = 0,
  getIgv = 0,
  handleSearchPerson,
  objReniecSearch = {},
  handleAddDecreaseQuantity,
  handleCancelSaveSale,
  objPersonManual = {}
}) {
  return (
    <div className="col-md-5">
      <div className="row">
        {
          objReniecSearch?.data?.nombre_completo === undefined ?
            <InputFormControl
              type="text"
              autoFocus
              className="col-md-8"
              label={`${typeTransaction === VENTA ? 'Clientes' : 'Empresas y/o proveedores'}`}
              isLabel
              isBold
              defaultValue={objPersonManual?.names === undefined || objPersonManual?.names === null? '': objPersonManual?.names + ' ' + objPersonManual?.surnames}
              readOnly
            /> :
            <InputFormControl
              type="text"
              autoFocus
              className="col-md-8"
              label={`${typeTransaction === VENTA ? 'Clientes' : 'Empresas y/o proveedores'}`}
              isLabel
              isBold
              defaultValue={objReniecSearch?.data?.nombre_completo}
              readOnly
            />
        }
        <div className="col-md-4 mt-4">
          <ButtonFormControl
            title="Buscar"
            color='btn btn-primary'
            type={9}
            onClick={handleSearchPerson}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <SaleDetailList
            rows={productsAddCart}
            handleRemoveItemProductAdd={handleRemoveItemProductAdd}
            handleChangeCantidad={handleChangeCantidad}
            enabled={enabled}
            handleAddDecreaseQuantity={handleAddDecreaseQuantity}
          />
        </div>
        <div className="col-md-12 mt-4">
          <div className="row">
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <SpanFormControl isBold title="SUB TOTAL:" />
            </div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <SpanFormControl title={`S/. ${formatDecimales(getTotal - getIgv)}`} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="row">
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <SpanFormControl isBold title="IGV:" />
            </div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <SpanFormControl title={`S/. ${formatDecimales(getIgv)}`} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <div className="row">
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <SpanFormControl isBold title="TOTAL:" />
            </div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <SpanFormControl title={`S/. ${formatDecimales(getTotal)}`} />
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4 mb-4">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-3">
              <ButtonFormControl
                title="Cancelar"
                color='btn btn-danger btn-lg'
                type={2}
                onClick={handleCancelSaveSale}
              />
            </div>
            <div className="col-md-3" >
              <ButtonFormControl
                title="Pagar"
                color='btn btn-success btn-lg'
                type={14}
                onClick={handleSaveSale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
SaleHeaderSidebarLeft.propTypes = {
  typeTransaction: PropTypes.string,
  productsAddCart: PropTypes.func,
  handleAddDecreaseQuantity: PropTypes.func,
  handleRemoveItemProductAdd: PropTypes.func,
  handleChangeCantidad: PropTypes.func,
  handleSaveSale: PropTypes.func,
  handleSearchPerson: PropTypes.func,
  handleCancelSaveSale: PropTypes.func,
  enabled: PropTypes.bool,
  openEditCant: PropTypes.bool,
  getTotal: PropTypes.number,
  getIgv: PropTypes.number,
  objReniecSearch: PropTypes.object,
  objPersonManual: PropTypes.object,
};
