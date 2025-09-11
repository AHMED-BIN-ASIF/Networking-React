import React from "react";

const FlowCheckbox = ({ id, label, checked, onChange, disabled }) => {
  return (
    <label style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <input
        type="checkbox"
        id={id}
        className="flow-checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />{" "}
      {label}
    </label>
  );
};
 
export default FlowCheckbox;
