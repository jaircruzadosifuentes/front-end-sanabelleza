import React from 'react'
import { convertDateTimeToDate } from 'src/utils/utils'
import { useGetAllPatientsInPercentajeTreatment } from 'src/views/dashboard/Hooks'
import PropTypes from 'prop-types';

const ProgressBarSesion = ({
  patientId = 0
}) => {
  const { patientsTreatMent } = useGetAllPatientsInPercentajeTreatment(patientId);
  return (
    <div className='row'>
      {patientsTreatMent.map((item, index) => (
        <div className='col-md-12' key={index}>
          <div className="clearfix">
            <div className="float-end">
              <div className='row'>
                <div className='col-md-6'>
                  <span>Inicio:{convertDateTimeToDate(item.dateInitial)}</span>
                </div>
                <div className='col-md-6'>
                  <span>Fin:{convertDateTimeToDate(item.dateFinished)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="progress mt-2">
            <div className={`progress-bar ${item.percentaje === 100 ? 'bg-success': 'bg-warning'}`} role="progressbar" style={{width: `${item.percentaje}%`}} aria-valuenow={item.percentaje} aria-valuemin="0" aria-valuemax="100">{item.percentaje}%</div>
          </div>
        </div>
      ))}

    </div>
  )
}
ProgressBarSesion.propTypes = {
  patientId: PropTypes.number
};
export default ProgressBarSesion
