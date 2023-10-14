import React, { Fragment } from "react";
import { ButtonFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function FooterButton({
  handleCancelRegister,
  handleSaveSesion,
  missingAsignedEmployeed = false
}) {
  return (
    <Fragment>
      <div className="row mb-4">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6" >
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="btn-toolbar" >
                    <div className="btn-group">
                      <ButtonFormControl
                        title="Guardar"
                        color='btn btn-success'
                        type={1}
                        disabled={missingAsignedEmployeed}
                        onClick={handleSaveSesion}
                      />
                    </div>
                    <div className="btn-group">
                      <ButtonFormControl
                        title="Cancelar"
                        color='btn btn-danger'
                        onClick={handleCancelRegister}
                        type={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
  handleSaveSesion: PropTypes.func,
  missingAsignedEmployeed: PropTypes.bool
};