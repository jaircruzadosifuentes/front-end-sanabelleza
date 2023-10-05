import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertDateTimeToDate } from 'src/utils/utils';
import NameUser from 'src/components/organism/name-user';

function Row({
  row = {},
}) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">
          <NameUser profile={row} patient />
        </TableCell>
        <TableCell align="center">
          <span>
            {row.patientState.description}
          </span>
        </TableCell>
        <TableCell align="center">
          <span>
            {convertDateTimeToDate(row.patientSolicitude?.dateAttention)} - {row.patientSolicitude?.hourAttention}
          </span>
        </TableCell>
        <TableCell align="center">
          <div className='row'>
            <div className='col-md-12'>
              <NameUser 
                profile={row.patientSolicitude?.employeed} 
                employeed 
                isPopover
              />
            </div>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  patientId: PropTypes.number,
  row: PropTypes.any,
};
export default function List({
  rows = [],
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='large'>
        <TableHead>
          <TableRow>
            <TableCell align="center">Paciente</TableCell>
            <TableCell align="center">Motivo</TableCell>
            <TableCell align="center">Fecha y Hora</TableCell>
            <TableCell align="center">Enc. Atención</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row, index) => (
            <Row
              key={index}
              row={row}
            />
          )) :
            <TableRow>
              <TableCell align="center">No existe información para mostrar.</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  rows: PropTypes.array,
};