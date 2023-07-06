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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function Row({
  row = {},
  handleChangeCaptureIdPatientAprrove,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell onClick={(e) => handleChangeCaptureIdPatientAprrove(e, row)}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nro}
        </TableCell>
        <TableCell align="left">{row.patientName}</TableCell>
        <TableCell align="left">{convertDateTimeToDate(row.dayReserved)}</TableCell>
        <TableCell align="left">{row.hourReserved}</TableCell>
        <TableCell align="left">{row.reason}</TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" >
                Detalle del paciente
              </Typography>
              <div className='row'>
                <div className='col-md-4'>
                  <Label title={'Nombres y apellidos'} />: <span>{row.patientName}</span>
                </div>
                <div className='col-md-2'>
                  <Label title={'Dia de atención'} />: <span>{convertDateTimeToDate(row.dayReserved)}</span>
                </div>
                <div className='col-md-2'>
                  <Label title={'Hora reservada'} />: <span>{row.hourReserved}</span>
                </div>
                <div className='col-md-2'>
                  <Label title={'Tiempo duración'} />: <span>{row.timeDemoration} minutos</span>
                </div>
              </div>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Persona a cargo de la atención
              </Typography>
              <div className='row'>
                <div className='col-md-2'>
                  <Label title={'Cargo'} />: <span>{row.employeed.role.name}</span>
                </div>
                <div className='col-md-4'>
                  <Label title={'Nombres y apellidos'} />: <span>{row.employeed.person.surnames}/{row.employeed.person.names}</span>
                </div>
              </div>
            </Box>
            {/* <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Historia clínica
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Patología</TableCell>
                    <TableCell align="left">Diagnóstico brindado</TableCell>
                    <TableCell align="left">Paciente</TableCell>
                    <TableCell align="left">Celular</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box> */}
          </Collapse>
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
export default function List({
  rows = [],
  handleChangeCaptureIdPatientAprrove
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nro</TableCell>
            <TableCell align="left">Paciente</TableCell>
            <TableCell align="left">Dia atención</TableCell>
            <TableCell align="left">Hora reservada</TableCell>
            <TableCell align="left">Motivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row 
              key={row.nro} 
              row={row} 
              handleChangeCaptureIdPatientAprrove={handleChangeCaptureIdPatientAprrove}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
};