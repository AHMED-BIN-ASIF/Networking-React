import React from 'react';
import InputGroup from './InputGroup';
import "../css/DiagramForm.css";

const DiagramForm = ({ fieldGroups, onFieldChange, onPopulate, onSubmit }) => {
  return (
    <div className="diagram-container">
      <form className="network-form" id="diagramForm" onSubmit={onSubmit}>
        <h3>Diagram Input</h3>
        <div className="form-inner">
          {Object.entries(fieldGroups).map(([groupName, fields]) => (
            <InputGroup 
              key={groupName} 
              title={groupName} 
              fields={fields} 
              onFieldChange={onFieldChange} 
            />
          ))}
        </div>
        <div className="form-btn-grp">
          <button type="button" className="network-btn" onClick={onPopulate}>
            Populate Fields
          </button>
          <button type="submit" className="network-btn">
            Generate Network
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagramForm;
