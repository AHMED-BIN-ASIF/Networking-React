import React, { useEffect, useRef, useState, useCallback } from "react";
import { connectionMap, endpointIds } from "./connectionConfig";
import Topo2 from "../../assets/images/topo-2.jpg";
import "../../css/DiagramPreview2.css";
import FlowCheckbox from "../common/FlowCheckbox";
import RtIcon from "../../assets/icons/rt-icon.webp";
import PopupTables from "./PopupTables";
import CheckPreviewDiagram from "./CheckPreviewDiagram";
import NetworkLabels from "./NetworkLabels";
import FlowEndpoints from "./FlowEndpoints";
import PopupButtons from "./PopupButtons";

// Helper to create a LeaderLine instance
const createLeaderLine = (start, end, options = {}) =>
  new window.LeaderLine(
    document.getElementById(start),
    document.getElementById(end),
    {
      color: options.color || "#2474ad",
      size: 3,
      path: options.path || "fluid",
      startPlug: options.startPlug || "behind",
      endPlug: options.endPlug || "arrow",
      hide: true,
    }
  ).show("draw", { duration: 800 });

const DiagramPreview2 = ({
  formData,
  popups,
  setPopups,
  flowCheckboxes,
  setFlowCheckboxes,
  popupwrap,
  flowConfigGrouped,
}) => {
  const linesRef = useRef({});
  const [updatedPopups, setUpdatedPopups] = useState({});

  // Function to update LeaderLine instances based on the checked flow checkboxes.
  const updateFlowLines = useCallback(() => {
    // First, remove all existing lines
    Object.values(linesRef.current).forEach(linesArray => {
      linesArray.forEach(line => line.remove());
    });
    linesRef.current = {};

    // Then create lines for all checked checkboxes
    Object.keys(connectionMap).forEach((key) => {
      if (flowCheckboxes[key]) {
        linesRef.current[key] = connectionMap[key].map(([s, e, opts = {}]) =>
          createLeaderLine(s, e, opts)
        );
      }
    });

    // Determine which popups need to show "updated" badge
    const affectedPopups = {};

    // Map checkbox changes to affected popups
    if (
      flowCheckboxes["chk-fw1-inet1"] ||
      flowCheckboxes["chk-priv1-inet1-fw"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup17 = true;
    }
    if (flowCheckboxes["chk-inet1-pub1"] || flowCheckboxes["chk-pub1-inet1"]) {
      affectedPopups.popup6 = true;
    }
    if (flowCheckboxes["chk-priv1-inet1-bypass-fw"]) {
      affectedPopups.popup5 = true;
    }
    if (flowCheckboxes["chk-priv2-inet1"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup10 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }
    if (flowCheckboxes["chk-priv3-inet1"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup10 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }

    if (
      flowCheckboxes["chk-pub1-priv2"] ||
      flowCheckboxes["chk-priv2-pub1"] ||
      flowCheckboxes["chk-priv1-priv2"] ||
      flowCheckboxes["chk-priv2-priv1"]
    ) {
      affectedPopups.popup5 = true;
      if (
        flowCheckboxes["chk-pub1-priv2"] ||
        flowCheckboxes["chk-priv2-pub1"]
      ) {
        affectedPopups.popup6 = true;
      }
      affectedPopups.popup7 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
      if (
        flowCheckboxes["chk-priv1-priv2"] ||
        flowCheckboxes["chk-priv2-priv1"]
      ) {
        affectedPopups.popup17 = true;
      }
    }

    if (
      flowCheckboxes["chk-pub1-priv3"] ||
      flowCheckboxes["chk-priv3-pub1"] ||
      flowCheckboxes["chk-priv1-priv3"] ||
      flowCheckboxes["chk-priv3-priv1"]
    ) {
      affectedPopups.popup5 = true;
      if (
        flowCheckboxes["chk-pub1-priv3"] ||
        flowCheckboxes["chk-priv3-pub1"]
      ) {
        affectedPopups.popup6 = true;
      }

      affectedPopups.popup8 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
      if (
        flowCheckboxes["chk-priv1-priv3"] ||
        flowCheckboxes["chk-priv3-priv1"]
      ) {
        affectedPopups.popup17 = true;
      }
    }

    if (
      flowCheckboxes["chk-priv2-priv3"] ||
      flowCheckboxes["chk-priv3-priv2"]
    ) {
      affectedPopups.popup5 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }

    if (flowCheckboxes["chk-pub1-sbi"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup6 = true;
    }
    if (flowCheckboxes["chk-priv3-sbi"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup11 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }
    if (flowCheckboxes["chk-priv2-sbi"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup11 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }
    if (flowCheckboxes["chk-priv1-sbi"]) {
      affectedPopups.popup5 = true;
      if (flowCheckboxes["chk-priv1-sbi"]) affectedPopups.popup17 = true;
    }

    setUpdatedPopups(affectedPopups);
  }, [flowCheckboxes]);

  // This function is a direct translation of your snippet:
  const handleShowEndpoints = useCallback(() => {
    let show = document.getElementById("chk-show-endpoints").checked;
    // Set endpoint elements display to 'flex'
    endpointIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? "flex" : "none";
    });
    // For each flow-checkbox, set the parent label display:
    document.querySelectorAll(".flow-checkbox").forEach((checkbox) => {
      const label = checkbox.closest("label");
      if (label) {
        // Ensure the show endpoints checkbox label stays visible:
        if (checkbox.id === "chk-show-endpoints") {
          label.style.display = "flex";
        } else {
          label.style.display = show ? "flex" : "none";
        }
      }
      if (!show) checkbox.checked = false;
    });
    updateFlowLines();
  }, [updateFlowLines]);

  // Attach event listeners when component mounts:
  useEffect(() => {
    // Ensure the endpoints are updated on mount:
    handleShowEndpoints();
    // Add event listeners to checkboxes:
    const showEndpointsCheckbox = document.getElementById("chk-show-endpoints");
    if (showEndpointsCheckbox) {
      showEndpointsCheckbox.addEventListener("change", handleShowEndpoints);
    }
    const flowCheckboxesEls = document.querySelectorAll(".flow-checkbox");
    flowCheckboxesEls.forEach((checkbox) => {
      checkbox.addEventListener("change", updateFlowLines);
    });
    // Cleanup listeners on unmount.
    return () => {
      if (showEndpointsCheckbox) {
        showEndpointsCheckbox.removeEventListener(
          "change",
          handleShowEndpoints
        );
      }
      flowCheckboxesEls.forEach((checkbox) => {
        checkbox.removeEventListener("change", updateFlowLines);
      });
      // Remove any remaining LeaderLine instances.
      Object.values(linesRef.current).forEach((linesArray) => {
        linesArray.forEach((line) => line.remove());
      });
      linesRef.current = {};
    };
  }, [handleShowEndpoints, updateFlowLines]);

  // Also, if flowCheckboxes state changes via React, call updateFlowLines.
  useEffect(() => {
    updateFlowLines();
  }, [flowCheckboxes, updateFlowLines]);

  const handleFlowCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFlowCheckboxes((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="diagram-topology-two">
      <div>
        <h3>Topology 2</h3>
        <CheckPreviewDiagram flowCheckboxes={flowCheckboxes} />
        <div className="topo-img-wrapper">
          <img src={Topo2} alt="topo2" />
            {/* Fixed endpoint elements with specific IDs */}
          <FlowEndpoints formData={formData} />
          {/* gateways points */}
          <>
            <div id="top2-gateway-1" className="gateway tp2-gtw-1"></div>
            <div id="top2-gateway-2" className="gateway tp2-gtw-2"></div>
            <div id="top2-gateway-3" className="gateway tp2-gtw-3"></div>
            <div id="top2-gateway-4" className="gateway tp2-gtw-4"></div>
          </>

          {/* Popup buttons */}
          <PopupButtons
            formData={formData}
            setPopups={setPopups}
            updatedPopups={updatedPopups}
            flowCheckboxes={flowCheckboxes}
          />

          {/* Conditional RT-Priv1 button */}
          {(flowCheckboxes["chk-priv1-inet1-fw"] ||
            flowCheckboxes["chk-priv1-priv2"] ||
            flowCheckboxes["chk-priv2-priv1"] ||
            flowCheckboxes["chk-priv1-priv3"] ||
            flowCheckboxes["chk-priv3-priv1"] ||
            flowCheckboxes["chk-priv1-sbi"]) && (
            <div
              className="popup-btn top1-priv-rt-btn"
              onClick={() => setPopups((prev) => ({ ...prev, popup17: true }))}
            >
              <img src={RtIcon} alt="rticon" />
              <span>RT-Priv1</span>
              {updatedPopups.popup17 && (
                <span className="updated-badge">Updated</span>
              )}
            </div>
          )}

          {/* Network label groups */}
          <NetworkLabels formData={formData} />
        </div>
      </div>

      {/* Flow checkboxes */}
      {flowCheckboxes["chk-show-endpoints"] && (
        <div className="form-checkouts column">
          {flowConfigGrouped.slice(1, 99).map((group, groupIndex) => (
            <div className="flow-checkbox-group" key={`group-${groupIndex}`}>
              {group.map(({ id, label }) => (
                <FlowCheckbox
                  key={id}
                  id={id}
                  label={label}
                  checked={flowCheckboxes[id] ?? false}
                  onChange={handleFlowCheckboxChange}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="diagram-btm">
        {/* Flow Checkboxes */}
        <div className="form-checkouts">
          {flowConfigGrouped
            .flat()
            .slice(0, 1)
            .map(({ id, label }) => (
              <div className="flow-checkbox-group" key={id}>
                <FlowCheckbox
                  key={id}
                  id={id}
                  label={label}
                  checked={flowCheckboxes[id] ?? false}
                  onChange={handleFlowCheckboxChange}
                />
              </div>
            ))}
        </div>
        <div className="generate-btn">
          <div>
            <button
              className="network-btn"
              onClick={() =>
                setPopups({
                  popup1: true,
                  popup2: true,
                  popup3: true,
                  popup4: true,
                  popup5: true,
                  popup6: true,
                  popup7: true,
                  popup8: true,
                  popup9: true,
                  popup10: true,
                  popup11: true,
                  popup12: true,
                  popup13: true,
                  popup14: true,
                  popup15: true,
                  popup16: true,
                  popup17: true,
                  generateTF: true,
                })
              }
            >
              Open All
            </button>
          </div>
          <div className="open-close-btn">
            <button
              className="network-btn"
              onClick={() =>
                setPopups({
                  popup1: false,
                  popup2: false,
                  popup3: false,
                  popup4: false,
                  popup5: false,
                  popup6: false,
                  popup7: false,
                  popup8: false,
                  popup9: false,
                  popup10: false,
                  popup11: false,
                  popup12: false,
                  popup13: false,
                  popup14: false,
                  popup15: false,
                  popup16: false,
                  popup17: false,
                  generateTF: false,
                })
              }
            >
              Close All
            </button>
          </div>
        </div>
      </div>
      {/* Render PopupTables component */}
      {popupwrap && (
        <PopupTables
          formData={formData}
          popups={popups}
          setPopups={setPopups}
          flowCheckboxes={flowCheckboxes}
        />
      )}
    </div>
  );
};

export default DiagramPreview2;