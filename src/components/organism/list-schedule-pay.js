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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { convertDateTimeToDate, formatDecimales } from 'src/utils/utils';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Badge } from 'src/components/atoms';

function Row({
  row = {},
  index = 0,
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
              <Typography variant="h6" gutterBottom component="div">
                Histórico de Pagos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Fecha pagada</TableCell>
                    <TableCell align="center">Nro Cuota Pago</TableCell>
                    <TableCell align="center">Monto Pago</TableCell>
                    <TableCell align="center">Usuario Registro</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.patientProgresses.map((p, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="center">
                          {convertDateTimeToDate(p.dateOfAttention)}
                        </TableCell>
                        <TableCell align="center">{p.hourOffAttention} {p.systemHour}</TableCell>
                        <TableCell align="center">{p.sessionNumber}</TableCell>
                        <TableCell align="center">
                          {p.typeAttention.description}  &nbsp;
                          {
                            p.isFlag ?
                              <Tooltip title={"Histórico de notificaciones emitidas a usuario, para reprogramación."} placement="top">
                                <RuleFolderIcon style={{ color: COLOR_BLUE_MAB, cursor: 'pointer' }} />
                              </Tooltip>
                              : ''
                          }
                        </TableCell>
                        <TableCell align="center">
                          <span>{p.isQueueRemoval ? 'SI' : 'NO'}</span>&nbsp;&nbsp;&nbsp;
                          <Tooltip title={p.isQueueRemoval ? 'SI ASISTIÓ' : 'NO ASISTIÓ'} placement="top">
                            {p.isQueueRemoval ? < CheckCircleIcon style={{ color: COLOR_GREEN, cursor: 'pointer' }} /> : <CancelIcon style={{ color: COLOR_BUTTON_MAB, cursor: 'pointer' }} />}
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <span>{p.isAttention ? 'SI' : 'NO'}</span>&nbsp;&nbsp;&nbsp;
                          <Tooltip title={p.isAttention ? 'SI ASISTIÓ' : 'NO ASISTIÓ'} placement="top">
                            {p.isAttention ? < CheckCircleIcon style={{ color: COLOR_GREEN, cursor: 'pointer' }} /> : <CancelIcon style={{ color: COLOR_BUTTON_MAB, cursor: 'pointer' }} />}
                          </Tooltip>
                        </TableCell> 
                        <td align="center">
                          <SubItemMenuPay
                            row={p}
                            dataHead={row}
                            handleApproveRequest={handleClickAprobarSolicitud}
                            handleCancelRequest={handleCancelRequest}
                            handleChangeSendMsgWssp={handleChangeSendMsgWssp}
                            disabled={p.isFlag}
                          />
                        </td>
                      </TableRow>

                    </>
                  ))} */}
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