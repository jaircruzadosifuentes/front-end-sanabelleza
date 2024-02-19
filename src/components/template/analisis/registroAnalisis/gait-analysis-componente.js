import React, { Fragment } from "react";
import { COLOR_GREEN, COLOR_YELLOW } from "src/config/config";

export default function GaiAnalysisComponente() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-7">
          <img src="../../images/avatars/paso-marcha.jpg"
            className="rounded float-left img-responsive"
            style={{ width: '100%' }}
            alt="cuerpo humano"
          />
        </div>
        <div className="col-md-3"></div>
      </div>
      <div className="row mt-4">
        <div className="col-md-2"></div>
        <div className="col-md-8 table-responsive">
          <TableStartOfTheMarch />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
        <div className="col-md-8 table-responsive">
          <TableStepSymmetry />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
        <div className="col-md-8 table-responsive">
          <TableTrunkAndPosture />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
        <div className="col-md-8 table-responsive">
          <TableFinalResults />
        </div>
        <div className="col-md-2"></div>
      </div>
    </Fragment>
  )
}
const TableFinalResults = () => {
  return (
    <table className="table table-sm table table-bordered">
      <tbody>
        <tr style={{ backgroundColor: COLOR_YELLOW }}>
          <td>
            <b>
              TOTAL MARCHA
            </b>
          </td>
          <td className="text-center">
            <b>12</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>TOTAL</b>
          </td>
          <td className="text-center">
            -
          </td>
        </tr>
        <tr style={{ backgroundColor: COLOR_GREEN, color: 'white' }}>
          <td>
            <b>TOTAL GENERAL</b>
          </td>
          <td className="text-center">
            <b>28</b>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
const TableTrunkAndPosture = () => {
  return (
    <table className="table table-sm table table-bordered">
      <tbody>
        <tr>
          <td>
            <b>
              TRONCO
            </b>
          </td>
          <td>

          </td>
        </tr>
        <tr>
          <td>
            Marcado balanceo o utiliza ayudas
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            No balanceo pero hay flexión de rodillas, espalda o extensión hacia afuera de los brazos
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            No balanceo ni flexión, y tampoco utiliza ayudas
          </td>
          <td className="text-center">
            2
          </td>
        </tr>
        <tr>
          <td>
            <b>POSTURA EN LA MARCHA</b>
          </td>
          <td className="text-center">
          </td>
        </tr>
        <tr>
          <td>
            Talones separados
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            Talones casi se tocan mientras camina
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
      </tbody>
    </table>
  )
}
const TableStepSymmetry = () => {
  return (
    <table className="table table-sm table table-bordered">
      <tbody>
        <tr>
          <td>
            <b>
              SIMETRÍA DEL PASO
            </b>
          </td>
          <td>

          </td>
        </tr>
        <tr>
          <td>
            La longitud del paso con el pie derecho e izquierdo es diferente (estimada)
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            Los pasos son iguales en longitud
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            <b>CONTINUIDAD DE LOS PASOS</b>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
            Para, o hay discontuinidad entre los pasos
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            Los pasos son continuos
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            <b>TRAYECTORIA</b> <br />
            <small>(Estimada en relación a las baldosas del suelo de 30cm; se observa la desviación de un pie en 3 mts de distancia)</small>
          </td>
          <td className="text-center">
          </td>
        </tr>
        <tr>
          <td>
            Marca desviación
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            Desviación moderada
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            Derecho sin utilizar ayudas
          </td>
          <td className="text-center">
            2
          </td>
        </tr>
      </tbody>
    </table>
  )
}
const TableStartOfTheMarch = () => {
  return (
    <table className="table table-sm table table-bordered">
      <tbody>
        <tr>
          <td>
            <b>
              INICIO DE LA MARCHA
            </b>
            (Inmediatamente después de decir &rdquo;caminé&rdquo;)
          </td>
          <td>

          </td>
        </tr>
        <tr>
          <td>
            Duda o múltiples intentos para comenzar
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            No vacilante
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            <b>LONGITUD Y ALTURA DEL PASO</b>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <td>
            El pie derecho no sobrepasa al izquierdo con el paso en la fase de balanceo
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            El pie derecho no sobrepasa al izquierdo con el paso
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            El pie derecho no se levanta completamente del suelo con el paso en la fase de balanceo
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            El pie derecho se levanta completamente
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            El pie izquierdo no sobrepasa el derecho con el paso en la fase de balanceo
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            El pie izquierdo sobrepasa al derecho con el paso
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
        <tr>
          <td>
            El pie izquierdo no se levanta completamente del suelo con el paso en la fase de balanceo
          </td>
          <td className="text-center">
            0
          </td>
        </tr>
        <tr>
          <td>
            El pie izquierdo se levanta completamente
          </td>
          <td className="text-center">
            1
          </td>
        </tr>
      </tbody>
    </table>
  )
}