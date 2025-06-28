import React from 'react';

const FlowCheckbox = ({ id, label, checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        className="flow-checkbox"
        checked={checked}
        onChange={onChange}
      />{' '}
      {label}
    </label>
  );
};

export default FlowCheckbox;
