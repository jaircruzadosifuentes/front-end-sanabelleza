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
import { Box, Collapse, TablePagination, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import SubItemList from './sub-item-list';

function Row({
  row = {},
  handleRealizarPago,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            title='Detalle de la solicitud'
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row?.patient?.person?.surnames}, {row?.patient?.person?.names}</TableCell>
        <TableCell align="center">{row?.patient?.clinicalHistory?.packetsOrUnitSessions?.description}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row.total)}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row.igv)}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row.subTotal)}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row.totalCancelled)}</TableCell>
        <TableCell align="right">S/.{formatDecimales(row.totalDebt)}</TableCell>
        <TableCell align="center">{row?.state}</TableCell>
        {/* <td>
          <ItemList
            row={row}
            selectedValue={selectedValue}
            handleEditar={handleEditar}
          />
        </td> */}
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" >
                Detalle de Cuotas
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Monto</TableCell>
                    <TableCell align="center">Nro de Cuota</TableCell>
                    <TableCell align="center">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.paymentScheduleDetails.map((p, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell align="center">{p.amount}</TableCell>
                        <TableCell align="center">{p.debtNumber}</TableCell>
                        <TableCell align="center">{p.state}</TableCell>
                        <td align="center">
                          <SubItemList
                            row={p}
                            dataHead={row}
                            handleRealizarPago={handleRealizarPago}
                            disabled={p.state === 'PAGADO'}
                          />
                        </td>
                      </TableRow>

                    </>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <hr />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleRealizarPago: PropTypes.func,
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
  handleRealizarPago,
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
              <TableCell align="left"></TableCell>
              <TableCell align="left">Paciente</TableCell>
              <TableCell align="center">Paquete</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Igv</TableCell>
              <TableCell align="right">Sub Total</TableCell>
              <TableCell align="right">Total Cancelado</TableCell>
              <TableCell align="right">Total Debe</TableCell>
              <TableCell align="center">Estado</TableCell>
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
                handleRealizarPago={handleRealizarPago}
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
  handleRealizarPago: PropTypes.func,
};