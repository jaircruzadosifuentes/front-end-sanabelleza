import React from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useGetCountPatientsType } from './Hooks'
import Greeting from 'src/components/organism/greeting'
import ChartGraphics from './ChartGraphics';
import { useGetCategoryTTOReportMensual } from 'src/api/hooks/common/common-hooks'
import { getTitle } from 'src/utils/utils';

const Dashboard = (props) => {
  const { patients } = useGetCountPatientsType(props);
  const { categoryTTOReportMen } = useGetCategoryTTOReportMensual(props);
  
  getTitle('Dashboard');

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12'>
          <Greeting />
        </div>
        <div className='col-md-12'>
          <WidgetsDropdown rows={patients} />
        </div>
        <div className='col-md-6 mt-3 mb-3'>
          <span>Categorías del TTO. Fisioterapeútico</span>
          <ChartGraphics 
            categoryTTOReportMen={categoryTTOReportMen}
          />
        </div>
        {/* <div className='col-md-6'>
          <TimelineCharts />
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard
