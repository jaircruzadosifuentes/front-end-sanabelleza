import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { fuDevolverDatosUsuario } from 'src/utils/utils'
import { useGetAllOptions, useGetRoutes } from 'src/api/hooks/common/common-hooks'
import PropTypes from 'prop-types';
import { useGetAllConfigs } from 'src/hooks/common/common-hook';

const DefaultLayout = () => {
  const {options} = useGetAllOptions(parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`))
  const {routes} = useGetRoutes(parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`))
  const { configs } = useGetAllConfigs();
  return (
    <div>
      <AppSidebar 
        options={options} 
        configs={configs}
      />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader 
          routes={routes}
        />
        <div className="body flex-grow-1 px-3" >
          <AppContent 
            routes={routes}
          />
        </div>
        <AppFooter 
          configs={configs}
        />
      </div>
    </div>
  )
}
DefaultLayout.propTypes = {
  options: PropTypes.array,
};

export default DefaultLayout
