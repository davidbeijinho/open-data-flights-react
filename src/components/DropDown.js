import React from 'react';
import PropTypes from 'prop-types';

const DropDown = ({ id, title, onUpdate, list, value }) => (
  <React.Fragment>
    <label htmlFor={id}>{title}</label>
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
  title: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.string.isRequired
};

export default DropDown;
