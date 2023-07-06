import React from "react";
import PropTypes from "prop-types";

export default function StrongFormControl({
  title = ''
}) {
  return(
    <>
      <strong>{title}</strong>
    </>
  )
}
StrongFormControl.propTypes = {
  title: PropTypes.string,
};