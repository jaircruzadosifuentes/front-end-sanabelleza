import React, { Fragment, useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { fuDevolverDatosUsuario } from 'src/utils/utils'
import { useGetAllOptions, useGetRoutes } from 'src/api/hooks/common/common-hooks'
import PropTypes from 'prop-types';

const DefaultLayout = () => {

  const {options} = useGetAllOptions(parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`))
  const {routes} = useGetRoutes(parseInt(`${JSON.parse(fuDevolverDatosUsuario()).id}`))

 

  return (
    <div>
      <AppSidebar 
        options={options} 
      />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 px-3" >
          <AppContent 
            routes={routes}
          />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
DefaultLayout.propTypes = {
  options: PropTypes.array,
};

export default DefaultLayout
