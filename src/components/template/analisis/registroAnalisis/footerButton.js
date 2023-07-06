import React, { Fragment } from "react";
import { ButtonFormControl, TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function FooterButton({
  handleCancelRegister,
  handleSaveAnalysis,
  handleChangeInformationAdi
}) {
  return (
    <Fragment>
      <div className="row mb-4">
        <TextAreaFormControl
          type="text"
          className="col-md-8"
          label="Información adicional"
          isLabel
          rows={4}
          onChange={handleChangeInformationAdi}
        />
        <div className="col-md-4 mt-4">
          <div className="btn-toolbar mt-4" style={{ float: 'right'}}>
            <div className="btn-group mt-2">
              <ButtonFormControl
                title="Guardar Análisis"
                color='btn btn-success'
                type={1}
                onClick={handleSaveAnalysis}
              />
            </div>&nbsp;
            <div className="btn-group mt-2">
              <ButtonFormControl
                title="Cancelar Registro"
                color='btn btn-danger'
                onClick={handleCancelRegister}
                type={2}
              />
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  )
}
FooterButton.propTypes = {
  handleChangeInformationAdi: PropTypes.func,
  handleCancelRegister: PropTypes.func,
  handleSaveAnalysis: PropTypes.func,
};