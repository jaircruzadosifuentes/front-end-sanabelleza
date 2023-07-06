import React from "react";
import PropTypes from 'prop-types';
import { COLOR_BLUE } from "src/utils/constants";

export default function Label({ 
  title, 
  htmlFor, 
  className = "", 
  isBold = false,
  isColor = false,
  textAlign = '',
  isTextAlign = false,
  ...props 
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={className + 'mt-1 mb-1'}
      {...props}
      style={{fontWeight: isBold ? 'bold': '', color: isColor? COLOR_BLUE: '', textAlign: isTextAlign ? textAlign: ''}}
    >
      {title}
    </label>
  );
}

Label.propTypes = {
  isTextAlign: PropTypes.bool,
  textAlign: PropTypes.string,
  title: PropTypes.string,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  isBold: PropTypes.bool,
  isColor: PropTypes.bool,
};