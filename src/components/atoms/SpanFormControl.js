import React from "react";
import PropTypes from 'prop-types';

export default function SpanFormControl({
  title = '',
  isBold = false
}) {
  return (
    <span style={{fontWeight: isBold? 'bold': ''}}>{title}</span>
  )
}
SpanFormControl.propTypes = {
  title: PropTypes.string,
  isBold: PropTypes.bool,
};