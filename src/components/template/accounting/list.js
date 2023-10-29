import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatDecimales } from 'src/utils/utils';
import { Badge } from 'src/components/atoms';
// import WrappedMenuItems from './wrappedMenuItems';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
        <TableCell align="left">{row?.operationType?.name}</TableCell>
        <TableCell align="center">{row.voucherDocument?.label}</TableCell>
        <TableCell align="center">{row.serie + ' - ' + row.number}</TableCell>
        <TableCell align="left">S/. {formatDecimales(row.total)}</TableCell>
        <TableCell align="center">{(row?.payMethod?.description)}</TableCell>
        <TableCell align="left">
          <Badge text='EMITIDO' value={1} />
        </TableCell>
       
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  index: PropTypes.number,
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
            <TableCell>Nro</TableCell>
            <TableCell align="left">Concepto</TableCell>
            <TableCell align="center">Tipo comprobante</TableCell>
            <TableCell align="center">Nro comprobante</TableCell>
            <TableCell align="left">Monto</TableCell>
            <TableCell align="center">Modo de pago</TableCell>
            <TableCell align="left">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row, index) => (
            <Row
              key={row.nro}
              row={row}
              index={index}
              handleClickAprobarSolicitud={handleClickAprobarSolicitud}
              handleCancelRequest={handleCancelRequest}
            />
          )) : 
            ''
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