
// components/DiagramForm3.js
import React from 'react';
import InputGroupLarge from '../common/InputGroupLarge';
import '../../css/DiagramForm.css';

const DiagramForm3 = ({ fieldGroups, subGroups, onFieldChange, onPopulate, spanClass, rowSpan }) => (
  <div className="diagram-container">
    <h3>Diagram Input</h3>
    <div className="form-inner">
      {subGroups.map(group => (
        <InputGroupLarge
          key={group.groupName}
          title={group.groupName}
          fields={group.fields}
          subGroups={group.subGroups || []}
          onFieldChange={onFieldChange}
          spanClass={group.spanClass}
          rowSpan={group.rowSpan}
        />
      ))}
    </div>
    <div className="form-btn-grp">
      <button type="button" className="network-btn" onClick={onPopulate}>
        Populate Fields
      </button>
      
      <button type="submit" className="network-btn">Generate Network</button>
    </div>
  </div>
);

export default DiagramForm3;