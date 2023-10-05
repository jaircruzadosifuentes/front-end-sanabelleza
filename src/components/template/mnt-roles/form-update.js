import React from "react";
import { Label } from "src/components/atoms";
import { ButtonFormControl, InputFormControl, SelectedFormControl } from "src/components/molecules";
import PropTypes from "prop-types";

export default function FormUpdate({
  handleCloseModalEdit,
  areas = [],
  handleChangeArea,
  handleChangeDescRol,
  handleChangeAbre,
  handleChangeSalario,
  handleEditRole,
  objRole
}) {
  console.log(objRole);
  return (
    <div className="container form-group">
      <Label title={'CONFIGURACIÓN DE ROLES'} isBold />
      <div className="row">
        <InputFormControl
          type="text"
          autoFocus
          className="col-md-12"
          label="Descripción del rol"
          onChange={handleChangeDescRol}
          defaultValue={objRole?.label}
          isLabel
        />
        <InputFormControl
          type="text"
          className="col-md-9"
          label="Abreviación"
          onChange={handleChangeAbre}
          defaultValue={objRole?.abbreviation}
          isLabel
        />
        <InputFormControl
          type="number"
          className="col-md-3"
          isLabel
          label="Salario"
          align="center"
          onChange={handleChangeSalario}
          defaultValue={objRole?.salary}
        />
        <SelectedFormControl
          className="col-md-9"
          placeHolder="Área (Dpto)"
          titleLabel="Área (Dpto)"
          options={areas}
          handleChange={handleChangeArea}
          defaultValue={areas.filter(a => parseInt(a.value) === parseInt(objRole?.area?.areaId))}
        />
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="btn-toolbar" style={{ float: 'right' }}>
            <div className="btn-group">
              <ButtonFormControl
                title="Salir"
                color='btn btn-danger'
                type={2}
                onClick={handleCloseModalEdit}
              />
            </div>&nbsp;
            <div className="btn-group">
              <ButtonFormControl
                title="Guardar"
                color='btn btn-success'
                type={1}
                onClick={handleEditRole}
              />
            </div>&nbsp;
          </div>
        </div>
      </div>
    </div>
  )
}
FormUpdate.propTypes = {
  handleCloseModalEdit: PropTypes.func,
  handleChangeArea: PropTypes.func,
  handleChangeSalario: PropTypes.func,
  handleEditRole: PropTypes.func,
  handleChangeDescRol: PropTypes.func,
  handleChangeAbre: PropTypes.func,
  areas: PropTypes.array,
  objRole: PropTypes.object,
};