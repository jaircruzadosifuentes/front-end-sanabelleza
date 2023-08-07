import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatDecimales } from 'src/utils/utils';
import ItemList from './item-list';
import { Fragment } from 'react';
import { TablePagination } from '@mui/material';

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
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="center">{row.numberSessions}</TableCell>
        <TableCell align="center">S/.{formatDecimales(row.costPerUnit)}</TableCell>
        <TableCell align="left">{row.abbreviation}</TableCell>
        <TableCell align="center">{row.maximumFeesToPay}</TableCell>
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size='medium'>
          <TableHead>
            <TableRow>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="center">Nro de Sesiones</TableCell>
              <TableCell align="center">Costo por Unidad</TableCell>
              <TableCell align="left">Abreviación</TableCell>
              <TableCell align="center">Máximo de cuotas</TableCell>
              <TableCell align="left">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              ).map((row, index) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Filas por página'
      />
    </Fragment>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
  selectedValue: PropTypes.string,
  handleEditar: PropTypes.func,
};