import React, { useState } from 'react'
import { CFooter } from '@coreui/react'
import { COLOR_GREEN } from 'src/config/config'

const AppFooter = () => {
  const [environment, setEnviroment] = useState('DESARROLLO')
  return (
    <CFooter>
      <div>
      Copyright
        <span className="ms-1">&copy; {new Date().getFullYear()} <a href="https://sanabelleza.com" target="_blank" rel="noopener noreferrer">
          SanaBelleza
        </a>. </span>
      </div>
      <div className="ms-center">
        <span className="me-1">Conectado a <span style={{ fontWeight: 'bold', color: COLOR_GREEN }}>***{`${environment}`}****</span></span>
      </div>
      <div className="ms-right">
        <span className="me-1">Desarrollado por</span>
        <a href="https://sanabelleza.com" target="_blank" rel="noopener noreferrer">
          Ederd. J Cruzado Sifuentes
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
