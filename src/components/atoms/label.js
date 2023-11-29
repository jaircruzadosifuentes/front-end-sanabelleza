import React from "react";
import PropTypes from 'prop-types';
import { COLOR_BLUE } from "src/utils/constants";
import { COLOR_BUTTON_MAB, COLOR_GREEN } from "src/config/config";

export default function Label({ 
  title, 
  htmlFor, 
  className = "", 
  isBold = false,
  isColor = false,
  textAlign = '',
  isTextAlign = false,
  isWarning = false,
  isSuccess = false,
  ...props 
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={className + 'mt-1 mb-1'}
      {...props}
      style={{fontWeight: isBold ? 'bold': '', color: isColor? COLOR_BLUE: isWarning? COLOR_BUTTON_MAB: isSuccess? COLOR_GREEN: '', textAlign: isTextAlign ? textAlign: ''}}
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
  isWarning: PropTypes.bool,
  isSuccess: PropTypes.bool,
};