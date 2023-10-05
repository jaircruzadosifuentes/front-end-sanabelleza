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
import { convertDateTimeToDate } from 'src/utils/utils';
import WrappedMenuItems from './wrappedMenuItems';
import MenuItemSesion from './menuItemSesion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB } from 'src/config/config';
import { COLOR_GREEN } from 'src/utils/constants';
import Tooltip from '@mui/material/Tooltip';
import { Label } from 'src/components/atoms';
import { ButtonFormControl } from 'src/components/molecules';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';

function Row({
  row = {},
  handleClickAprobarSolicitud,
  handleCancelRequest,
  index = 0,
  typeList = 0,
  handleSendWhatsapp,
  handleChangeSendMsgWssp,
  handleRescheduleAppointment
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
        <TableCell align="left">{`${row.person.surnames} ${row.person.names}`}</TableCell>
        <TableCell align="center">{row.person.age} años</TableCell>
        {/* <TableCell align="center">{row.patientCode}</TableCell> */}
        <TableCell align="center">{row.patientState.description}</TableCell>
        <td>
          <WrappedMenuItems
            row={row}
            handleApproveRequest={handleClickAprobarSolicitud}
            handleCancelRequest={handleCancelRequest}
            typeList={typeList}
          />
        </td>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" >
                Contacto
              </Typography>
              <div className='row'>
                <div className='col-md-4'>
                  <Label title={'Celular'} />: <span>{row.cellphone} </span>
                </div>
                <div className='col-md-4'>
                  <Label title={'Operador Celular'} />: <span>{row.operator} </span>
                </div>
                <div className='col-md-4'>
                  <Label title={'Email'} />: <span>{(row.email)}</span>
                </div>
                <div className='col-md-6'>
                  <div className="btn-group">
                    <ButtonFormControl
                      title="Enviar WhatsApp"
                      color='btn btn-success'
                      onClick={(e) => handleSendWhatsapp(e, row.cellphone)}
                      type={11}
                    />
                  </div>&nbsp;
                  <div className="btn-group">
                    <ButtonFormControl
                      title="Enviar Email"
                      color='btn btn-primary'
                      type={12}
                      disabled
                    />
                  </div>&nbsp;
                </div>
              </div>
            </Box>
            <hr />
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sesiones programadas ({(row.patientProgresses.length)})
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Fecha programada</TableCell>
                    <TableCell align="center">Hora programada</TableCell>
                    <TableCell align="center">Nro Sesión</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">¿Asistió?</TableCell>
                    <TableCell align="center">¿Fue Atendido?</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.patientProgresses.map((p, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="center">
                          {convertDateTimeToDate(p.dateOfAttention)}
                        </TableCell>
                        <TableCell align="center">{p.hourOffAttention} {p.systemHour}</TableCell>
                        <TableCell align="center">{p.sessionNumber}</TableCell>
                        <TableCell align="center">
                          {p.state}  &nbsp;
                          {
                            p.isFlag ?
                            <Tooltip title={"Histórico de notificaciones emitidas a usuario, para reprogramación."} placement="top">
                              <RuleFolderIcon style={{color: COLOR_BLUE_MAB, cursor: 'pointer'}} />
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
                          <MenuItemSesion
                            row={p}
                            dataHead={row}
                            handleApproveRequest={handleClickAprobarSolicitud}
                            handleCancelRequest={handleCancelRequest}
                            handleChangeSendMsgWssp={handleChangeSendMsgWssp}
                            disabled={p.isFlag}
                            disabledAttention={p.isAttention}
                            handleRescheduleAppointment={handleRescheduleAppointment}
                          />
                        </td>
                      </TableRow>

                    </>
                  ))}
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
  handleRescheduleAppointment: PropTypes.func,
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
  handleChangeSendMsgWssp,
  handleRescheduleAppointment
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nro</TableCell>
            <TableCell align="left">Paciente</TableCell>
            <TableCell align="center">Edad</TableCell>
            {/* <TableCell align="center">Código del Paciente</TableCell> */}
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
              handleRescheduleAppointment={handleRescheduleAppointment}
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
  handleRescheduleAppointment: PropTypes.func,
};