import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ItemList from './item-list';

function Row({
  row = {},
  handleChangeCaptureIdPatientAprrove,
  nro = 0,
  selectedValue = '',
  handleEditar
}) {

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {nro}
        </TableCell>
        <TableCell align="left">{row.frecuencyDescription}</TableCell>
        <TableCell align="center">{row.abbreviation}</TableCell>
        <TableCell align="center">{(row.value)}</TableCell>
        <TableCell align="left">{row.state}</TableCell>
        <td>
          <ItemList
            row={row}
            selectedValue={selectedValue}
            handleEditar={handleEditar}
          />
        </td>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
  handleEditar: PropTypes.func,
  selectedValue: PropTypes.string,
  nro: PropTypes.number,
  row: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    dayReserved: PropTypes.string.isRequired,
    hourReserved: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    timeDemoration: PropTypes.number.isRequired,
    nro: PropTypes.string.isRequired,
   
    employeed: PropTypes.arrayOf(
      PropTypes.shape({
        surnames: PropTypes.string.isRequired,
        names: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
};
export default function List({
  rows = [],
  handleChangeCaptureIdPatientAprrove,
  selectedValue,
  handleEditar
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align="left">Descripción</TableCell>
            <TableCell align="center">abreviatura</TableCell>
            <TableCell align="center">Valor de Frecuencia</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row 
              key={row.nro} 
              row={row} 
              nro={index + 1}
              handleChangeCaptureIdPatientAprrove={handleChangeCaptureIdPatientAprrove}
              selectedValue={selectedValue}
              handleEditar={handleEditar}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
  handleEditar: PropTypes.func,
  selectedValue: PropTypes.string,
};