import React from 'react'
import { CFooter } from '@coreui/react'
import { COLOR_BLUE_MAB, COLOR_GREEN } from 'src/config/config'
import PropTypes from 'prop-types';

const AppFooter = ({
  configs = {}
}) => {
  return (
    <CFooter>
      <div>
      Copyright 
        <span className="ms-1">&copy; {new Date().getFullYear()} <a href={configs.url} target="_blank" rel="noopener noreferrer">
          {configs.title}
        </a>. </span>
        <small className="me-1">Versión {configs.version}</small>

      </div>
      <div className="ms-center">
        <span className="me-1">Conectado a <span style={{ fontWeight: 'bold', color: configs.environment === 'DESARROLLO' ? COLOR_BLUE_MAB: COLOR_GREEN }}>***{`${configs.environment}`}****</span></span>
      </div>
      <div className="ms-right">
        <span className="me-1">Desarrollado por</span>
        <a href={configs.url} target="_blank" rel="noopener noreferrer">
          {configs.autor}
        </a>
      </div>
    </CFooter>
  )
}
AppFooter.propTypes = {
  configs: PropTypes.object,
};
export default React.memo(AppFooter)
