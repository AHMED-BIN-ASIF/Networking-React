import React from 'react';
import "../../css/Popup.css"; // adjust as needed

const Popup = ({ id, title, isVisible, onClose, children, className }) => {
  if (!isVisible) return null;
  return (
    <div id={id} className={`popup ${className}`}>
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {title && <h3 className="popup-heading">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Popup;
