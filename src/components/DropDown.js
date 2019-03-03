import React from 'react';
import PropTypes from 'prop-types';

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
      {list.map((item) => {
        return (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        );
      })}
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
