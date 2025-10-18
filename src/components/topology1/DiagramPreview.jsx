// src/components/topology1/DiagramPreview.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import Topo1 from "../../assets/images/topo-1.jpg";
import "../../css/DiagramPreview.css";
import FlowCheckbox from "../common/FlowCheckbox";
import Popup from "../common/Popup ";
import FlowCheckboxGroups from "./FlowCheckboxGroups";
import NetworkLabels from "./NetworkLabels";
import FlowEndpoints from "./FlowEndpoints";
import PopupButtons from "./PopupButtons";
import PopupTables from "./PopupTables";
import CheckPreviewDiagram from "./CheckPreviewDiagram";

// Flow lines configuration as provided
const connectionMap = {
  "chk-pub-priv-db": [
    ["top1-pub-1", "top1-gateway-3"],
    ["top1-priv-1", "top1-gateway-3"],
    ["top1-priv-2", "top1-gateway-3"],
    ["top1-gateway-3", "top1-db-1", { path: "straight" }],

    ["pre-pub1-gtw-1", "gtw-pub1-db-2"],
    ["gtw-pub1-db-2", "pre-pub1-db-3"],

    ["pre-priv1-gtw-1", "gtw-priv1-db-2"],
    ["gtw-priv1-db-2", "pre-priv1-db-3"],

    ["pre-priv2-gtw-1", "gtw-priv2-db-2"],
    ["gtw-priv2-db-2", "pre-priv2-db-3"],

  ],
  "chk-pub-inet": [
    ["top1-pub-1", "top1-gateway-1"],
    ["top1-gateway-1", "top1-inet-1"],

    ["pre-pub-inet-1", "gtw-pub-inet-2"],
    ["gtw-pub-inet-2", "pre-pub-inet-3"],
  ],
  "chk-priv-inet": [
    ["top1-priv-1", "top1-gateway-2"],
    ["top1-priv-2", "top1-gateway-2"],
    ["top1-gateway-2", "top1-inet-1"],
    
    ["pre-priv1-inet-1", "gtw-priv1-inet-2"],
    ["gtw-priv1-inet-2", "pre-priv1-inet-3"],

    ["pre-priv2-inet-1", "gtw-priv2-inet-2"],
    ["gtw-priv2-inet-2", "pre-priv2-inet-3"],
  ],
  "chk-pub-priv-bidirectional": [
    [
      "top1-pub-1",
      "top1-priv-1",
      { path: "straight", startPlug: "arrow1", endPlug: "arrow" },
    ],
    [
      "top1-pub-1",
      "top1-priv-2",
      { path: "arc", startPlug: "arrow1", endPlug: "arrow" },
    ],
    ["pre-pub-priv1-1", "pre-pub-priv1-2"],
    ["pre-pub-priv2-1", "pre-pub-priv2-2"],
  ],
};

const endpointIds = [
  "top1-pub-1",
  "top1-priv-1",
  "top1-priv-2",
  "top1-db-1",
  "top1-inet-1",
];

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

const DiagramPreview = ({
  formData,
  popups,
  setPopups,
  flowCheckboxes,
  setFlowCheckboxes,
  popupwrap,
  flowConfigGrouped,
  onExportJSON
}) => {
  const linesRef = useRef({});
  const [updatedPopups, setUpdatedPopups] = useState({});
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);

  // Keep refs to latest callbacks so mount-only listeners call the most recent versions
  const handleShowEndpointsRef = useRef();
  const updateFlowLinesRef = useRef();

  // Update LeaderLines based on checked boxes
  const updateFlowLines = useCallback(() => {
    // clear existing lines
    Object.values(linesRef.current).forEach((arr) => arr.forEach((l) => l.remove()));
    linesRef.current = {};

    // Double RAF to ensure DOM is fully painted
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        Object.keys(connectionMap).forEach((key) => {
          if (flowCheckboxes[key]) {
            linesRef.current[key] = connectionMap[key].map(([s, e, opts = {}]) =>
              createLeaderLine(s, e, opts)
            );
          }
        });
      });
    });

    // popups "updated" flags for Topology1
    const affectedPopups = {};
    if (flowCheckboxes["chk-pub-priv-db"]) {
      affectedPopups.popup3 = true;
      affectedPopups.popup6 = true;
    }
    if (flowCheckboxes["chk-pub-inet"]) {
      affectedPopups.popup1 = true;
      affectedPopups.popup4 = true;
    }
    if (flowCheckboxes["chk-priv-inet"]) {
      affectedPopups.popup2 = true;
      affectedPopups.popup5 = true;
    }
    if (flowCheckboxes["chk-pub-priv-bidirectional"]) {
      affectedPopups.popup1 = true;
      affectedPopups.popup2 = true;
      affectedPopups.popup3 = true;
    }

    setUpdatedPopups(affectedPopups);
  }, [flowCheckboxes]);

  // Show/hide endpoints + ensure state reset when hiding
  const handleShowEndpoints = useCallback(() => {
    const show = document.getElementById("chk-show-endpoints").checked;

    endpointIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? "flex" : "none";
    });

    document.querySelectorAll(".flow-checkbox").forEach((checkbox) => {
      const label = checkbox.closest("label");
      if (label) {
        if (checkbox.id === "chk-show-endpoints") {
          label.style.display = "flex";
        } else {
          label.style.display = show ? "flex" : "none";
        }
      }
      if (!show) checkbox.checked = false; // UI clear
    });

    // IMPORTANT: also clear React state when hiding endpoints
    if (!show) {
      setFlowCheckboxes({}); // everything false
      setActiveGroupIndex(null); // unlock groups
    }

    updateFlowLines();
  }, [setFlowCheckboxes, updateFlowLines]);

  // keep refs to the latest versions of these callbacks for safe mount-only listeners
  useEffect(() => {
    handleShowEndpointsRef.current = handleShowEndpoints;
  }, [handleShowEndpoints]);

  useEffect(() => {
    updateFlowLinesRef.current = updateFlowLines;
  }, [updateFlowLines]);

  // Setup DOM listeners ONCE (mount/unmount) and call the latest callbacks via refs
  useEffect(() => {
    // wrapper listeners that call the current ref functions
    const showHandler = () => handleShowEndpointsRef.current && handleShowEndpointsRef.current();
    const changeHandler = () => updateFlowLinesRef.current && updateFlowLinesRef.current();

    const showEndpointsCheckbox = document.getElementById("chk-show-endpoints");
    if (showEndpointsCheckbox) {
      showEndpointsCheckbox.addEventListener("change", showHandler);
    }

    const flowCheckboxesEls = document.querySelectorAll(".flow-checkbox");
    flowCheckboxesEls.forEach((checkbox) => {
      checkbox.addEventListener("change", changeHandler);
    });

    // Run once on mount to sync UI
    showHandler();

    return () => {
      if (showEndpointsCheckbox) {
        showEndpointsCheckbox.removeEventListener("change", showHandler);
      }
      flowCheckboxesEls.forEach((checkbox) => {
        checkbox.removeEventListener("change", changeHandler);
      });
      Object.values(linesRef.current).forEach((arr) => arr.forEach((l) => l.remove()));
      linesRef.current = {};
    };
    // empty deps → run only on mount/unmount
  }, []);

  // Call the latest updateFlowLines whenever the flowCheckboxes state changes
  useEffect(() => {
    updateFlowLinesRef.current && updateFlowLinesRef.current();
  }, [flowCheckboxes]);

  // Extra safety: if external state clears all, unlock groups
  useEffect(() => {
    const uiGroups = flowConfigGrouped.slice(1);
    const anyChecked = uiGroups.flat().some(({ id }) => !!flowCheckboxes[id]);
    if (!anyChecked && activeGroupIndex !== null) {
      setActiveGroupIndex(null);
    }
  }, [flowCheckboxes, flowConfigGrouped, activeGroupIndex]);

  // Single (non-grouped) checkbox handler
  const handleFlowCheckboxChange1 = (e) => {
    const { id, checked } = e.target;
    setFlowCheckboxes((prev) => ({ ...prev, [id]: checked }));
  };

  // GROUPED checkbox handler — uses the same sliced groups as the renderer
  const handleFlowCheckboxChange = (e, groupIndex) => {
    const { id, checked } = e.target;

    setFlowCheckboxes((prev) => {
      const updated = { ...prev, [id]: checked };

      // Work only with the UI-rendered groups to keep indices consistent
      const uiGroups = flowConfigGrouped.slice(1);

      const groupHasChecked = uiGroups[groupIndex]?.some(({ id }) => updated[id]);

      if (groupHasChecked) {
        // lock to this rendered group
        setActiveGroupIndex(groupIndex);
      } else {
        // check if any group (rendered set) still has a checked item
        const anyChecked = uiGroups.flat().some(({ id }) => updated[id]);
        if (anyChecked) {
          const firstActive = uiGroups.findIndex((group) =>
            group.some(({ id }) => updated[id])
          );
          setActiveGroupIndex(firstActive);
        } else {
          // nothing checked at all → unlock everything
          setActiveGroupIndex(null);
        }
      }

      return updated;
    });
  };

  return (
    <div className="diagram-topology diagram-topology-one">
      <h3>Single VCN Architecture</h3>
        <CheckPreviewDiagram flowCheckboxes={flowCheckboxes} />
      <div className="topo-img-wrapper">
        <img src={Topo1} alt="topo1" />
        
        {/* Flow endpoints */}
        <FlowEndpoints formData={formData} />

        {/* Gateways */}
        <div id="top1-gateway-1" className="gateway gtw-1"></div>
        <div id="top1-gateway-2" className="gateway gtw-2"></div>
        <div id="top1-gateway-3" className="gateway gtw-3"></div>

        {/* Popup buttons */}
        <PopupButtons
          formData={formData}
          setPopups={setPopups}
          updatedPopups={updatedPopups}
          flowCheckboxes={flowCheckboxes}
        />

        {/* Network label groups */}
        <NetworkLabels formData={formData} />
      </div>

      {/* Flow checkboxes (grouped UI) */}
      {flowCheckboxes["chk-show-endpoints"] && (
        <FlowCheckboxGroups
          flowConfigGrouped={flowConfigGrouped}
          flowCheckboxes={flowCheckboxes}
          activeGroupIndex={activeGroupIndex}
          handleFlowCheckboxChange={handleFlowCheckboxChange}
        />
      )}

      <div className="diagram-btm">
        {/* First group (show endpoints) */}
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
                  onChange={handleFlowCheckboxChange1}
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
                  generateTF: false,
                })
              }
            >
              Close All
            </button>
          </div>
          <div>
            <button
              className="network-btn"
              onClick={onExportJSON}
            >
              Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Generate TF Popup */}
      {popups.generateTF && (
        <div id="generate-TF-popup" className="generateTFPopup">
          {/* Generate TF content here */}
        </div>
      )}

      {/* Popup Tables */}
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

export default DiagramPreview;