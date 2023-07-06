import React from 'react'

import { convertDateTimeToDate } from 'src/utils/utils'
import { CProgress, CRow, CTableDataCell, CTableRow } from '@coreui/react'
import { useGetAllPatientsInPercentajeTreatment } from 'src/views/dashboard/Hooks'
import PropTypes from 'prop-types';

const ProgressBarSesion = ({
  patientId = 0
}) => {
  const { patientsTreatMent } = useGetAllPatientsInPercentajeTreatment(patientId);
  return (
    <div className='row mt-2'>
      {patientsTreatMent.map((item, index) => (
        <div className='col-md-12' key={index}>
          <div className="clearfix">
            <div className="float-start">
              <strong>{item.percentaje}%</strong>&nbsp;&nbsp;&nbsp;
            </div>
            <div className="float-end">
              <span className="text-medium-emphasis">Fecha Inicio:{convertDateTimeToDate(item.dateInitial)} - Fecha Fin:{convertDateTimeToDate(item.dateFinished)}</span>
            </div>
          </div>
          <CProgress thin color={'success'} value={item.percentaje} />
        </div>
      ))}

    </div>
  )
}
ProgressBarSesion.propTypes = {
  patientId: PropTypes.number
};
export default ProgressBarSesion
