import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import PropTypes from 'prop-types';

export default function Alert({
  type,
  title = ''
}) {
  switch (type) {
    case 1:
      return (
        <Alert severity="error">
          <AlertTitle>{title}</AlertTitle>
          {message} — <strong>Échale un vistaso!</strong>
        </Alert>
      )
    case 2:
      return (
        <Alert severity="warning">
          <AlertTitle>{title}</AlertTitle>
          {message} — <strong>Échale un vistaso!</strong>
        </Alert>
      )
    case 3:
      return (
        <Alert severity="info">
          <AlertTitle>{title}</AlertTitle>
          {message} — <strong>Échale un vistaso!</strong>
        </Alert>
      )
    case 4:
      return (
        <Alert severity="success">
          <AlertTitle>{title}</AlertTitle>
          {message} — <strong>Échale un vistaso!</strong>
        </Alert>
      )
    default:
      break;
  }
  // return (
  //   <Stack sx={{ width: '100%' }} spacing={2}>
  //     <Alert severity="error">
  //       <AlertTitle>Error</AlertTitle>
  //       This is an error alert — <strong>check it out!</strong>
  //     </Alert>
  //     <Alert severity="warning">
  //       <AlertTitle>Warning</AlertTitle>
  //       This is a warning alert — <strong>check it out!</strong>
  //     </Alert>
  //     <Alert severity="info">
  //       <AlertTitle>Info</AlertTitle>
  //       This is an info alert — <strong>check it out!</strong>
  //     </Alert>
  //     <Alert severity="success">
  //       <AlertTitle>Success</AlertTitle>
  //       This is a success alert — <strong>check it out!</strong>
  //     </Alert>
  //   </Stack>
  // );
}
Alert.propTypes = {
  type: PropTypes.number,
  title: PropTypes.string,
};