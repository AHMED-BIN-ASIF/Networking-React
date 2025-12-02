import React, { useEffect, useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
import FlowCheckboxGroups from "./FlowCheckboxGroups";

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
  onExportJSON,
  onSendToWebhook,
}) => {
  const linesRef = useRef({});
  const diagramRef = useRef(null);
  const [updatedPopups, setUpdatedPopups] = useState({});
  // activeGroupIndex refers to the *rendered* groups (flowConfigGrouped.slice(1))
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);

  // Keep refs to latest callbacks so mount-only listeners call the most recent versions
  const handleShowEndpointsRef = useRef();
  const updateFlowLinesRef = useRef();

  const updateFlowLines = useCallback(() => {
    // clear existing lines safely
    Object.values(linesRef.current).forEach((arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((line) => {
          if (line && typeof line.remove === 'function') {
            try {
              line.remove();
            } catch (error) {
              console.warn('Error removing line:', error);
            }
          }
        });
      }
    });
    linesRef.current = {};

    // Double RAF to ensure DOM is fully painted AND elements exist
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        Object.keys(connectionMap).forEach((key) => {
          if (flowCheckboxes[key]) {
            linesRef.current[key] = connectionMap[key].map(([s, e, opts = {}]) => {
              const startEl = document.getElementById(s);
              const endEl = document.getElementById(e);
              
              // Only create line if both elements exist
              if (startEl && endEl) {
                try {
                  return createLeaderLine(s, e, opts);
                } catch (error) {
                  console.warn(`Error creating line from ${s} to ${e}:`, error);
                  return null;
                }
              } else {
                console.warn(`Elements not found for line: ${s} -> ${e}`);
                return null;
              }
            }).filter(line => line !== null); // Remove null entries
          }
        });
      });
    });

    // popups “updated” flags
    const affectedPopups = {};
    if (flowCheckboxes["chk-fw1-inet1"] || flowCheckboxes["chk-priv1-inet1-fw"]) {
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
      if (flowCheckboxes["chk-pub1-priv2"] || flowCheckboxes["chk-priv2-pub1"]) {
        affectedPopups.popup6 = true;
      }
      affectedPopups.popup7 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
      if (flowCheckboxes["chk-priv1-priv2"] || flowCheckboxes["chk-priv2-priv1"]) {
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
      if (flowCheckboxes["chk-pub1-priv3"] || flowCheckboxes["chk-priv3-pub1"]) {
        affectedPopups.popup6 = true;
      }
      affectedPopups.popup8 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
      if (flowCheckboxes["chk-priv1-priv3"] || flowCheckboxes["chk-priv3-priv1"]) {
        affectedPopups.popup17 = true;
      }
    }
    if (flowCheckboxes["chk-priv2-priv3"] || flowCheckboxes["chk-priv3-priv2"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }
    if (flowCheckboxes["chk-pub1-db1"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup6 = true;
    }
    if (flowCheckboxes["chk-priv3-db1"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup8 = true;
      affectedPopups.popup11 = true;
      affectedPopups.popup13 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }
    if (flowCheckboxes["chk-priv2-db1"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup7 = true;
      affectedPopups.popup11 = true;
      affectedPopups.popup12 = true;
      affectedPopups.popup14 = true;
      affectedPopups.popup15 = true;
      affectedPopups.popup16 = true;
    }
    if (flowCheckboxes["chk-priv1-db1"]) {
      affectedPopups.popup5 = true;
      affectedPopups.popup17 = true;
    }

    setUpdatedPopups(affectedPopups);
  }, [flowCheckboxes]);

  // Show/hide endpoints + ensure state reset when hiding
  const handleShowEndpoints = useCallback(() => {
    const show = document.getElementById("chk-show-endpoints")?.checked;
    if (typeof show === 'undefined') return;

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
      if (!show) checkbox.checked = false;
    });

    // IMPORTANT: Use setTimeout to avoid state updates during render
    if (!show) {
      setTimeout(() => {
        setFlowCheckboxes({});
        setActiveGroupIndex(null);
        
        // Clean up lines after state update
        setTimeout(() => {
          Object.values(linesRef.current).forEach((arr) => {
            if (Array.isArray(arr)) {
              arr.forEach((line) => {
                if (line && typeof line.remove === 'function') {
                  try {
                    line.remove();
                  } catch (error) {
                    console.warn('Error removing line:', error);
                  }
                }
              });
            }
          });
          linesRef.current = {};
        }, 100);
      }, 0);
    } else {
      updateFlowLines();
    }
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
    const showHandler = () => {
      if (handleShowEndpointsRef.current) {
        setTimeout(handleShowEndpointsRef.current, 0);
      }
    };
    
    const changeHandler = () => {
      if (updateFlowLinesRef.current) {
        setTimeout(updateFlowLinesRef.current, 0);
      }
    };

    const showEndpointsCheckbox = document.getElementById("chk-show-endpoints");
    if (showEndpointsCheckbox) {
      showEndpointsCheckbox.addEventListener("change", showHandler);
    }

    const flowCheckboxesEls = document.querySelectorAll(".flow-checkbox");
    flowCheckboxesEls.forEach((checkbox) => {
      if (checkbox.id !== "chk-show-endpoints") {
        checkbox.addEventListener("change", changeHandler);
      }
    });

    // Run once on mount with delay
    const initTimer = setTimeout(() => {
      showHandler();
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (showEndpointsCheckbox) {
        showEndpointsCheckbox.removeEventListener("change", showHandler);
      }
      flowCheckboxesEls.forEach((checkbox) => {
        checkbox.removeEventListener("change", changeHandler);
      });
      // Cleanup lines
      Object.values(linesRef.current).forEach((arr) => {
        if (Array.isArray(arr)) {
          arr.forEach((l) => {
            if (l && typeof l.remove === 'function') l.remove()
          });
        }
      });
      linesRef.current = {};
    };
    // empty deps → run only on mount/unmount
  }, []);

  // Call the latest updateFlowLines whenever the flowCheckboxes state changes
  useEffect(() => {
    if (updateFlowLinesRef.current) {
      const timer = setTimeout(updateFlowLinesRef.current, 0);
      return () => clearTimeout(timer);
    }
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
    
    // Use functional update to avoid state conflicts
    setFlowCheckboxes((prev) => {
      const newState = { ...prev, [id]: checked };
      
      // Only reset lines when unchecking the "Show Endpoints" checkbox
      if (id === "chk-show-endpoints" && !checked) {
        // Schedule cleanup for after render
        setTimeout(() => {
          Object.values(linesRef.current).forEach((arr) => {
            if (Array.isArray(arr)) {
              arr.forEach((line) => {
                if (line && typeof line.remove === 'function') {
                  try {
                    line.remove();
                  } catch (error) {
                    console.warn('Error removing line:', error);
                  }
                }
              });
            }
          });
          linesRef.current = {};
        }, 0);
      }
      
      return newState;
    });
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

  // Update the webhook status state to include countdown
  const [webhookStatus, setWebhookStatus] = useState({ 
    isOpen: false, 
    messages: [], 
    status: 'loading', // 'loading', 'success', 'error'
    countdown: 30
  });
  const webhookTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Enhanced webhook handler with countdown timer
  const handleDeployToOCI = () => {
    setWebhookStatus({ 
      isOpen: true, 
      messages: ['Initializing deployment to OCI...'], 
      status: 'loading',
      countdown: 30
    });
    
    // Start countdown timer
    countdownIntervalRef.current = setInterval(() => {
      setWebhookStatus(prev => {
        const newCountdown = prev.countdown - 1;
        if (newCountdown <= 0) {
          // Auto close when countdown reaches 0
          clearInterval(countdownIntervalRef.current);
          return { isOpen: false, messages: [], status: 'loading', countdown: 30 };
        }
        return { ...prev, countdown: newCountdown };
      });
    }, 1000);
    
    let webhookCompleted = false;
    
    const deploymentTimeout = setTimeout(() => {
      setWebhookStatus(prev => {
        if (prev.status === 'loading' && !webhookCompleted) {
          return {
            ...prev,
            messages: [...prev.messages, 'Deployment timeout - Connection lost or server not responding'],
            status: 'error'
          };
        }
        return prev;
      });
    }, 25000); // 25 seconds to allow for countdown
    
    if (onSendToWebhook) {
      Promise.resolve(onSendToWebhook((message, isError = false) => {
        setWebhookStatus(prev => {
          const newMessages = [...prev.messages, message];
          let newStatus = prev.status;
          
          // Enhanced error detection
          if (isError || 
              message.toLowerCase().includes('error') || 
              message.toLowerCase().includes('failed') ||
              message.toLowerCase().includes('network error') ||
              message.toLowerCase().includes('timeout') ||
              message.toLowerCase().includes('unable') ||
              message.toLowerCase().includes('could not') ||
              message.toLowerCase().includes('connection') && message.toLowerCase().includes('failed') ||
              /\b(4\d{2}|5\d{2})\b/.test(message)) {
            newStatus = 'error';
            clearTimeout(deploymentTimeout);
            webhookCompleted = true;
          } else if (message.toLowerCase().includes('success') || 
                    message.toLowerCase().includes('completed') ||
                    message.toLowerCase().includes('deployed') ||
                    message.toLowerCase().includes('finished') ||
                    message.toLowerCase().includes('done') ||
                    message.toLowerCase().includes('created successfully')) {
            newStatus = 'success';
            clearTimeout(deploymentTimeout);
            webhookCompleted = true;
          }
          
          return {
            ...prev,
            messages: newMessages,
            status: newStatus
          };
        });
      }))
      .then(() => {
        clearTimeout(deploymentTimeout);
        webhookCompleted = true;
        
        setWebhookStatus(prev => {
          if (prev.status === 'loading') {
            return {
              ...prev,
              messages: [...prev.messages, 'Deployment request processed successfully!'],
              status: 'success'
            };
          }
          return prev;
        });
      })
      .catch((error) => {
        clearTimeout(deploymentTimeout);
        webhookCompleted = true;
        
        setWebhookStatus(prev => ({
          ...prev,
          messages: [...prev.messages, `Network Error: ${error.message || 'Failed to connect to deployment service'}`],
          status: 'error'
        }));
      });
    }
  };

  // Update cleanup for timeout and countdown
  useEffect(() => {
    return () => {
      if (webhookTimeoutRef.current) {
        clearTimeout(webhookTimeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  // Export diagram as PDF (unchanged)
  const handleExportDiagram = async () => {
    // ... (keep all the existing handleExportDiagram code exactly as is)
    // This function remains unchanged
  };

  return (
    <div ref={diagramRef} className="diagram-topology-two">
      <div>
        <h3>Hub and Spoke VCN Architecture</h3>
        <CheckPreviewDiagram flowCheckboxes={flowCheckboxes} />
        <div className="topo-img-wrapper">
          <img src={Topo2} alt="topo2" />
          {/* Fixed endpoint elements */}
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
            flowCheckboxes["chk-priv1-db1"]) && (
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
        {/* First group (e.g., show endpoints) */}
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
          <div>
            <button
              className="network-btn"
              onClick={onExportJSON}
            >
              Export JSON
            </button>
          </div>
          <div>
            <button
              className="network-btn"
              onClick={handleExportDiagram}
            >
              Export Diagram
            </button>
          </div>
          <div>
             <button
    className="network-btn"
    onClick={handleDeployToOCI}
    disabled={webhookStatus.isOpen}
    style={{
      opacity: webhookStatus.isOpen ? 0.6 : 1,
      cursor: webhookStatus.isOpen ? 'not-allowed' : 'pointer',
      backgroundColor: webhookStatus.isOpen ? '#999' : ''
    }}
  >
    {webhookStatus.isOpen ? 'Deploying...' : 'Deploy to OCI'}
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

      {/* Webhook status popup (unchanged) */}
      {webhookStatus.isOpen && (
        <div className="webhook-status-popup" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          border: '2px solid #b91c1c',
          borderRadius: '12px',
          padding: '0',
          minWidth: '450px',
          maxWidth: '600px',
          maxHeight: '400px',
          overflow: 'hidden',
          zIndex: 10000,
          boxShadow: '0 8px 32px rgba(185, 28, 28, 0.2)',
          fontFamily: 'Arial, sans-serif'
        }}>
          {/* ... (keep all the existing webhook status popup JSX exactly as is) */}
        </div>
      )}

      {/* Add CSS animation for loading spinner */}

      {/* // Replace line ~32 in your return statement with: */}
<style jsx="true">{`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>
    </div>
  );
};

export default DiagramPreview2;