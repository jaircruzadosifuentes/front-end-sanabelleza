import React, { Fragment } from "react";
import { ButtonFormControl, InputFormControl } from "../molecules";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export default function FormEditHour({
  handleCloseEditSesion,
  handleChangeHourAttention,
  handleSaveHour,
  handleChangeEmployeed,
  employeeds = [],
  objSesion = {}
}) {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6 mt-3 mb-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employeeds}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={handleChangeEmployeed}
            sx={{ width: '100%' }}
            defaultValue={employeeds.filter(e => e.employeedId === objSesion?.employeed?.employeedId)[0]}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="45"
                  src={`images/avatars/${option.person.profilePicture}`}
                  srcSet={`images/avatars/${option.person.profilePicture} 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Trabajador"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )} />
        </div>
        <InputFormControl
          type="time"
          className="col-md-4"
          isLabel
          label="Ingrese hora de atención"
          onChange={handleChangeHourAttention}
          defaultValue={objSesion.hourOffAttention}
        />
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                type={2}
                onClick={handleCloseEditSesion}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Guardar"
                color='btn btn-success'
                onClick={handleSaveHour}
                type={1}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </Fragment>
  )
}
FormEditHour.propTypes = {
  handleCloseEditSesion: PropTypes.func,
  handleChangeHourAttention: PropTypes.func,
  handleSaveHour: PropTypes.func,
  handleChangeEmployeed: PropTypes.func,
  employeeds: PropTypes.array,
  objSesion: PropTypes.object
};