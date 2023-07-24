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
import WrappedMenuItems from './wrappedMenuItems';

function Row({
  row = {},
  index = 0,
  handleEndAnalyzing
}) {

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="center">{`${row.person.surnames}/${row.person.names}`}</TableCell>
        <TableCell align="center">{convertDateTimeToDate(row.patientSolicitude.dateAttention)}</TableCell>
        <TableCell align="center">{row.patientSolicitude.hourAttention}</TableCell>
        <TableCell align="left">{row.person.age} años.</TableCell>
        <TableCell align="left">{row.person?.personDocument?.nroDocument}</TableCell>
        <TableCell align="center">{row.patientSolicitude?.employeed?.person.surnames}/{row.patientSolicitude?.employeed?.person?.names}</TableCell>
        <TableCell align="center">{row.patientState.description}</TableCell>
        <td>
          <WrappedMenuItems 
            row={row} 
            handleEndAnalyzing={handleEndAnalyzing}
          />
        </td>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleEndAnalyzing: PropTypes.func,
  index: PropTypes.number,
  row: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    dayReserved: PropTypes.string.isRequired,
    hourReserved: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    timeDemoration: PropTypes.number.isRequired,
    nro: PropTypes.string.isRequired,
  }).isRequired,
};
export default function List({
  rows = [],
  handleEndAnalyzing
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align="center">Paciente</TableCell>
            <TableCell align="center">Dia atención</TableCell>
            <TableCell align="center">Hora reservada</TableCell>
            <TableCell align="left">Edad</TableCell>
            <TableCell align="left">Nro Documento</TableCell>
            <TableCell align="center">Empleado(a)</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0? rows.map((row, index) => (
            <Row 
              key={row.nro} 
              row={row} 
              index={index}
              handleEndAnalyzing={handleEndAnalyzing}
            />
          )): <span>No existen datos para mostrar</span>
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  handleEndAnalyzing: PropTypes.func,
};