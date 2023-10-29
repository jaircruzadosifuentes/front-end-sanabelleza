import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertDateTimeToDate, formatDecimales } from 'src/utils/utils';
// import ItemList from './item-list';
import { Fragment } from 'react';
import { TablePagination } from '@mui/material';
import { Badge } from 'src/components/atoms';

function Row({
  row = {},
  handleRealizarPago,
  nro
}) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
         {nro}
        </TableCell>
        <TableCell align="left">
          {row?.employeed} 
        </TableCell>
        <TableCell align="center">{row?.campus}</TableCell>
        <TableCell align="center">{row?.cashRegister}</TableCell>
        <TableCell align="center">S/.{formatDecimales(row?.montoAperturado)}</TableCell>
        <TableCell align="center">{convertDateTimeToDate(row?.fechaApertu)}</TableCell>
        <TableCell align="center">
          <Badge value={row?.isApertu === 1? 1: 3} text={row?.isApertu === 1 ? 'SI': 'NO'} />
        </TableCell>
        {/* <td>
          <ItemList
            row={row}
            selectedValue={selectedValue}
            handleEditar={handleEditar}
          />
        </td> */}
      </TableRow>
      {/* <TableRow >
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
                      </TableRow>

                    </>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <hr />
          </Collapse>
        </TableCell>
      </TableRow> */}
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
              <TableCell align="center">Nro</TableCell>
              <TableCell align="left">Nombres y apellidos (Trabajador(a))</TableCell>
              <TableCell align="center">Sede</TableCell>
              <TableCell align="center">Nro de caja</TableCell>
              <TableCell align="center">Monto aperturado</TableCell>
              <TableCell align="center">Fecha apertura</TableCell>
              <TableCell align="center">¿Está cerrada?</TableCell>
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