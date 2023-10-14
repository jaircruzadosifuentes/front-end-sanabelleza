import React from "react";
import PropTypes from 'prop-types';
import EnvironmentTabsAddRemove from "./environment-tabs-add-remove";
import { ButtonFormControl } from "src/components/molecules";

export default function EnvironmentAdd({
  employeed = '',
  optionsItem = [],
  options = [],
  handleGuardarItems,
  optionsAdd = [],
  optionsItemAdd = [],
  handleChange,
  value = 0,
  handleRemoveItemListEmployeed
}) {
  return (
    <div className="row">
      <div className="col-md-12">
        <strong>Opciones que serán agregadas o eliminadas del trabajador {employeed.toUpperCase()}</strong>
      </div>
      <div className="col-md-12">
        <EnvironmentTabsAddRemove
          options={options}
          optionsItem={optionsItem}
          optionsAdd={optionsAdd}
          optionsItemAdd={optionsItemAdd}
          handleChange={handleChange}
          value={value}
          handleRemoveItemListEmployeed={handleRemoveItemListEmployeed}
        />
      </div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <ButtonFormControl
                  title={`Cancelar`}
                  color='btn btn-danger mt-1'
                  type={2}
                />
              </div>
              <div className="col-md-6">
                <ButtonFormControl
                  title={`Guardar`}
                  onClick={handleGuardarItems}
                  color='btn btn-success mt-1'
                  type={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
EnvironmentAdd.propTypes = {
  employeed: PropTypes.string,
  options: PropTypes.array,
  optionsAdd: PropTypes.array,
  optionsItemAdd: PropTypes.array,
  optionsItem: PropTypes.array,
  handleGuardarItems: PropTypes.func,
  value: PropTypes.number,
  handleChange: PropTypes.func,
  handleRemoveItemListEmployeed: PropTypes.func,
};