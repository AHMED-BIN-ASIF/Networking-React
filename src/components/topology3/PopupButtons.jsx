// components/PopupButtons.js
import React from "react";
import RtIcon from "../../assets/icons/rt-icon.webp";

const PopupButtons = ({ formData, setPopups, updatedPopups, flowCheckboxes }) => {
  const popupConfig = [
    { id: "popup1", className: "orange top3-btn-1", label: formData.hubPrivSlName },
    { id: "popup2", className: "orange top3-btn-2", label: formData.hubPubSlName },
    { id: "popup3", className: "blue top3-btn-3", label: formData.spokeAPrivSlName },
    { id: "popup4", className: "blue top3-btn-4", label: formData.spokeBPrivSlName },
    { id: "popup5", className: "orange top3-btn-5", label: formData.hubPrivRtName },
    { id: "popup6", className: "orange top3-btn-6", label: formData.hubPubRtName },
    { id: "popup7", className: "blue top3-btn-7", label: formData.spokeAPrivRtName },
    { id: "popup8", className: "blue top3-btn-8", label: formData.spokeBPrivRtName },
    { id: "popup9", className: "green top3-btn-9", label: formData.internetGwRtName },
    { id: "popup10", className: "green top3-btn-10", label: formData.natGwRtName },
    { id: "popup11", className: "green top3-btn-11", label: formData.serviceGwRtName },
    { id: "popup12", className: "green top3-btn-12", label: formData.drgRtSpokeAatt },
    { id: "popup13", className: "green top3-btn-13", label: formData.drgRtSpokeAttachmentB },
    { id: "popup14", className: "green top3-btn-14", label: formData.drgRiHubAtt },
    { id: "popup15", className: "green top3-btn-15", label: formData.vcnRt1HubAttachment },
    { id: "popup16", className: "green top3-btn-16", label: formData.vcnRt2HubAttachment },
    { id: "popup18", className: "green top3-btn-18", label: formData.onPremRouteTable },
    { id: "popup19", className: "green top3-btn-19", label: formData.tunnelRouteTable1 },
    { id: "popup20", className: "green top3-btn-20", label: formData.tunnelRouteTable2 },
  ];

  return (
    <>
      {popupConfig.map(({ id, className, label }) => (
        <div
          key={id}
          className={`popup-btn ${className}`}
          onClick={() => setPopups((prev) => ({ ...prev, [id]: true }))}
        >
          <span>{label}</span>
          {updatedPopups[id] && (
            <span className="updated-badge">Updated</span>
          )}
        </div>
      ))}

      {/* Conditional RT-Priv1 button */}
      {(flowCheckboxes["chk-priv1-inet1-fw"] ||
        flowCheckboxes["chk-priv1-priv2"] ||
        flowCheckboxes["chk-priv2-priv1"] ||
        flowCheckboxes["chk-priv1-priv3"] ||
        flowCheckboxes["chk-priv3-priv1"] ||
        flowCheckboxes["chk-priv1-db1"]) && (
        <div
          className="popup-btn top3-priv-rt-btn"
          onClick={() => setPopups((prev) => ({ ...prev, popup17: true }))}
        >
          <img src={RtIcon} alt="rticon" />
          <span>RT-Priv1</span>
          {updatedPopups.popup17 && (
            <span className="updated-badge">Updated</span>
          )}
        </div>
      )}
    </>
  );
};

export default PopupButtons;