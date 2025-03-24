import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../css/InputGroup.css";

const InputGroup = ({ title, fields, onFieldChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="form-col">
      <h5 className="grp-label" onClick={toggleOpen} style={{ cursor: 'pointer' }}>
        {title}
      </h5>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='input-list'
          >
            {fields.map((field) => (
              <div className="input-grp" key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  type="text"
                  id={field.id}
                  placeholder={field.placeholder || ""}
                  value={field.value}
                  required={field.required}
                  onChange={(e) => onFieldChange(field.key, e.target.value)}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputGroup;
