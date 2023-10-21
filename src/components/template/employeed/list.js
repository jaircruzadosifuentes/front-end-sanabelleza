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
import { Badge } from 'src/components/atoms';
import ItemList from './item-list';
import { Fragment } from 'react';
import { TablePagination } from '@mui/material';
import ImgProfile from 'src/components/organism/img-profile';
import NameUser from 'src/components/organism/name-user';

function Row({
  row = {},
  pendingApproval = false,
  handleApproveContract,
  handleEditEmployeed
}) {
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">
          <div className='row'>
            <div className='col-md-2'>
              <ImgProfile profile={row.person} />
            </div>
            <div className='col-md-10 mt-1'>
              <div className='row'>
                <div className='col-md-12'>
                  <NameUser profile={row} employeed/>
                </div>
                <div className='col-md-12'>
                  <span>
                    Edad: {row.person?.age} años.
                  </span>
                </div>
                <div className='col-md-12'>
                  <span>
                    Usuario acceso: {row.user}
                  </span>
                </div>
                <div className='col-md-12'>
                  <Badge text='LIBRE' value={1} />
                </div>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell align="center">
          <span>
            {row.role?.name}
          </span>
        </TableCell>
        <TableCell align="center">
          <span>
            {row.role?.area?.areaDescription}
          </span>
        </TableCell>
        <TableCell align="center">
          <span>
            {row.campus?.name}
          </span>
        </TableCell>
        {/* <TableCell align="center">
          <span>
            {formatDecimales(row?.vacationDays)} días acumulados.
          </span>
        </TableCell> */}
        {/* <TableCell align="center">
          <span>
            S/.{formatDecimales(row?.salary?.mountSalary)}
          </span>
        </TableCell> */}
        <TableCell align="center">
          <span>
            {convertDateTimeToDate(row.admisionDate)}
          </span>
        </TableCell>
        <TableCell align="center">
          <Badge text={row.state} value={1} />
        </TableCell>
        <TableCell align="center">
          {
            pendingApproval?
            <ItemList 
              row={row} 
              handleApproveContract={handleApproveContract} 
              pendingApproval={pendingApproval} 
            />: ''
          }
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  patientId: PropTypes.number,
  row: PropTypes.any,
  pendingApproval: PropTypes.bool,
  handleApproveContract: PropTypes.func,
  handleEditEmployeed: PropTypes.func,
};
export default function List({
  rows = [],
  pendingApproval = false,
  handleApproveContract,
  handleEditEmployeed
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
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size='large'>
          <TableHead>
            <TableRow>
              <TableCell align="center">Empleado(a) - Datos Generales</TableCell>
              <TableCell align="center">Cargo</TableCell>
              <TableCell align="center">Area</TableCell>
              <TableCell align="center">Sede</TableCell>
              {/* <TableCell align="center">Nro días Vacaciones</TableCell> */}
              {/* <TableCell align="center">Sueldo (S/.)</TableCell> */}
              <TableCell align="center">Fecha de Ingreso</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? rows.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ).map((row, index) => (
              <Row
                key={index}
                row={row}
                pendingApproval={pendingApproval}
                handleApproveContract={handleApproveContract}
                handleEditEmployeed={handleEditEmployeed}
              />
            )) :
              <TableRow>
                <TableCell align="center">No existe información para mostrar.</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
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
    </Fragment>
  );
}
List.propTypes = {
  rows: PropTypes.array,
  pendingApproval: PropTypes.bool,
  handleApproveContract: PropTypes.func,
  handleEditEmployeed: PropTypes.func,
};