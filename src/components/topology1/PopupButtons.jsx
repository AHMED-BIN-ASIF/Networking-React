import React from "react";

const PopupButtons = ({ formData, setPopups, updatedPopups, flowCheckboxes }) => {
  return (
    <>
      <div
        className="popup-btn btn-1"
        onClick={() => setPopups((prev) => ({ ...prev, popup1: true }))}
      >
        <span id="public-sl-name-1">{formData.publicSLName}</span>
        {updatedPopups.popup1 && (
          <span className="updated-badge">Updated</span>
        )}
      </div>
      <div
        className="popup-btn btn-2"
        onClick={() => setPopups((prev) => ({ ...prev, popup2: true }))}
      >
        <span id="private-sl-name-1">{formData.privateSLName}</span>
        {updatedPopups.popup2 && (
          <span className="updated-badge">Updated</span>
        )}
      </div>
      <div
        className="popup-btn btn-3"
        onClick={() => setPopups((prev) => ({ ...prev, popup3: true }))}
      >
        <span id="sl-label-1">{formData.SLName}</span>
        {updatedPopups.popup3 && (
          <span className="updated-badge">Updated</span>
        )}
      </div>
      <div
        className="popup-btn btn-4"
        onClick={() => setPopups((prev) => ({ ...prev, popup4: true }))}
      >
        <span id="public-rt-name-1">{formData.publicRTName}</span>
        {updatedPopups.popup4 && (
          <span className="updated-badge">Updated</span>
        )}
      </div>
      <div
        className="popup-btn btn-5"
        onClick={() => setPopups((prev) => ({ ...prev, popup5: true }))}
      >
        <span id="private-rt-name-1">{formData.privateRTName}</span>
        {updatedPopups.popup5 && (
          <span className="updated-badge">Updated</span>
        )}
      </div>
      <div
        className="popup-btn btn-6"
        onClick={() => setPopups((prev) => ({ ...prev, popup6: true }))}
      >
        <span id="priv-rt-name-1">{formData.RTName}</span>
        {updatedPopups.popup6 && (
          <span className="updated-badge">Updated</span>
        )}
      </div>
    </>
  );
};

export default PopupButtons;