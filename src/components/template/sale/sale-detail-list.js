import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatDecimales } from 'src/utils/utils';
import { Fragment } from 'react';
import { TablePagination, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { COLOR_BUTTON_MAB, COLOR_GREEN } from 'src/config/config';

function Row({
  row = {},
  handleEditar,
  nro = 0,
  handleDisabledEnabled,
  handleRemoveItemProductAdd,
  handleChangeCantidad,
  enabled = false,
  handleAddDecreaseQuantity
}) {

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">{nro}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="right">
          <div className='row'>
            <div className='col-md-6 mt-2'>
              <span>
                {row.cantidad}
              </span>
            </div>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-md-12' onClick={(e) =>handleAddDecreaseQuantity(e, row, 1)}>
                  <AddCircleIcon style={{color: COLOR_GREEN, cursor: 'pointer'}} />
                </div>
                <div className='col-md-12' onClick={(e) =>handleAddDecreaseQuantity(e, row, 2)}>
                  <RemoveCircleIcon style={{color: COLOR_BUTTON_MAB, cursor: 'pointer'}} />
                </div>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell align="center">S/.{formatDecimales(row.precio)}</TableCell>
        <TableCell align="center">S/.{formatDecimales(row.total)}</TableCell>
        <TableCell align="center">
          <Tooltip title='Quitar producto'>
            <div onClick={(e) => handleRemoveItemProductAdd(e, row)}>
              <RemoveCircleIcon style={{ cursor: 'pointer', color: COLOR_BUTTON_MAB }} />
            </div>
          </Tooltip>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  openEditCant: PropTypes.bool,
  enabled: PropTypes.bool,
  handleChangeCantidad: PropTypes.func,
  handleAddDecreaseQuantity: PropTypes.func,
  handleRemoveItemProductAdd: PropTypes.func,
  handleDisabledEnabled: PropTypes.func,
  handleEditar: PropTypes.func,
  nro: PropTypes.number,
  row: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    dayReserved: PropTypes.string.isRequired,
    hourReserved: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    timeDemoration: PropTypes.number.isRequired,
    nro: PropTypes.string.isRequired,
  }).isRequired,
};
export default function SaleDetailList({
  rows = [],
  handleChangeCaptureIdPatientAprrove,
  selectedValue,
  handleEditar,
  handleDisabledEnabled,
  handleRemoveItemProductAdd,
  handleChangeCantidad,
  enabled = false,
  handleAddDecreaseQuantity
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Fragment>
      <TableContainer component={Paper} style={{ height: '400px' }}>
        <Table aria-label="collapsible table" size='medium'>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nro</TableCell>
              <TableCell align="left">Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Acción</TableCell>
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
                handleChangeCaptureIdPatientAprrove={handleChangeCaptureIdPatientAprrove}
                selectedValue={selectedValue}
                handleEditar={handleEditar}
                handleDisabledEnabled={handleDisabledEnabled}
                handleRemoveItemProductAdd={handleRemoveItemProductAdd}
                handleChangeCantidad={handleChangeCantidad}
                enabled={enabled}
                handleAddDecreaseQuantity={handleAddDecreaseQuantity}
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
SaleDetailList.propTypes = {
  rows: PropTypes.array,
  handleChangeCaptureIdPatientAprrove: PropTypes.func,
  selectedValue: PropTypes.string,
  handleEditar: PropTypes.func,
  handleDisabledEnabled: PropTypes.func,
  handleRemoveItemProductAdd: PropTypes.func,
  handleChangeCantidad: PropTypes.func,
  handleAddDecreaseQuantity: PropTypes.func,
  enabled: PropTypes.bool,
  openEditCant: PropTypes.bool,
};