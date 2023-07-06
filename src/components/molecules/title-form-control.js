import React from "react";
import PropTypes from "prop-types";
import { COLOR_BLUE } from "src/utils/constants";

export default function TitleFormControl({
  isBold = false,
  title = '',
  type = 'h2'
}) {
  switch (type) {
    case 'h2':
      return (
        <h2 style={{ color: COLOR_BLUE, fontWeight: isBold ? 'bold': '' }}>{title}</h2>
      )
    default:
      break;
  }
}
TitleFormControl.propTypes = {
  isBold: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
};