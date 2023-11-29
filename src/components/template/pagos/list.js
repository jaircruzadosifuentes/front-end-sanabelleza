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
import { Box, Collapse, TablePagination } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import SubItemList from './sub-item-list';
import NameUser from 'src/components/organism/name-user';
import { Badge, Label } from 'src/components/atoms';
import { formatFullHour } from 'src/utils/functions';
import { convertDateTimeToDate } from 'src/utils/utils';
import SpanFormControl from 'src/components/atoms/SpanFormControl';
import { DATE_FOR_DEFAULT } from 'src/config/config';
import { useState } from 'react';
import { ServiceGetDetailPayPendingGetByIdPayment } from 'src/service/payment/service.payment';

function Row({
  row = {},
  handleRealizarPago,
}) {
  const [open, setOpen] = useState(false);
  const [lstDetailPayment, setLstDetailPayment] = useState([]);

  const handleOpenCollapse = async () => {
    setOpen(!open);
    const { paymentId } = row;
    let lstDetailPay = await ServiceGetDetailPayPendingGetByIdPayment(paymentId);
    if (lstDetailPay.length > 0) {
      setLstDetailPayment(lstDetailPay)
    }
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            title='Detalle de la solicitud'
            onClick={handleOpenCollapse}
          >
            {open ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <NameUser patient profile={row?.patient} />
        </TableCell>
        <TableCell align="center">{formatFullHour(row?.dateOfIssue)}</TableCell>
        <TableCell align="center">{row?.campus.name}</TableCell>

        <TableCell align="center">{row?.cuoPendingPayment} cuotas</TableCell>
        <TableCell align="center">{row?.lateDays} días</TableCell>
        <TableCell align="center">
          <Badge value={row?.statePayId} text={row?.statePay} />
        </TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 2 }}>
              <SpanFormControl title='Detalle de pagos pendientes por citas programada' />
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nro</TableCell>
                    <TableCell align="center">Fecha Inicio - Fecha Fin</TableCell>
                    <TableCell align="center">Última persona quien atendió la cita</TableCell>
                    <TableCell align="center">Última persona quien atendió el pago</TableCell>
                    <TableCell align="center">Próxima fecha de pago</TableCell>
                    {/* <TableCell align="center">Paquete y frecuencia</TableCell> */}
                    {/* <TableCell align="center">Frecuencia</TableCell> */}
                    <TableCell align="center">Estado del tratamiento </TableCell>
                    <TableCell align="center">Estado de pago </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lstDetailPayment.map((p, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{convertDateTimeToDate(p.sesionDateMin)} - {convertDateTimeToDate(p.sesionDateMax)}</TableCell>
                        <TableCell align="center">{p?.employeed?.person?.surnames}, {p?.employeed?.person?.names}</TableCell>
                        <TableCell align="center">{p.userPay}</TableCell>
                        <TableCell align="center">
                          {row?.nextPaymentDate === DATE_FOR_DEFAULT ?
                            '-'
                            : p?.paymentId === row?.paymentId ?<Label
                              title={convertDateTimeToDate(row?.nextPaymentDate)}
                              isBold
                              isSuccess={parseInt(row?.lateDays) >= 0 ? true : false}
                              isWarning={parseInt(row?.lateDays) < 0 ? true : false}
                            />: '-'
                          }
                        </TableCell>
                        {/* <TableCell align="center">{p?.patient?.clinicalHistory?.packetsOrUnitSessions?.description} - {p?.patient?.clinicalHistory?.frecuency?.frecuencyDescription}</TableCell> */}
                        <TableCell align="center">
                          <Badge text={p.state} value={p.stateValue} />
                        </TableCell>
                        <TableCell align="center">
                          <Badge text={p.statePay} value={p.statePayValue} />
                        </TableCell>
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
              <TableCell align="left"></TableCell>
              <TableCell align="left">Nombres y Apellidos del paciente</TableCell>
              <TableCell align="center">Fecha de emisión</TableCell>
              <TableCell align="center">Sede</TableCell>
              {/* <TableCell align="center">Próxima fecha de pago</TableCell> */}
              <TableCell align="center">Nro de cuotas pendientes</TableCell>
              <TableCell align="center">Dias atrazados</TableCell>
              {/* <TableCell align="center">Paquete</TableCell>
              <TableCell align="center">Frecuencia</TableCell> */}
              {/* <TableCell align="right">Total</TableCell>
              <TableCell align="right">Igv</TableCell>
              <TableCell align="right">Sub Total</TableCell>
              <TableCell align="right">Total Cancelado</TableCell>
              <TableCell align="right">Total Debe</TableCell> */}
              <TableCell align="center">Estado del pago</TableCell>
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