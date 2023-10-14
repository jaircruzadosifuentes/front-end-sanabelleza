import React from "react";
import TreeViewOptions from "src/components/organism/tree-view-options";
import PropTypes from 'prop-types';

export default function EnvironmentSystem({
  options = [],
  optionsItem = [],
  handleAddItemListEmployeed
}) {
  return (
    <div className="row">
      <div className="col-md-12">
        <strong>Opciones generales del sistema</strong>
      </div>
      <div className="col-md-12 mt-4 mb-4">
        <TreeViewOptions
          options={options}
          optionsItem={optionsItem}
          handleAddItemListEmployeed={handleAddItemListEmployeed}
        />
      </div>
    </div>
  )
}
EnvironmentSystem.propTypes = {
  options: PropTypes.array,
  optionsItem: PropTypes.array,
  handleAddItemListEmployeed: PropTypes.func,
  employed: PropTypes.string,
};