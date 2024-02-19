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
          className="col-md-10"
          label="Información adicional"
          isLabel
          rows={4}
          onChange={handleChangeInformationAdi}
        />
        <div className="col-md-2 mt-4" >
          <div className="row mt-2">
            <div className="col-md-12" >
              <ButtonFormControl  
                title="Guardar"
                color='btn btn-success btn-lg btn-block'
                type={1}
                onClick={handleSaveAnalysis}
              />
            </div>
            <div className="col-md-12">
              <ButtonFormControl
                title="Cancelar"
                color='btn btn-secondary btn-lg btn-block'
                onClick={handleCancelRegister}
                type={8}
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