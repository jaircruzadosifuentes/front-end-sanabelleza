import React from "react";
import { Label } from "src/components/atoms";
import { SelectedFormControl, TextAreaFormControl } from "src/components/molecules";
import { COLOR_BUTTON_MAB, COLOR_YELLOW } from "src/config/config";
import PropTypes from 'prop-types';

const listValores = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 5,
    label: '5'
  },
]

export default function MuscleEvaluationMotionTesting(props) {
  const {
    handleOnChangeInitialValoration,
    handleOnChangeMSupEv1IzqEvaluMusc,
    objMuscleAssessment = {},
    handleOnChangeMSupEv1DerEvaluMusc,
    handleOnChangeMSupEv2IzqEvaluMusc,
    handleOnChangeMSupEv2DerEvaluMusc,
    handleOnChangeMInfEv1IzqEvaluMusc,
    handleOnChangeMInfEv1DerEvaluMusc,
    handleOnChangeMInfEv2IzqEvaluMusc,
    handleOnChangeMInfEv2DerEvaluMusc,
    handleOnChangeTroncoEv1IzqEvaluMusc,
    handleOnChangeTroncoEv1DerEvaluMusc,
    handleOnChangeTroncoEv2IzqEvaluMusc,
    handleOnChangeTroncoEv2DerEvaluMusc,
    handleOnChangeCuelloEv1IzqEvaluMusc,
    handleOnChangeCuelloEv1DerEvaluMusc,
    handleOnChangeCuelloEv2IzqEvaluMusc,
    handleOnChangeCuelloEv2DerEvaluMusc,
    handleOnChangeMSupEv1IzqEvaluGonio,
    handleOnChangeMSupEv1DerEvaluGonio,
    handleOnChangeMSupEv2IzqEvaluGonio,
    handleOnChangeMSupEv2DerEvaluGonio,
    handleOnChangeMInfEv1IzqEvaluGonio,
    handleOnChangeMInfEv1DerEvaluGonio,
    handleOnChangeMInfEv2IzqEvaluGonio,
    handleOnChangeMInfEv2DerEvaluGonio,
    handleOnChangeTroncoEv1IzqEvaluGonio,
    handleOnChangeTroncoEv1DerEvaluGonio,
    handleOnChangeTroncoEv2IzqEvaluGonio,
    handleOnChangeTroncoEv2DerEvaluGonio,
    handleOnChangeCuelloEv1IzqEvaluGonio,
    handleOnChangeCuelloEv1DerEvaluGonio,
    handleOnChangeCuelloEv2IzqEvaluGonio,
    handleOnChangeCuelloEv2DerEvaluGonio
  } = props;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 table-responsive">
          <table className="table table-sm table-bordered">
            <thead className="text-center">
              <th scope="col" width="100px" style={{ backgroundColor: COLOR_YELLOW }}></th>
              <th scope="col" style={{ backgroundColor: COLOR_YELLOW }}>La fuerza del paciente está graduada en una escala del 0-5</th>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">Grupo 5</td>
                <td>Fuerza muscular normal contra resistencia completa.</td>
              </tr>
              <tr>
                <td className="text-center">Grupo 4</td>
                <td>La fuerza muscular está reducida pero la contracción muscular puede realizar un movimiento articular contra resistencia.</td>
              </tr>
              <tr>
                <td className="text-center">Grupo 3</td>
                <td>La fuerza muscular está reducida tanto que el movimiento articular solo puede realizarse contra la gravedad, sin la resistencia del examinador.
                  Por ejemplo, la articulación del codo puede moverse desde extensión completa hasta flexión completa, comenzando con el brazo suspendido al lado del cuerpo.
                </td>
              </tr>
              <tr>
                <td className="text-center">Grupo 2</td>
                <td>Movimiento activo que no puede vencer la fuerza de gravedad. Por ejemplo, el codo puede flexionarse completamente solo cuando el brazo es mantenido en un plano horizontal.
                </td>
              </tr>
              <tr>
                <td className="text-center">Grupo 1</td>
                <td>Esbozo de contracción muscular.
                </td>
              </tr>
              <tr>
                <td className="text-center">Grupo 0</td>
                <td>Ausencia de contracción muscular.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 table-responsive">
          <Label title={'Evaluación muscular'} isBold isTextAlign textAlign="left" />
          <table className="table table-sm">
            <thead className="text-center" >
              <tr style={{ backgroundColor: COLOR_YELLOW }}>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col" style={{ textAlign: 'left' }}>Evaluacion 1</th>
                <th scope="col"></th>
                <th scope="col" style={{ textAlign: 'left' }}>Evaluacion 2</th>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col" style={{ textAlign: 'right' }}>Izquierda</th>
                <th scope="col" style={{ textAlign: 'right' }}>Derecha</th>
                <th scope="col" style={{ textAlign: 'right' }}>Izquierda</th>
                <th scope="col" style={{ textAlign: 'right' }}>Derecha</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">M. SUP</td>
                <td style={{ textAlign: 'center'}}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv1IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv1IzqEvaluMusc)}
                  />
                </td>
                <td style={{ textAlign: 'center'}}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv1DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv1DerEvaluMusc)}
                  />
                </td>
                <td style={{ textAlign: 'center'}}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv2IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv2IzqEvaluMusc)}
                  />
                </td>
                <td style={{ textAlign: 'center'}}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv2DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv2DerEvaluMusc)}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-center">M. INF</td>
                <td style={{ textAlign: 'center'}} >
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv1IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv1IzqEvaluMusc)}
                  />
                </td>
                <td style={{ textAlign: 'center'}} >
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv1DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv1DerEvaluMusc)}
                  />
                </td>
                <td style={{ textAlign: 'center'}}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv2IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv2IzqEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv2DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv2DerEvaluMusc)}
                    />
                </td>
              </tr>
              <tr>
                <td className="text-center">TRONCO</td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv1IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv1IzqEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv1DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv1DerEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv2IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv2IzqEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv2DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv2DerEvaluMusc)}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-center">CUELLO</td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv1IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv1IzqEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv1DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv1DerEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv2IzqEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv2IzqEvaluMusc)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv2DerEvaluMusc}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv2DerEvaluMusc)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6 table-responsive" style={{ height: '100%' }}>
          <Label title={'Evaluación goniométrica'} isBold isTextAlign textAlign="left" />
          <table className="table table-sm">
            <thead className="text-center" >
              <tr style={{ backgroundColor: COLOR_YELLOW }}>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col" style={{ textAlign: 'left' }}>Evaluacion 1</th>
                <th scope="col"></th>
                <th scope="col" style={{ textAlign: 'left' }}>Evaluacion 2</th>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col" style={{ textAlign: 'right' }}>Izquierda</th>
                <th scope="col" style={{ textAlign: 'right' }}>Derecha</th>
                <th scope="col" style={{ textAlign: 'right' }}>Izquierda</th>
                <th scope="col" style={{ textAlign: 'right' }}>Derecha</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">M. SUP</td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv1IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv1IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv1DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv1DerEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv2IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv2IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMSupEv2DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMSupEv2DerEvaluGonio)}
                    />
                </td>
              </tr>
              <tr>
                <td className="text-center">M. INF</td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv1IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv1IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv1DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv1DerEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv2IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv2IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeMInfEv2DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorMInfEv2DerEvaluGonio)}
                    />
                </td>
              </tr>
              <tr>
                <td className="text-center">TRONCO</td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv1IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv1IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv1DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv1DerEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv2IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv2IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeTroncoEv2DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorTroncoEv2DerEvaluGonio)}
                    />
                </td>
              </tr>
              <tr>
                <td className="text-center">CUELLO</td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv1IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv1IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv1DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv1DerEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv2IzqEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv2IzqEvaluGonio)}
                    />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <SelectedFormControl
                    className="col-md-12"
                    options={listValores}
                    handleChange={handleOnChangeCuelloEv2DerEvaluGonio}
                    defaultValue={listValores.filter(v => v.value === objMuscleAssessment.valorCuelloEv2DerEvaluGonio)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <img src="../../images/avatars/cuerpo_humano.jpg"
            className="rounded float-left img-responsive"
            style={{ maxWidth: '100%' }}
            alt="cuerpo humano"
          />
        </div>
        <div className="col-md-6 mt-4">
          <div className="row">
            <TextAreaFormControl
              className="col-md-12"
              isLabel
              label="Valoración inicial (Resúmen)"
              rows={17}
              onChange={handleOnChangeInitialValoration}
              defaultValue={objMuscleAssessment.initialValorationStep3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
MuscleEvaluationMotionTesting.propTypes = {
  handleOnChangeInitialValoration: PropTypes.func,
  handleOnChangeMSupEv1IzqEvaluMusc: PropTypes.func,
  objMuscleAssessment: PropTypes.object,
  handleOnChangeMSupEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv2DerEvaluGonio: PropTypes.func,
};