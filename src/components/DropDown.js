import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ id, value, label }) => (
  <option key={id} value={value}>
    {label}
  </option>
);

Option.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const DropDown = ({ id, label, onUpdate, list, value }) => (
  <React.Fragment>
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => {
        onUpdate(e.target.value);
      }}
    >
      {list.map((option) => (
        <Option key={option.id} {...option} />
      ))}
    </select>
  </React.Fragment>
);

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  value: PropTypes.string.isRequired
};

export default DropDown;
