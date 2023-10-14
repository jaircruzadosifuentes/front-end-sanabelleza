import React from "react";
import PropTypes from 'prop-types';
import TreeViewOptionsEmployeed from "src/components/organism/tree-view-options-employeed";

export default function EnvironmentEmployeed({
  options = [],
  optionsItem = [],
  handleChangeTreViewSelect,
  handleRemoveItemListEmployeed,
  employeed = ''
}) {
  return (
    <div className="row">
      <div className="col-md-12">
        <strong>Opciones del sistema del trabajador {employeed.toUpperCase()}</strong>
      </div>
      <div className="col-md-12 mt-4 mb-4">
        <TreeViewOptionsEmployeed
          options={options}
          optionsItem={optionsItem}
          handleChangeTreViewSelect={handleChangeTreViewSelect}
          handleRemoveItemListEmployeed={handleRemoveItemListEmployeed}
        />
      </div>
    </div>
  )
}
EnvironmentEmployeed.propTypes = {
  options: PropTypes.array,
  optionsItem: PropTypes.array,
  handleChangeTreViewSelect: PropTypes.func,
  handleChangeCodeEmployeed: PropTypes.func,
  handleRemoveItemListEmployeed: PropTypes.func,
  employeed: PropTypes.string,
};