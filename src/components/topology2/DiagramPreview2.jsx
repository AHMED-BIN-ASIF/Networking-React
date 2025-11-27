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

  // Update LeaderLines based on checked boxes
  // const updateFlowLines = useCallback(() => {
  //   // clear
  //   Object.values(linesRef.current).forEach((arr) => arr.forEach((l) => l.remove()));
  //   linesRef.current = {};

  //   // draw for checked
  //   Object.keys(connectionMap).forEach((key) => {
  //     if (flowCheckboxes[key]) {
  //       linesRef.current[key] = connectionMap[key].map(([s, e, opts = {}]) =>
  //         createLeaderLine(s, e, opts)
  //       );
  //     }
  //   });

  //   // popups “updated” flags
  //   const affectedPopups = {};
  //   if (flowCheckboxes["chk-fw1-inet1"] || flowCheckboxes["chk-priv1-inet1-fw"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup17 = true;
  //   }
  //   if (flowCheckboxes["chk-inet1-pub1"] || flowCheckboxes["chk-pub1-inet1"]) {
  //     affectedPopups.popup6 = true;
  //   }
  //   if (flowCheckboxes["chk-priv1-inet1-bypass-fw"]) {
  //     affectedPopups.popup5 = true;
  //   }
  //   if (flowCheckboxes["chk-priv2-inet1"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup7 = true;
  //     affectedPopups.popup10 = true;
  //     affectedPopups.popup12 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //   }
  //   if (flowCheckboxes["chk-priv3-inet1"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup8 = true;
  //     affectedPopups.popup10 = true;
  //     affectedPopups.popup13 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //   }
  //   if (
  //     flowCheckboxes["chk-pub1-priv2"] ||
  //     flowCheckboxes["chk-priv2-pub1"] ||
  //     flowCheckboxes["chk-priv1-priv2"] ||
  //     flowCheckboxes["chk-priv2-priv1"]
  //   ) {
  //     affectedPopups.popup5 = true;
  //     if (flowCheckboxes["chk-pub1-priv2"] || flowCheckboxes["chk-priv2-pub1"]) {
  //       affectedPopups.popup6 = true;
  //     }
  //     affectedPopups.popup7 = true;
  //     affectedPopups.popup12 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //     if (flowCheckboxes["chk-priv1-priv2"] || flowCheckboxes["chk-priv2-priv1"]) {
  //       affectedPopups.popup17 = true;
  //     }
  //   }
  //   if (
  //     flowCheckboxes["chk-pub1-priv3"] ||
  //     flowCheckboxes["chk-priv3-pub1"] ||
  //     flowCheckboxes["chk-priv1-priv3"] ||
  //     flowCheckboxes["chk-priv3-priv1"]
  //   ) {
  //     affectedPopups.popup5 = true;
  //     if (flowCheckboxes["chk-pub1-priv3"] || flowCheckboxes["chk-priv3-pub1"]) {
  //       affectedPopups.popup6 = true;
  //     }
  //     affectedPopups.popup8 = true;
  //     affectedPopups.popup13 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //     if (flowCheckboxes["chk-priv1-priv3"] || flowCheckboxes["chk-priv3-priv1"]) {
  //       affectedPopups.popup17 = true;
  //     }
  //   }
  //   if (flowCheckboxes["chk-priv2-priv3"] || flowCheckboxes["chk-priv3-priv2"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup7 = true;
  //     affectedPopups.popup8 = true;
  //     affectedPopups.popup12 = true;
  //     affectedPopups.popup13 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //   }
  //   if (flowCheckboxes["chk-pub1-sbi"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup6 = true;
  //   }
  //   if (flowCheckboxes["chk-priv3-sbi"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup8 = true;
  //     affectedPopups.popup11 = true;
  //     affectedPopups.popup13 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //   }
  //   if (flowCheckboxes["chk-priv2-sbi"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup7 = true;
  //     affectedPopups.popup11 = true;
  //     affectedPopups.popup12 = true;
  //     affectedPopups.popup14 = true;
  //     affectedPopups.popup15 = true;
  //     affectedPopups.popup16 = true;
  //   }
  //   if (flowCheckboxes["chk-priv1-sbi"]) {
  //     affectedPopups.popup5 = true;
  //     affectedPopups.popup17 = true;
  //   }

  //   setUpdatedPopups(affectedPopups);
  // }, [flowCheckboxes]);

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
    affectedPopups.popup17 = true;
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

  // Export diagram as PDF
  const handleExportDiagram = async () => {
    if (!diagramRef.current) {
      console.error('Diagram container not found');
      return;
    }

    try {
      // Hide the "Show Endpoints" checkbox container before capturing
      const showEndpointsCheckbox = document.getElementById("chk-show-endpoints");
      const checkboxGroup = showEndpointsCheckbox?.closest('.flow-checkbox-group');
      const formCheckouts = checkboxGroup?.parentElement;
      const originalDisplayCheckbox = formCheckouts?.style.display;
      
      // Hide the form-checkouts div that contains the Show Endpoints checkbox
      if (formCheckouts) {
        formCheckouts.style.display = 'none';
      }

      // Hide the buttons section (diagram-btm) that contains all the action buttons
      const diagramBtm = diagramRef.current.querySelector('.diagram-btm');
      const originalDisplayButtons = diagramBtm?.style.display;
      if (diagramBtm) {
        diagramBtm.style.display = 'none';
      }

      // Capture the diagram with all its content
      const canvas = await html2canvas(diagramRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: diagramRef.current.scrollWidth,
        height: diagramRef.current.scrollHeight,
      });

      // Restore the checkbox visibility
      if (formCheckouts) {
        formCheckouts.style.display = originalDisplayCheckbox || '';
      }

      // Restore the buttons visibility
      if (diagramBtm) {
        diagramBtm.style.display = originalDisplayButtons || '';
      }

      // Convert canvas to PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate PDF dimensions (A4 landscape in mm)
      const pdfWidth = 297; // A4 landscape width in mm
      const pdfHeight = 210; // A4 landscape height in mm
      
      // Calculate scaling to fit the image
      const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
      const scaledWidth = imgWidth * 0.264583 * ratio; // Convert px to mm
      const scaledHeight = imgHeight * 0.264583 * ratio;
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Center the image on the page
      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = (pdfHeight - scaledHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);

      // Helper function to remove duplicate routes
      const removeDuplicateRoutes = (routes, includeAction = false) => {
        const seen = new Set();
        return routes.filter(route => {
          // For DRG Hub table, include action in key; for others, ignore empty/null actions
          const action = includeAction ? route.routeType : (route.routeType || '');
          const key = `${route.destination}|${route.targetType}|${route.target}|${action}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
      };

      // Add routing tables on separate pages (one table per page)
      // Include ALL routing entries regardless of checkbox state
      const routingTables = [
        {
          name: formData.hubPrivRtName || 'Hub Private Route Table',
          routes: removeDuplicateRoutes([
            { destination: '0.0.0.0/0', targetType: 'NAT Gateway', target: 'NGW', routeType: 'Static' },
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: 'All <REGION> Services In Oracle Services Network', targetType: 'Service Gateway', target: 'SGW', routeType: 'Static' }
          ])
        },
        {
          name: formData.hubPubRtName || 'Hub Public Route Table',
          routes: removeDuplicateRoutes([
            { destination: '0.0.0.0/0', targetType: 'Internet Gateway', target: 'IGW', routeType: 'Static' },
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            { destination: 'All <REGION> Services In Oracle Services Network', targetType: 'Service Gateway', target: 'SGW', routeType: 'Static' }
          ])
        },
        {
          name: formData.spokeAPrivRtName || 'Spoke A Private Route Table',
          routes: removeDuplicateRoutes([
            { destination: '0.0.0.0/0', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: formData.hubVcnCidr || 'Hub VCN CIDR', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: 'All <REGION> Services In Oracle Services Network', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' }
          ])
        },
        {
          name: formData.spokeBPrivRtName || 'Spoke B Private Route Table',
          routes: removeDuplicateRoutes([
            { destination: formData.hubVcnCidr || 'Hub VCN CIDR', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: '0.0.0.0/0', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' },
            { destination: 'All <REGION> Services In Oracle Services Network', targetType: 'Dynamic Routing Gateway', target: 'DRG', routeType: 'Static' }
          ])
        },
        {
          name: formData.natGwRtName || 'NAT Gateway Route Table',
          routes: removeDuplicateRoutes([
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' }
          ])
        },
        {
          name: formData.serviceGwRtName || 'Service Gateway Route Table',
          routes: removeDuplicateRoutes([
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' }
          ])
        },
        {
          name: formData.drgRtSpokeAatt || 'DRG Route Table Spoke Attachment A',
          routes: removeDuplicateRoutes([
            { destination: formData.hubVcnCidr || 'Hub VCN CIDR', targetType: 'Virtual Cloud Network', target: 'HUB-VCN-ATTACHMENT', routeType: 'Static' },
            { destination: '0.0.0.0/0', targetType: 'Virtual Cloud Network', target: 'HUB-VCN-ATTACHMENT', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Virtual Cloud Network', target: 'HUB-VCN-ATTACHMENT', routeType: 'Static' }
            // Note: chk-priv2-sbi also requires 0.0.0.0/0 but it's already included above
          ])
        },
        {
          name: formData.drgRtSpokeAttachmentB || 'DRG Route Table Spoke Attachment B',
          routes: removeDuplicateRoutes([
            { destination: formData.hubVcnCidr || 'Hub VCN CIDR', targetType: 'Virtual Cloud Network', target: 'HUB-VCN-ATTACHMENT', routeType: 'Static' },
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Virtual Cloud Network', target: 'HUB-VCN-ATTACHMENT', routeType: 'Static' },
            { destination: '0.0.0.0/0', targetType: 'Virtual Cloud Network', target: 'HUB-VCN-ATTACHMENT', routeType: 'Static' }
          ])
        },
        {
          name: formData.drgRiHubAtt || 'DRG Route Table Hub Attachment',
          routes: removeDuplicateRoutes([
            { destination: '10', targetType: 'Attachment', target: 'SPOKE-VCN-A-ATTACHMENT', routeType: 'Accept' },
            { destination: '20', targetType: 'Attachment', target: 'SPOKE-VCN-B-ATTACHMENT', routeType: 'Accept' }
          ])
        },
        {
          name: formData.vcnRt1HubAttachment || 'VCN Route Table 1 Hub Attachment',
          routes: removeDuplicateRoutes([
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Virtual Cloud Network', target: 'SPOKE-VCN-A-ATTACHMENT', routeType: 'Static' },
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Virtual Cloud Network', target: 'SPOKE-VCN-B-ATTACHMENT', routeType: 'Static' }
            // Note: SBI flows use the same routes as other flows, already included
          ])
        },
        {
          name: formData.vcnRt2HubAttachment || 'VCN Route Table 2 Hub Attachment',
          routes: removeDuplicateRoutes([
            // For chk-pub1-priv2, chk-priv2-pub1, chk-priv1-priv2, chk-priv2-priv1
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            { destination: formData.hubPrivSubnetCidr || 'Hub Private Subnet CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            // For chk-priv2-inet1
            { destination: '0.0.0.0/0', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            // For chk-pub1-priv3, chk-priv3-pub1
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            { destination: formData.hubPubSubnetCidr || 'Hub Public Subnet CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            // For chk-priv3-inet1 (0.0.0.0/0 already included above)
            // For chk-priv1-priv3, chk-priv3-priv1 (spokeBCidr and hubPrivSubnetCidr already included)
            // For chk-priv2-priv3, chk-priv3-priv2 (spokeACidr and spokeBCidr already included)
            // For chk-priv2-sbi, chk-priv3-sbi
            { destination: 'All <REGION> Services In Oracle Services Network', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' }
          ])
        },
        {
          name: 'RT-Priv1',
          routes: removeDuplicateRoutes([
            // chk-priv1-inet1-fw
            { destination: '0.0.0.0/0', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            // chk-priv1-priv2 / chk-priv2-priv1
            { destination: formData.spokeACidr || 'Spoke A CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            // chk-priv1-priv3 / chk-priv3-priv1
            { destination: formData.spokeBCidr || 'Spoke B CIDR', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' },
            // chk-priv1-sbi
            { destination: 'All <REGION> Services In Oracle Services Network', targetType: 'Private IP', target: formData.firewallIp || 'Firewall IP', routeType: 'Static' }
          ])
        }
      ];

      // Add each routing table on its own separate page
      routingTables.forEach((rt) => {
        pdf.addPage();
        
        // Title
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(rt.name, 20, 25);
        
        // Table header - adjust column widths to fit landscape A4 (297mm width)
        const startY = 35;
        const rowHeight = 12; // Increased to accommodate multi-line text
        // Check if this is DRG Hub Attachment table (different columns)
        const isDRGHubTable = rt.name.includes('DRG Route Table Hub Attachment') || rt.name.includes('DRG Hub Attachment');
        const colWidths = isDRGHubTable ? [50, 60, 90, 57] : [100, 60, 40, 57]; // Total: 257mm
        const headers = isDRGHubTable 
          ? ['Priority', 'Match type', 'Match criteria', 'Action']
          : ['Destination', 'Target Type', 'Target', 'Route Type'];
        
        // Draw all header backgrounds first
        let currentX = 20;
        headers.forEach((header, i) => {
          pdf.rect(currentX, startY, colWidths[i], rowHeight, 'F');
          currentX += colWidths[i];
        });
        
        // Now draw all header text on top
        currentX = 20;
        headers.forEach((header, i) => {
          // Calculate center position for text
          const textY = startY + 6.5;
          
          // Ensure white text color
          pdf.setTextColor(255, 255, 255);
          
          // Draw text - try without align option first, then with manual centering
          const textWidth = pdf.getTextWidth(header);
          const centeredX = currentX + (colWidths[i] - textWidth) / 2;
          
          pdf.text(header, centeredX, textY);
          
          currentX += colWidths[i];
        });
        
        // Draw table rows with data
        let currentY = startY + rowHeight;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setDrawColor(180, 180, 180); // Gray border color
        
        rt.routes.forEach((route, routeIndex) => {
          // Set row background color
          if (routeIndex % 2 === 0) {
            pdf.setFillColor(250, 250, 250); // Very light gray
          } else {
            pdf.setFillColor(255, 255, 255); // White
          }
          
          // Draw all cell backgrounds first
          currentX = 20;
          const rowData = [
            route.destination,
            route.targetType,
            route.target,
            route.routeType
          ];
          
          rowData.forEach((data, i) => {
            // Draw cell background
            pdf.rect(currentX, currentY, colWidths[i], rowHeight, 'F');
            // Draw cell border
            pdf.rect(currentX, currentY, colWidths[i], rowHeight, 'S');
            currentX += colWidths[i];
          });
          
          // Now draw all cell text on top
          currentX = 20;
          rowData.forEach((data, i) => {
            // Explicitly set text color to black
            pdf.setTextColor(0, 0, 0);
            
            // Split text to fit in cell width
            const lines = pdf.splitTextToSize(data, colWidths[i] - 6);
            
            // Calculate text position - same approach for all columns
            let textX;
            if (i === 0) {
              // First column: left aligned
              textX = currentX + 3;
            } else {
              // Other columns: center aligned using manual calculation
              const textWidth = pdf.getTextWidth(lines[0] || '');
              textX = currentX + (colWidths[i] - textWidth) / 2;
            }
            
            // Draw all lines of text (handle multi-line)
            lines.forEach((line, lineIndex) => {
              const textY = currentY + 4 + (lineIndex * 3.5); // 3.5mm line spacing
              if (textY < currentY + rowHeight - 1) { // Make sure it fits in cell
                pdf.text(line || '', textX, textY);
              }
            });
            
            currentX += colWidths[i];
          });
          
          currentY += rowHeight;
        });
      });
      
      pdf.save(`${formData.hubVcnName || 'topology2'}-diagram.pdf`);
    } catch (error) {
      console.error('Error exporting diagram:', error);
      alert('Failed to export diagram. Please try again.');
    }
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
    {/* Header */}
    <div style={{ 
      background: webhookStatus.status === 'error' ? '#dc2626' : 
                 webhookStatus.status === 'success' ? '#16a34a' : '#b91c1c',
      color: 'white',
      padding: '20px',
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {webhookStatus.status === 'loading' && (
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        )}
        {webhookStatus.status === 'success' && (
          <div style={{ fontSize: '20px' }}>✅</div>
        )}
        {webhookStatus.status === 'error' && (
          <div style={{ fontSize: '20px' }}>❌</div>
        )}
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          {webhookStatus.status === 'loading' && 'Deploying to OCI'}
          {webhookStatus.status === 'success' && 'Deployment Successful'}
          {webhookStatus.status === 'error' && 'Deployment Failed'}
        </h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Countdown Timer */}
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '15px',
          padding: '5px 10px',
          fontSize: '12px',
          fontWeight: 'bold',
          minWidth: '50px',
          textAlign: 'center'
        }}>
          {webhookStatus.countdown}s
        </div>
        <button 
          onClick={() => {
            clearInterval(countdownIntervalRef.current);
            setWebhookStatus({ isOpen: false, messages: [], status: 'loading', countdown: 30 });
          }}
          style={{ 
            background: 'rgba(255,255,255,0.2)', 
            border: 'none', 
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            fontSize: '16px', 
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          ×
        </button>
      </div>
    </div>
    
    {/* Messages Body */}
    <div style={{ 
      background: 'white',
      padding: '20px',
      maxHeight: '280px', 
      overflow: 'auto'
    }}>
      {webhookStatus.messages.map((message, index) => (
        <div key={index} style={{ 
          padding: '12px 16px',
          margin: '8px 0',
          background: index === webhookStatus.messages.length - 1 ? 
            (webhookStatus.status === 'error' ? '#fecaca' : 
             webhookStatus.status === 'success' ? '#bbf7d0' : '#fecaca') : '#f8f9fa',
          border: `1px solid ${index === webhookStatus.messages.length - 1 ? 
            (webhookStatus.status === 'error' ? '#dc2626' : 
             webhookStatus.status === 'success' ? '#16a34a' : '#b91c1c') : '#e9ecef'}`,
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.4',
          color: '#333',
          position: 'relative',
          paddingLeft: '40px'
        }}>
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '12px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: index === webhookStatus.messages.length - 1 ? 
              (webhookStatus.status === 'error' ? '#dc2626' : 
               webhookStatus.status === 'success' ? '#16a34a' : '#b91c1c') : '#6c757d',
            color: 'white',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {index + 1}
          </div>
          {message}
        </div>
      ))}
    </div>
    
    {/* Progress Footer */}
    <div style={{
      background: '#f8f9fa',
      padding: '15px 20px',
      borderTop: '1px solid #e9ecef',
      fontSize: '12px',
      color: '#6c757d',
      textAlign: 'center'
    }}>
      {webhookStatus.status === 'loading' && `Please wait while we deploy your infrastructure... (Auto-close in ${webhookStatus.countdown}s)`}
      {webhookStatus.status === 'success' && `🎉 Your infrastructure has been successfully deployed! (Auto-close in ${webhookStatus.countdown}s)`}
      {webhookStatus.status === 'error' && `⚠️ There was an issue with the deployment. Please check the logs above. (Auto-close in ${webhookStatus.countdown}s)`}
    </div>
  </div>
)}

{/* Add CSS animation for loading spinner */}
<style jsx>{`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>
    </div>
  );
};

export default DiagramPreview2;
