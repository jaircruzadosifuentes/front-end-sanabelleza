import React from "react";
import PropTypes from 'prop-types';

export default function SpanFormControl({
  title = '',
  isBold = false,
  color = ''
}) {
  return (
    <span style={{fontWeight: isBold? 'bold': '', color: color.length > 0? color: ''}}>{title}</span>
  )
}
SpanFormControl.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  isBold: PropTypes.bool,
};