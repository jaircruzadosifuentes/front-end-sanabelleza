import React from "react";
import PropTypes from 'prop-types';

export default function SmallAtoms(props) {
  const {
    name
  } = props;
  return (
    <small>{name}</small>
  )
}
SmallAtoms.propTypes = {
  name: PropTypes.string,
};