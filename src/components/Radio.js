import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({ value, checked, name, onUpdate }) => (
  <span>
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={(o) => {
        onUpdate(o.target.value);
      }}
    />
    {value}
  </span>
);

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default Radio;
