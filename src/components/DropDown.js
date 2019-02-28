import React from 'react';

const DropDown = ({ id, title, onUpdate, list, value }) => (
  <React.Fragment>
    <label htmlFor={id}>{title}</label>
    <select
      id={id}
      value={value}
      onChange={e => {
        onUpdate(e.target.value);
      }}
    >
      {list.map(item => {
        return (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  </React.Fragment>
);

export default DropDown;
