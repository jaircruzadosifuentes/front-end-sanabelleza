import React from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { getTitle } from 'src/utils/utils'
import { useGetCountPatientsType } from './Hooks'
import Greeting from 'src/components/organism/greeting'


const Dashboard = (props) => {
  const { patients } = useGetCountPatientsType(props);
  getTitle('Dashboard');
  return (
    <> 
      <Greeting />
      <WidgetsDropdown rows={patients} />
    </>
  )
}

export default Dashboard
