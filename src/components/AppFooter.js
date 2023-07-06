import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://sanabelleza.com" target="_blank" rel="noopener noreferrer">
          SanaBelleza
        </a>
        <span className="ms-1">&copy; {new Date().getFullYear()} Sana Belleza.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Desarrollado por</span>
        <a href="https://sanabelleza.com" target="_blank" rel="noopener noreferrer">
          Jair Cruzado Sifuentes
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
