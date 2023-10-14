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
// import ItemList from './item-list';
import { Fragment } from 'react';
import { TablePagination } from '@mui/material';
import { formatFullHour } from 'src/utils/functions';
import { Badge } from 'src/components/atoms';

function Row({
  row = {},
  nro = 0,
}) {

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">{nro}</TableCell>
        {/* <TableCell align="left">{row?.operationType?.name}</TableCell> */}
        <TableCell align="left">{row?.personEmit}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row?.subTotal)}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row?.igv)}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row?.total)}</TableCell>
        <TableCell align="center">{`${row?.serie} - ${row?.number}`}</TableCell>
        <TableCell align="center">{`${row?.payMethod?.description}`}</TableCell>
        <TableCell align="center">{`${formatFullHour(row?.createdAt)}`}</TableCell>
        <TableCell align="center">
          <Badge value={row?.typeTransactionValue} text={row?.typeTransaction} />
        </TableCell>
        <TableCell align="center">
          <Badge value={1} text='EMITIDO' />
        </TableCell>
        {/* <td>
          <ItemList
            row={row}
            handleEditar={handleEditar}
            label={row.label}
            handleDisabledEnabled={handleDisabledEnabled}
          />
        </td> */}
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleDisabledEnabled: PropTypes.func,
  handleEditar: PropTypes.func,
  nro: PropTypes.number,
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
  handleChangeCaptureIdPatientAprrove,
  selectedValue,
  handleEditar,
  handleDisabledEnabled
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              <TableCell align="left">Nro</TableCell>
              {/* <TableCell align="left">Operación</TableCell> */}
              <TableCell align="left">Persona</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right">Igv</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Correlativo</TableCell>
              <TableCell align="center">Método de pago</TableCell>
              <TableCell align="center">Fecha transacción</TableCell>
              <TableCell align="center">¿Compra o Venta?</TableCell>
              <TableCell align="center">Estado SUNAT</TableCell>
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
                handleDisabledEnabled={handleDisabledEnabled}
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
  handleDisabledEnabled: PropTypes.func,
};