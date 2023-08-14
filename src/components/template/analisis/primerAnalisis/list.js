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
import WrappedMenuItems from './wrappedMenuItems';
import NameUser from 'src/components/organism/name-user';
function Row({
  row = {},
  index = 0,
  handleStartAnalyzing,
}) {

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="left">
          <NameUser patient profile={row} />
        </TableCell>
        <TableCell align="left">{convertDateTimeToDate(row.patientSolicitude.dateAttention)}</TableCell>
        <TableCell align="left">{row.patientSolicitude.hourAttention}</TableCell>
        <TableCell align="left">{row.reason}</TableCell>
        <TableCell align="left">{row.patientSolicitude.timeAttention} minutos.</TableCell>
        <TableCell align="left">{row.person.age} años.</TableCell>
        <td>
          <WrappedMenuItems 
            row={row} 
            handleStartAnalyzing={handleStartAnalyzing}
          />
        </td>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  handleStartAnalyzing: PropTypes.func,
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
  index: PropTypes.number,
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
  handleChangeCaptureIdPatientAprrove,
  handleStartAnalyzing
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align="left">Paciente</TableCell>
            <TableCell align="left">Dia atención</TableCell>
            <TableCell align="left">Hora reservada</TableCell>
            <TableCell align="left">Motivo</TableCell>
            <TableCell align="left">Tiempo</TableCell>
            <TableCell align="left">Edad</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? rows.map((row, index) => (
            <Row 
              key={row.nro} 
              row={row} 
              index={index}
              handleChangeCaptureIdPatientAprrove={handleChangeCaptureIdPatientAprrove}
              handleStartAnalyzing={handleStartAnalyzing}
            />
          )): <span>No existen datos para mostrar</span>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
  handleStartAnalyzing: PropTypes.func,
};