import React from "react";
import PropTypes from 'prop-types';

function Select({
  name,
  options,
  className,
  onChange,
  defaultText = "Seleccione...",
}) {
  return (
    <select
      id={name}
      name={name}
      className={`form-select ${className}`}
      onChange={onChange}
    >
      <option /*children={defaultText}*/ selected={true} disabled />
      {options.map((op) => (
        <option key={op.id} defaultValue={op.id}>
          {op.name || op.description}
        </option>
      ))}
    </select>
  );
}

Select.defaultProps = {
  currentValue: 0,
  className: "",
};
Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultText: PropTypes.string,
};

export default Select;
