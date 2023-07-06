import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertDateTimeToDate } from 'src/utils/utils';
import { ButtonFormControl } from 'src/components/molecules';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLOR_BUTTON_MAB } from 'src/config/config';
import { COLOR_GREEN } from 'src/utils/constants';

function Row({
  row = {},
  handleChangeCaptureIdPatientAprrove,
}) {

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">{`${row.patientNew.surNames}/${row.patientNew.names}`}</TableCell>
        <TableCell align="center">{parseInt(row.dues)}</TableCell>
        <TableCell align="center">{row.mountDue}</TableCell>
        <TableCell align="left">{convertDateTimeToDate(row.initialDate)}</TableCell>
        <TableCell align="left">
          <div className='row'>
            <div className='col-md-10'>
              <span>{row.state}</span>
            </div>
          </div>
        </TableCell>
        <TableCell align="left">
          <div className='row'>
            <div className='col-md-2'>
              {row.state === 'Pendiente' ? <CancelIcon style={{color: COLOR_BUTTON_MAB}} />: <CheckCircleIcon style={{color: COLOR_GREEN}}/>}
            </div>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
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
export default function ListScheduleForPatient({
  rows = [],
  handleCloseModalSchedule
}) {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size='small'>
            <TableHead>
              <TableRow>
                <TableCell align="left">Paciente</TableCell>
                <TableCell align="center">Nro Cuota</TableCell>
                <TableCell align="center">Monto a Pagar</TableCell>
                <TableCell align="left">Fecha de pago</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0? rows.map((row) => (
                <Row
                  key={row.nro}
                  row={row}
                />
              )): <span>No existen datos para mostrar.</span>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='row mt-2 mb-2'>
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Imprimir"
                color='btn btn-success'
                type={10}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                type={2}
                onClick={handleCloseModalSchedule}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}
ListScheduleForPatient.propTypes = {
  rows: PropTypes.array,
  handleCloseModalSchedule: PropTypes.func,
};