import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'

const WidgetsDropdown = ({
  rows = [],
  index
}) => {
  let navigate = useNavigate();
  const handleRedirect = (e, url) => {
    navigate(url);
  }
  return (
    <CRow>
      {
        rows.map((r, index) => {
          return (
            <CCol sm={6} lg={3} key={index}>
              <CWidgetStatsA
                className="mb-2"
                color={r.type}
                value={
                  <h1>
                    {r.size}
                  </h1>
                }
                title={r.description}
                action={
                  <CDropdown alignment="end" style={{cursor: 'pointer'}}>
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={(e) => handleRedirect(e, r.url)}>Ver Detalle</CDropdownItem>
                      <CDropdownItem disabled>Imprimir Sección (Trabajando...)</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartLine
                    className="mt-1 mx-1"
                    style={{ height: '20px' }}
                    // data={{
                    //   labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Agosto', 'Noviembre', 'Diciembre'],
                    //   datasets: [
                    //     {
                    //       label: `${r.description}`,
                    //       backgroundColor: 'transparent',
                    //       borderColor: 'rgba(255,255,255,.55)',
                    //       pointBackgroundColor: getStyle(`--cui-${r.type}`),
                    //       data: [65, 59, 84, 84, 51, 55, 40, 59, 84, 84, 1, 2],
                    //     },
                    //   ],
                    // }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: 30,
                          max: 89,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                          tension: 0.4,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
          )
        })
      }
    </CRow>
  )
}
WidgetsDropdown.propTypes = {
  rows: PropTypes.array,
  index: PropTypes.number,
  
};
export default WidgetsDropdown
