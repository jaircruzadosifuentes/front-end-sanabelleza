import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertDateTimeToDate, formatDecimales } from 'src/utils/utils';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Row({
  row = {},
  index = 0,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size=""
            title='Detalle de la solicitud'
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        {/* <TableCell align="left">{`${row.patient.person.surnames}/${row.patient.person.names}`}</TableCell> */}
        <TableCell align="center">{row.patient?.clinicalHistory?.packetsOrUnitSessions?.description} - {row.patient?.clinicalHistory?.frecuency?.frecuencyDescription}</TableCell>
        <TableCell align="center">{row.dues} </TableCell>
        <TableCell align="center">S/.{formatDecimales(row.mountDue)} </TableCell>
        <TableCell align="center">S/.{formatDecimales(row.mountDue)} </TableCell>
        <TableCell align="center">{convertDateTimeToDate(row.paymentDay)} </TableCell>
        <TableCell align="center">{row.state} </TableCell>
        {/* <td>
          <SchedulePayItem
            row={row}
            handleApproveRequest={handleClickAprobarSolicitud}
            handleCancelRequest={handleCancelRequest}
            typeList={typeList}
          />
        </td> */}
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }}>
              <span style={{fontWeight: 'bold'}}>
                HISTÓRICO DE PAGOS
              </span>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Fecha pagada</TableCell>
                    <TableCell align="center">Nro Cuota Pago</TableCell>
                    <TableCell align="center">Monto Pago</TableCell>
                    <TableCell align="center">Usuario Registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    row.payDuesDetailHistories.length > 0 ? row.payDuesDetailHistories.map((m, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row" align="center">
                            {new Date(m.datePaymentCanceled).toLocaleString()}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {m.debtNumber}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {m.amount}
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {m.userPayment}
                          </TableCell>
                        </TableRow>
                      )
                    }) :
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="center">
                          No hay datos para mostrar.
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                        </TableCell>
                      </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleChangeSendMsgWssp: PropTypes.func,
  handleSendWhatsapp: PropTypes.func,
  handleClickAprobarSolicitud: PropTypes.func,
  typeList: PropTypes.number,
  index: PropTypes.number,
  handleCancelRequest: PropTypes.func,
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
  handleClickAprobarSolicitud,
  handleCancelRequest,
  typeList = 0,
  handleSendWhatsapp,
  handleChangeSendMsgWssp
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Nro</TableCell>
            {/* <TableCell align="left">Paciente</TableCell> */}
            <TableCell align="center">Paquete y Frecuencia</TableCell>
            <TableCell align="center">Nro de Cuota</TableCell>
            <TableCell align="center">Monto a pagar</TableCell>
            <TableCell align="center">Monto pendiente</TableCell>
            <TableCell align="center">Fecha a pagar</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row, index) => (
            <Row
              key={row.nro}
              row={row}
              handleClickAprobarSolicitud={handleClickAprobarSolicitud}
              handleCancelRequest={handleCancelRequest}
              index={index}
              typeList={typeList}
              handleSendWhatsapp={handleSendWhatsapp}
              handleChangeSendMsgWssp={handleChangeSendMsgWssp}
            />
          )) : <span>No existen datos para mostrar</span>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  typeList: PropTypes.number,
  rows: PropTypes.array,
  handleClickAprobarSolicitud: PropTypes.func,
  handleChangeSendMsgWssp: PropTypes.func,
  handleCancelRequest: PropTypes.func,
  handleSendWhatsapp: PropTypes.func,
};