import React, { useEffect, useState } from "react";
import { Title } from "src/components/atoms";
import CardAmountDetail from "./card-amount-detail";
import { ButtonFormControl } from "src/components/molecules";
import List from "./list";

export default function Manager() {
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    let data = [
      {
        id: 1,
        value: 'MONTO APERTURADO',
        contador: 11
      },
      {
        id: 2,
        value: 'MONTO EGRESO',
        contador: 11
      },
      {
        id: 2,
        value: 'MONTO VENDIDO',
        contador: 11
      },
      {
        id: 2,
        value: 'MONTO ESPERADO',
        contador: 11
      },
    ];
    setAmounts(data)
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <Title type={'h1'} value={'CUADRE DE CAJA CHICA'} />
        </div>
        <div className="col-md-3 text-center">
          <h3>Fecha actual: 07/10/2023</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9">
          <CardAmountDetail
            rows={amounts}
          />
        </div>
        <div className="col-md-3">
          <div className="row">
            <div className="col-md-6 mt-4 mb-4 text-center">
              <ButtonFormControl
                title="Cerrar Caja Chica"
                color='btn btn-dark btn-lg mt-1 mb-1'
                type={17}
              />
            </div>
            <div className="col-md-6 mt-4 mb-4 text-center">
              <ButtonFormControl
                title="Imprimir detalle"
                color='btn btn-success btn-lg mt-1 mb-1'
                type={10}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <List />
        </div>  
      </div>
    </div>
  )
}