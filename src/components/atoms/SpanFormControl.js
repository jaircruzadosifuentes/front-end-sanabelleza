import React from "react";
import PropTypes from 'prop-types';

export default function SpanFormControl({
  title = ''
}) {
  return (
    <span>{title}</span>
  )
}
SpanFormControl.propTypes = {
  title: PropTypes.string,
};