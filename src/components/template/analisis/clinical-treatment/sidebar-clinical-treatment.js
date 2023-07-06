import React from "react";
import TreeViewProgressPatient from '../../../organism/tree-view-progress-patient';
import PropTypes from 'prop-types';

export default function SidebarClinicalTreatment({
  handleChangeTreViewSelect
}) {
  return(
    <TreeViewProgressPatient 
    handleChangeTreViewSelect={handleChangeTreViewSelect}
    />
  )
}
SidebarClinicalTreatment.propTypes = {
  handleChangeTreViewSelect: PropTypes.func,
};