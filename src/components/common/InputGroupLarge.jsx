// components/InputGroupLarge.js
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import "../../css/InputGroup.css";
import InputGroup from './InputGroup';

/**
 * Renders a collapsible container for multiple InputGroup sub-groups and/or standalone fields
 * Dynamically applies a grid span based on the number of subGroups:
 *   - 0 subGroups: span-2
 *   - n subGroups: span-(n+1)
 */
const InputGroupLarge = ({ title, fields = [], subGroups = [], onFieldChange, spanClass, rowSpan  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(prev => !prev);
  
  return (
    <div className={`form-col span-${spanClass} row-${rowSpan}`}>  {/* applies span-2, span-3, span-4, etc. */}
      <h5 className="grp-label" onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {title} 
        {/* <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span> */}
      </h5>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="input-list"
          >
            {fields.length > 0 && (
              <div className="input-list">
                {fields.map(field => (
                  <div className="input-grp" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                      type="text"
                      id={field.id}
                      placeholder={field.placeholder || ''}
                      value={field.value}
                      required={field.required}
                      onChange={e => onFieldChange(field.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            {subGroups.length > 0 && (
              <div className={`input-inner-grid ${subGroups.length==1 ? "sub-col-1": "" } sub-col-${subGroups.length}`}>
                {subGroups.map((group, idx) => (
                  <InputGroup
                    key={group.groupName || idx}
                    title={group.groupName}
                    fields={group.fields}
                    onFieldChange={onFieldChange}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputGroupLarge;
