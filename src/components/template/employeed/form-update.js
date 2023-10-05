import React from "react";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';
import { convertDateTimeToDate } from "src/utils/utils";

export default function FormUpdate({
  objEmployeed = {}
}) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <div className="row">
            <div className='col-md-12'>
              <img
                alt={objEmployeed.person.names}
                src={`../../images/avatars/${objEmployeed?.person.profilePicture}`}
                className="rounded float-righ"
                title={`${objEmployeed.person.surnames}/${objEmployeed.person.names}`}
                height={'100%'}
                width={'100%'}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <ButtonFormControl
                title="Actualizar Foto"
                color='btn btn-success'
                type={4}
              />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="row">
            <InputFormControl
              type="text"
              autoFocus
              className="col-md-12"
              label="Apellidos"
              isLabel
              defaultValue={objEmployeed.person.surnames}
            />
            <InputFormControl
              type="text"
              className="col-md-12"
              label="Nombres"
              isLabel
              defaultValue={objEmployeed.person.names}
            />
            <InputFormControl
              type="date"
              className="col-md-6"
              isLabel
              label="Fecha Nacimiento"
              align="center"
              defaultValue={convertDateTimeToDate(objEmployeed.person.birthDate)}
            />
          </div>
          <div className="row mt-4">
            <div className="btn-toolbar">
              <div className="btn-group">
                <ButtonFormControl
                  title="Cancelar"
                  color='btn btn-danger'
                  type={2}
                />
              </div>&nbsp;
              <div className="btn-group">
                <ButtonFormControl
                  title="Guardar"
                  color='btn btn-success'
                  type={1}
                />
              </div>&nbsp;
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
FormUpdate.propTypes = {
  objEmployeed: PropTypes.object,
};
