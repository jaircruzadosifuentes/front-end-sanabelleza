import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";

export default function AutoCompleteTextField({
  rows = [],
  handleOnChange,
  className,
  label = 'Trabajador'
}) {
  return (
    <div className={className}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={rows}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={handleOnChange}
        sx={{ width: '100%' }}
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
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  )
}
AutoCompleteTextField.propTypes = {
  rows: PropTypes.array,
  handleOnChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
};
