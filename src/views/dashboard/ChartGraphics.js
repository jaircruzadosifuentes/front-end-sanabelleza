import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from 'prop-types';

function ChartGraphics({
  categoryTTOReportMen = []
}) {
  const lstPrimerAnalisis = categoryTTOReportMen[0]
  const lstPrimerAnalisisAux = []

  for (const key in lstPrimerAnalisis) {
    if (lstPrimerAnalisis.hasOwnProperty(key)) {
      const element = lstPrimerAnalisis[key];
      lstPrimerAnalisisAux.push(element)
    }
  }
  const lstEnTratamiento = categoryTTOReportMen[1]
  const lstEnTratamientoAux = []

  for (const key in lstEnTratamiento) {
    if (lstEnTratamiento.hasOwnProperty(key)) {
      const element = lstEnTratamiento[key];
      lstEnTratamientoAux.push(element)
    }
  }
  const lstTratamientoFinalizado = categoryTTOReportMen[2]
  const lstTratamientoFinalizadoAux = []

  for (const key in lstTratamientoFinalizado) {
    if (lstTratamientoFinalizado.hasOwnProperty(key)) {
      const element = lstTratamientoFinalizado[key];
      lstTratamientoFinalizadoAux.push(element)
    }
  }
  const options = {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'string',
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    },
    tooltip: {
      x: {
        format: 'dd'
      },
    },
  }
  const series = 
  [
    {
      name: 'Primer Análisis',
      data: lstEnTratamientoAux
    },
    {
      name: 'En tratamiento',
      data: lstPrimerAnalisisAux
    }
    , 
    {
      name: 'Tratamiento Finalizado',
      data: lstTratamientoFinalizadoAux
    }
  ]
  return (
    <div className="row">
      <div className="col mixed-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          width="100%"
        />
      </div>
    </div>
  );
}
ChartGraphics.propTypes = {
  categoryTTOReportMen: PropTypes.array,
};
export default ChartGraphics