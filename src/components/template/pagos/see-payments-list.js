import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment } from 'react';
import { TablePagination, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Badge } from 'src/components/atoms';
import { formatFullHour } from 'src/utils/functions';
import { convertDateTimeToDate, formatDecimales } from 'src/utils/utils';
import { COLOR_GREEN, DATE_FOR_DEFAULT } from 'src/config/config';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaymentIcon from '@mui/icons-material/Payment';

function Row({
  row = {},
  handleMakePay,
}) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">{row?.debtNumber}</TableCell>
        <TableCell align="center">{convertDateTimeToDate(row?.paymentDate)}</TableCell>
        <TableCell align="center">
          {
            row?.paymentDateCanceled === DATE_FOR_DEFAULT ?
              '-' :
              formatFullHour(row?.paymentDateCanceled)
          }
        </TableCell>
        <TableCell align="center">{formatDecimales(row?.amount)}</TableCell>
        <TableCell align="center">
          <Badge text={row?.state} value={row?.state === 'Pendiente' ? 2 : 1} />
        </TableCell>
        <TableCell align="center">
          {
            row.state === 'Pendiente' ?
            <>
              <ArrowForwardIcon style={{color: '#f9b115'}}/>
            </>: ''
          }
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={(e) =>handleMakePay(e, row)}
            disabled={row?.state !== 'Pendiente'}
          >
            <Tooltip title='Realizar pago'>
              <PaymentIcon style={{color: row?.state !== 'Pendiente'? COLOR_GREEN: '#f9b115'}} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleMakePay: PropTypes.func,
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
export default function SeePaymentsList({
  rows = [],
  handleMakePay,
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
        <Table aria-label="collapsible table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nro cuota</TableCell>
              <TableCell align="center">Fecha de pago</TableCell>
              <TableCell align="center">Fecha del pago realizado</TableCell>
              <TableCell align="center">Monto</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acción</TableCell>
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
                handleMakePay={handleMakePay}
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
SeePaymentsList.propTypes = {
  rows: PropTypes.array,
  handleMakePay: PropTypes.func,
};