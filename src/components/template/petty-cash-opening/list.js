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
import { Box, Collapse, IconButton, TablePagination, Tooltip } from '@mui/material';
import { Badge } from 'src/components/atoms';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLOR_GREEN } from 'src/config/config';
import { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SpanFormControl from 'src/components/atoms/SpanFormControl';

function Row({
  row = {},
  handleCloseCash,
}) {
  const [open, setOpen] = useState(false);
  const handleOpenCollapse = async () => {
    setOpen(!open);
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            title='Detalle de la solicitud'
            onClick={handleOpenCollapse}
          >
            {open ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {row?.employeed}
        </TableCell>
        <TableCell align="center">{row?.campus}</TableCell>
        <TableCell align="center">{row?.cashRegister}</TableCell>
        <TableCell align="center">S/.{formatDecimales(row?.montoAperturado)}</TableCell>
        <TableCell align="center">{convertDateTimeToDate(row?.fechaApertu)}</TableCell>
        <TableCell align="center">
          <Badge value={row?.isApertu === 1 ? 1 : 3} text={row?.isApertu === 1 ? 'SI' : 'NO'} />
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="medium"
            disabled={row?.isApertu}
          >
            {
              !row?.isApertu ?
                <Tooltip title='Cerrar caja chica'>
                  <div onClick={(e) =>handleCloseCash(e, row)}>
                    <DoNotDisturbOffIcon />
                  </div>
                </Tooltip> :
                <Tooltip title='Caja chica cerrada'>
                  <CheckCircleIcon style={{ color: COLOR_GREEN }} />
                </Tooltip>
            }
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 2 }}>
              <SpanFormControl title='Detalle de la apertura de la caja chica' />
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nro</TableCell>
                    <TableCell align="center">Concepto</TableCell>
                    <TableCell align="center">Tipo de comprobante</TableCell>
                    <TableCell align="center">Nro de comprobante</TableCell>
                    <TableCell align="center">Monto</TableCell>
                    <TableCell align="center">Modo de pago</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.paymentScheduleDetails.map((p, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell align="center">{p.amount}</TableCell>
                        <TableCell align="center">{p.debtNumber}</TableCell>
                        <TableCell align="center">{p.state}</TableCell>
                      </TableRow>

                    </>
                  ))}
                </TableBody> */}
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
  handleCloseCash: PropTypes.func,
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
  handleCloseCash
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
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
              <TableCell align="center"></TableCell>
              <TableCell align="left">Nombres y apellidos (Trabajador(a))</TableCell>
              <TableCell align="center">Sede</TableCell>
              <TableCell align="center">Nro de caja</TableCell>
              <TableCell align="center">Monto aperturado</TableCell>
              <TableCell align="center">Fecha apertura</TableCell>
              <TableCell align="center">¿Está cerrada?</TableCell>
              <TableCell align="center"></TableCell>
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
                handleCloseCash={handleCloseCash}
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
  handleCloseCash: PropTypes.func,
};