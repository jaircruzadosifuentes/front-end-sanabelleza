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
import ItemList from './item-list';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB } from 'src/config/config';
import { COLOR_GREEN } from 'src/utils/constants';
import Tooltip from '@mui/material/Tooltip';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import SubItemList from './sub-item-list';
import ProgressBarSesion from '../../../organism/progress-bar-sesion';
import NameUser from 'src/components/organism/name-user';
import { TablePagination } from '@mui/material';

function Row({
  row = {},
  handleClickAprobarSolicitud,
  handleCancelRequest,
  index = 0,
  handleViewShedulePay,
  handleChangeSendMsgWssp,
  handleViewAdvanceClinic,
  handleStarEvaluation,
  handleEditSesion
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
        <TableCell align="left">
          <div className='row'>
            <div className='col-md-12 mt-1'>
              <div className='row'>
                <div className='col-md-12'>
                  <NameUser patient profile={row} />
                </div>
                <div className='col-md-12'>
                  <span>
                    Edad: {row.person.age} años
                  </span>
                </div>
                <div className='col-md-12'>
                  <span>
                    Paquete y Frecuencia: {row.clinicalHistory.packetsOrUnitSessions.abbreviation} - {row.clinicalHistory.frecuency.frecuencyDescription}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <ProgressBarSesion
            patientId={row.patientId}
          />
        </TableCell>
        <TableCell align="center">
          <span>
            {row.person.gender}
          </span>
        </TableCell>
        <TableCell align="center">
          <span>
            {row.patientState.description}
          </span>
        </TableCell>
        <td>
          <ItemList
            row={row}
            handleViewShedulePay={handleViewShedulePay}
            handleViewAdvanceClinic={handleViewAdvanceClinic}
          />
        </td>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit >
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
                          <Tooltip title={p.isAttention ? 'FUE ATENDIDO' : 'NO ATENDIDO'} placement="top">
                            {p.isAttention ? < CheckCircleIcon style={{ color: COLOR_GREEN, cursor: 'pointer' }} /> : <CancelIcon style={{ color: COLOR_BUTTON_MAB, cursor: 'pointer' }} />}
                          </Tooltip>
                        </TableCell>
                        <td align="center">
                          <SubItemList
                            row={p}
                            dataHead={row}
                            handleApproveRequest={handleClickAprobarSolicitud}
                            handleCancelRequest={handleCancelRequest}
                            handleChangeSendMsgWssp={handleChangeSendMsgWssp}
                            disabled={p.isFlag}
                            handleStarEvaluation={handleStarEvaluation}
                            disabledAttention={p.isAttention}
                            handleEditSesion={handleEditSesion}
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
  patientId: PropTypes.number,
  handleStarEvaluation: PropTypes.func,
  handleEditSesion: PropTypes.func,
  handleViewAdvanceClinic: PropTypes.func,
  handleViewShedulePay: PropTypes.func,
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
  handleViewShedulePay,
  handleViewAdvanceClinic,
  handleStarEvaluation,
  handleEditSesion
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
    <React.Fragment>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size='large'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nro</TableCell>
              <TableCell align="left">Paciente</TableCell>
              {/* <TableCell align="center">Hoja Consentimiento</TableCell> */}
              <TableCell align="center">Progreso Clínico</TableCell>
              <TableCell align="center">Género</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? rows.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ).map((row, index) => (
              <Row
                key={row.nro}
                row={row}
                handleClickAprobarSolicitud={handleClickAprobarSolicitud}
                handleCancelRequest={handleCancelRequest}
                index={index}
                handleViewShedulePay={handleViewShedulePay}
                handleViewAdvanceClinic={handleViewAdvanceClinic}
                handleStarEvaluation={handleStarEvaluation}
                handleEditSesion={handleEditSesion}
              />
            )) : <span>No existen datos para mostrar</span>
            }
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
    </React.Fragment>
  );
}
List.propTypes = {
  typeList: PropTypes.number,
  rows: PropTypes.array,
  handleClickAprobarSolicitud: PropTypes.func,
  handleChangeSendMsgWssp: PropTypes.func,
  handleCancelRequest: PropTypes.func,
  handleViewShedulePay: PropTypes.func,
  handleViewAdvanceClinic: PropTypes.func,
  handleStarEvaluation: PropTypes.func,
  handleEditSesion: PropTypes.func,
};