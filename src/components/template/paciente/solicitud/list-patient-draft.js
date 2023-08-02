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
import { Label } from 'src/components/atoms';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { COLOR_BUTTON_MAB, COLOR_GREEN, COLOR_YELLOW } from 'src/config/config';
import { Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Row({
  row = {},
  handleClickAprobarSolicitud,
  handleCancelRequest
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
          {row.correlative}
        </TableCell>
        <TableCell align="left">{row.person.surnames} {row.person.names}</TableCell>
        <TableCell align="left">{convertDateTimeToDate(row.patientSolicitude.dateAttention)}</TableCell>
        <TableCell align="left">{row.patientSolicitude.hourAttention}</TableCell>
        <TableCell align="left">{row.reason}</TableCell>
        <TableCell align="left">{row.state}</TableCell>
        {/* <td>
          <WrappedMenuItems
            row={row}
            handleApproveRequest={handleClickAprobarSolicitud}
            handleCancelRequest={handleCancelRequest}
          />
        </td> */}
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" >
                Detalle del paciente
              </Typography>
              <div className='row'>
                <div className='col-md-6'>
                  <Label title={'Nombres y apellidos'} />: <span>{row.person.surnames} {row.person.names}</span>
                </div>
                <div className='col-md-2'>
                  <Label title={'Dia de atención'} />: <span>{convertDateTimeToDate(row.patientSolicitude.dateAttention)}</span>
                </div>
                <div className='col-md-2'>
                  <Label title={'Hora reservada'} />: <span>{row.patientSolicitude.hourAttention}</span>
                </div>
                <div className='col-md-2'>
                  <Label title={'Tiempo duración'} />: <span>30 minutos</span>
                </div>
              </div>
            </Box>
            <hr />
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Persona a cargo de la atención
              </Typography>
              <div className='row'>
                <div className='col-md-2'>
                  <Label title={'Cargo'} />: <span>{row.patientSolicitude.employeed.role.name}</span>
                </div>
                <div className='col-md-4'>
                  <Label title={'Nombres y apellidos'} />: <span>{row.patientSolicitude.employeed.person.surnames}/{row.patientSolicitude.employeed.person.names}</span>
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
                    <TableCell align="center">Asistió?</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.patientProgresses.map((p, index) => (
                    <TableRow key={index} style={{ backgroundColor: convertDateTimeToDate(p.dateOfAttention) === convertDateTimeToDate(row.dayReserved) ? COLOR_YELLOW : '' }}>
                      <TableCell component="th" scope="row" align="center">
                        {convertDateTimeToDate(p.dateOfAttention)}
                      </TableCell>
                      <TableCell align="center">{p.hourOffAttention}</TableCell>
                      <TableCell align="center">{p.sessionNumber}</TableCell>
                      <TableCell align="center">{p.typeAttention.description}</TableCell>
                      <TableCell align="center">{p.isAttention ? 'SI' : 'NO'}</TableCell>
                      <TableCell align="center">
                        <Tooltip title={p.isAttention ? 'SI ASISTIÓ' : 'NO ASISTIÓ'} placement="top">
                          {p.isAttention ? < CheckCircleIcon style={{ color: COLOR_GREEN, cursor: 'pointer' }} /> : <CancelIcon style={{ color: COLOR_BUTTON_MAB, cursor: 'pointer' }} />}
                        </Tooltip>
                      </TableCell>
                    </TableRow>
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
  handleClickAprobarSolicitud: PropTypes.func,
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
  typeList = 0
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Paciente</TableCell>
            <TableCell align="left">Dia atención</TableCell>
            <TableCell align="left">Hora reservada</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row) => (
            <Row
              key={row.nro}
              row={row}
              handleClickAprobarSolicitud={handleClickAprobarSolicitud}
              handleCancelRequest={handleCancelRequest}
            />
          )) : <span>No existen datos para mostrar</span>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  handleClickAprobarSolicitud: PropTypes.func,
  handleCancelRequest: PropTypes.func,
  typeList: PropTypes.number,
};