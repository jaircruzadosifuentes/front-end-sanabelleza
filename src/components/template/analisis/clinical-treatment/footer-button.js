import React, { Fragment } from "react";
import { ButtonFormControl, TextAreaFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function FooterButton({
  handleCancelRegister,
  handleSaveSesion,
  handleChangeInformationAdi
}) {
  return (
    <Fragment>
      <div className="row mb-4">
        <div className="col-md-12 mt-4">
          <div className="btn-toolbar mt-4" style={{ float: 'right'}}>
            <div className="btn-group mt-2">
              <ButtonFormControl
                title="Guardar sesión"
                color='btn btn-success'
                type={1}
                onClick={handleSaveSesion}
              />
            </div>&nbsp;
            <div className="btn-group mt-2">
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
    </Fragment>
  )
}
FooterButton.propTypes = {
  handleChangeInformationAdi: PropTypes.func,
  handleCancelRegister: PropTypes.func,
  handleSaveSesion: PropTypes.func,
};