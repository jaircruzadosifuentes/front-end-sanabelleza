import React from "react";
import { ButtonFormControl, InputFormControl } from "src/components/molecules";
import PropTypes from 'prop-types';

export default function EnvironmentHead({
  handleChangeCodeEmployeed,
  handleSearchItemsForCodeEmployeed,
  handleKeyUpCodeEmployeed
}) {
  return (
    <div className="row">
      <div className="col-md-8">
      </div>
      <div className="col-md-4">
        <div className="row">
          <InputFormControl
            type="text"
            className="col-md-8"
            label="Buscar por codigo de trabajador"
            isLabel
            isFilter
            onChange={handleChangeCodeEmployeed}
            onKeyUp={handleKeyUpCodeEmployeed}
            autoFocus
            upperCase
          />
          <div className="col-md-4 mt-4">
            <ButtonFormControl
              title={`Buscar`}
              color='btn btn-primary mt-1'
              type={9}
              onClick={handleSearchItemsForCodeEmployeed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
EnvironmentHead.propTypes = {
  options: PropTypes.array,
  optionsItem: PropTypes.array,
  handleChangeTreViewSelect: PropTypes.func,
  handleChangeCodeEmployeed: PropTypes.func,
  handleAddItemListEmployeed: PropTypes.func,
  employed: PropTypes.string,
  handleSearchItemsForCodeEmployeed: PropTypes.func,
  handleKeyUpCodeEmployeed: PropTypes.func,
};